import { Command } from "./dependencies.ts";
import { runAndReturnStdout, runCommand } from "./utilities.ts";

async function main(): Promise<void> {
  const { options } = await new Command()
    .name("codium-extensions")
    .description("Small managing utility for VS Codium extensions!")
    .option(
      "-f, --file <file:file>",
      "The file to use for storing data.",
      {
        default:
          new URL("../data/codium-extensions.txt", import.meta.url).pathname,
      },
    )
    .option("--install", "Install saved extensions.")
    .option("--list", "List installed extensions.")
    .option("--list-saved", "List saved extensions.")
    .option("--save", "Save installed extensions.")
    .parse(Deno.args);

  if (options.install) {
    const extensions = await getSavedExtensions(options.file);
    await runCommand("codium", {
      args: [
        ...extensions.flatMap((id) => ["--install-extension", id]),
      ],
    });
  }

  if (options.list) {
    const extensions = await getInstalledExtensions();
    console.log(extensions.join("\n"));
  }

  if (options.listSaved) {
    const extensions = await getSavedExtensions(options.file);
    console.log(extensions.join("\n"));
  }

  if (options.save) {
    const extensions = await getInstalledExtensions();
    await Deno.writeTextFile(options.file, extensions.join("\n") + "\n");
    console.log(`Wrote ${extensions.length} extensions to ${options.file}`);
  }
}

async function getInstalledExtensions(): Promise<string[]> {
  const extensions = await runAndReturnStdout("codium", {
    args: ["--list-extensions"],
  });
  return extensions.trim().split("\n");
}

async function getSavedExtensions(file: string): Promise<string[]> {
  const extensions = await Deno.readTextFile(file);
  return extensions.trim().split("\n");
}

if (import.meta.main) {
  void main();
}
