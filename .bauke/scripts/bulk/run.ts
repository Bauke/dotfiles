import { Command, prompt } from "../dependencies.ts";

export const runCommand = new Command()
  .name("run")
  .description("Run a command over a group of files and directories.")
  .option(
    "-d, --directory <directory:string>",
    "Directories to include files from.",
    {
      collect: true,
      required: true,
    },
  )
  .option(
    "--include-directories",
    "Include directories found inside the directories.",
  )
  .option(
    "--output-script",
    "Output the commands as a shell script instead of running them.",
  )
  .action(async ({ directory, includeDirectories, outputScript }) => {
    await actionHandler({
      directories: directory,
      includeDirectories: includeDirectories ?? false,
      outputScript: outputScript ?? false,
    });
  });

async function actionHandler(
  options: {
    directories: string[];
    includeDirectories: boolean;
    outputScript: boolean;
  },
): Promise<void> {
  let command: string[] = [];
  const previousPromptArgs: Map<number, string> = new Map();
  const suggestedPromptArgs: Set<string> = new Set();
  const substituteMarkers = {
    absoluteFile: "$absoluteFile",
    filename: "$filename",
  };

  for (const directory of options.directories) {
    console.log(`\n## Input for ${directory}`);
    const constructedCommands: string[][] = [];
    const prompts = await prompt.prompt([
      {
        type: prompt.List,
        name: "command",
        message: "Arguments of the command to run separated by comma",
        default: command,
        suggestions: Object.values(substituteMarkers),
      },
      {
        type: prompt.Confirm,
        name: "confirmCommands",
        message: "Manually approve each command invocation",
        default: true,
      },
    ]);

    command = prompts.command ?? command;
    for await (const file of Deno.readDir(directory)) {
      if (!options.includeDirectories && file.isDirectory) {
        continue;
      }

      const absoluteFile = await Deno.realPath(`${directory}/${file.name}`);
      const constructedCommand: string[] = [];
      let promptArgCount = 1;
      const substitutes = [
        [substituteMarkers.absoluteFile, absoluteFile],
        [substituteMarkers.filename, file.name],
      ];

      argumentLoop:
      for (const argument of command) {
        if (argument === "$prompt") {
          const { promptedArg } = await prompt.prompt([{
            type: prompt.Input,
            name: "promptedArg",
            message: `$prompt ${promptArgCount} for ${absoluteFile}`,
            default: previousPromptArgs.get(promptArgCount) ?? "",
            suggestions: Array.from(suggestedPromptArgs),
          }]);

          previousPromptArgs.set(promptArgCount, promptedArg!);
          suggestedPromptArgs.add(promptedArg!);
          constructedCommand.push(promptedArg!);
          promptArgCount += 1;
        } else {
          for (const [marker, substitute] of substitutes) {
            if (argument === marker) {
              constructedCommand.push(substitute);
              continue argumentLoop;
            }
          }

          constructedCommand.push(argument);
        }
      }

      if (prompts.confirmCommands) {
        const { confirmedRun } = await prompt.prompt([
          {
            type: prompt.Confirm,
            name: "confirmedRun",
            message: `Run "${constructedCommand.join(" ")}"`,
            default: true,
          },
        ]);

        if (!confirmedRun) {
          continue;
        }
      }

      constructedCommands.push(constructedCommand);
    }

    if (constructedCommands.length === 0) {
      console.log("\n No commands to run.");
      continue;
    }

    console.log("\n## Commands");
    console.log(constructedCommands.map((c) => c.join(" ")).join("\n"));

    const { confirmedRun } = await prompt.prompt([
      {
        type: prompt.Confirm,
        name: "confirmedRun",
        message: "Is this correct",
        default: true,
      },
    ]);

    if (!confirmedRun) {
      continue;
    }

    if (options.outputScript) {
      const defaultFilename = "bulk-run-script.zsh";
      const { filename } = await prompt.prompt([
        {
          type: prompt.Input,
          name: "filename",
          message: "Filename for the script",
          default: defaultFilename,
        },
      ]);
      const commands = constructedCommands.map((c) => c.join(" ")).join("\n");
      await Deno.writeTextFile(
        filename ?? defaultFilename,
        `#!/usr/bin/env zsh\n\n${commands}`,
      );
    } else {
      console.log("\n## Output");
      for (const constructedCommand of constructedCommands) {
        await Deno.run({
          cmd: constructedCommand,
        }).status();
      }
    }
  }
}
