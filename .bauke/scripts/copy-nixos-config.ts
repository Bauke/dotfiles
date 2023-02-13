import { Command } from "https://deno.land/x/cliffy@v0.25.5/command/mod.ts";
import { runAndReturnStdout } from "./utilities.ts";

async function main(): Promise<void> {
  const { options } = await new Command()
    .name("copy-nixos-config")
    .description(
      'Copy NixOS configuration from "$BAUKE_DIR/nix/<hostname>/" to "/etc/nixos/"',
    )
    .option("--hostname", "The machine's configuration to copy.", {
      default: (await runAndReturnStdout({ cmd: ["hostname"] })).trim(),
    })
    .option("--diff", 'Output diffs between local and "/etc/nixos/" files.', {
      standalone: true,
    })
    .option(
      "--rebuild <rebuild:string>",
      'Run "sudo nixos-rebuild <rebuild>" after copying.',
    )
    .parse(Deno.args);

  const sourceDir = new URL(`../nix/${options.hostname}/`, import.meta.url);
  const files = Array.from(Deno.readDirSync(sourceDir))
    .filter((entry) => entry.name.endsWith(".nix"))
    .map((entry) => sourceDir.pathname + entry.name);

  if (options.diff) {
    for (const file of files) {
      const filename = file.slice(file.lastIndexOf("/") + 1);
      await Deno.run({
        cmd: ["delta", `/etc/nixos/${filename}`, file],
      }).status();
    }

    return;
  }

  await Deno.run({
    cmd: [
      "sudo",
      "cp",
      "--preserve=timestamps",
      "--verbose",
      ...files,
      "/etc/nixos/",
    ],
  }).status();

  if (options.rebuild) {
    await Deno.run({
      cmd: ["sudo", "nixos-rebuild", options.rebuild],
    }).status();
  }
}

if (import.meta.main) {
  void main();
}
