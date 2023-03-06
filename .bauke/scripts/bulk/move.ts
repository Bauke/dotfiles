import { Command, prompt } from "../dependencies.ts";

export const moveCommand = new Command()
  .name("move")
  .description("Interactively move a group of files.")
  .option(
    "-d, --directory <directory:string>",
    "Directories to include files from.",
    {
      collect: true,
    },
  )
  .action(async ({
    directory,
  }) => {
    await actionHandler({ directories: directory ?? [] });
  });

async function actionHandler(
  options: {
    directories: string[];
  },
): Promise<void> {
  for (const directory of options.directories) {
    for await (const file of Deno.readDir(directory)) {
      if (!file.isFile) {
        continue;
      }

      const filename = file.name;
      const { destination } = await prompt.prompt([{
        type: prompt.Input,
        name: "destination",
        message: `${filename} Destination:`,
      }]);

      if (destination === undefined || destination === "") {
        continue;
      }

      console.log(filename, destination);
    }
  }
}
