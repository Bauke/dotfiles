import { Command } from "./dependencies.ts";
import { runAndReturnStdout, runCommand } from "./utilities.ts";

async function main(): Promise<void> {
  const { args } = await new Command()
    .name("simple-git-push")
    .description("Git push with some extra semantics.")
    .arguments("[...args:string]")
    .parse(Deno.args);

  const availableRemotes = await gitRemote();

  if (availableRemotes.length === 0) {
    console.log("No remotes found");
    return;
  }

  const remotesToPush = ["origin", "github", "gitlab"];
  for (const remote of availableRemotes) {
    if (remotesToPush.includes(remote)) {
      await gitPush(remote, args);
    }
  }
}

/** Run `git push <remote> <...args>`. */
async function gitPush(remote: string, args: string[]): Promise<void> {
  await runCommand("git", {
    args: [
      "push",
      "--follow-tags",
      remote,
      ...args,
    ],
  });
}

/** Run `git remote` and return all the remote names as an array. */
async function gitRemote(): Promise<string[]> {
  const output = await runAndReturnStdout("git", { args: ["remote"] });
  return output.trim().split("\n").filter((remote) => remote.length > 0);
}

if (import.meta.main) {
  void main();
}
