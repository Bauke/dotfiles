import { Command } from "../dependencies.ts";
import { runCommand } from "./run.ts";

async function main(): Promise<void> {
  await new Command()
    .name("bulk")
    .description("Bulk doer of things.")
    .command("run", runCommand)
    .parse(Deno.args);
}

if (import.meta.main) {
  void main();
}
