import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";

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
