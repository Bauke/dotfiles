import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";

import { runAndReturnStdout } from "./utilities.ts";

async function main(): Promise<void> {
  const { args } = await new Command()
    .name("simple-git-push")
    .description("Git push with some extra semantics.")
    .arguments("[...args:string]")
    .parse(Deno.args);

  const availableRemotes = await gitRemote();

  if (availableRemotes.length === 0) {
    console.log("No remotes found");
    Deno.exit(0);
  }

  const remotesToPush = ["origin", "github"];
  for (const remote of availableRemotes) {
    if (remotesToPush.includes(remote)) {
      await gitPush(remote, args);
    }
  }
}

async function gitPush(remote: string, args: string[]): Promise<void> {
  await Deno.run({
    cmd: [
      "git",
      "push",
      "--follow-tags",
      remote,
      ...args,
    ],
  }).status();
}

async function gitRemote(): Promise<string[]> {
  const output = await runAndReturnStdout({ cmd: ["git", "remote"] });
  return output.trim().split("\n").filter((remote) => remote.length > 0);
}

if (import.meta.main) {
  void main();
}
