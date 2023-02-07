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
    .parse(Deno.args);

  const sourceDir = new URL(`../nix/${options.hostname}/`, import.meta.url);
  const files = Array.from(Deno.readDirSync(sourceDir))
    .filter((entry) => entry.name.endsWith(".nix"))
    .map((entry) => sourceDir.pathname + entry.name);

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
}

if (import.meta.main) {
  void main();
}
