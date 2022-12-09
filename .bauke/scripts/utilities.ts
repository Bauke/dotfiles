import { TextDecoder } from "https://deno.land/std@0.167.0/node/util.ts";

export async function runAndReturnStdout(
  options: Deno.RunOptions,
): Promise<string> {
  const process = Deno.run({ stdout: "piped", ...options });
  return new TextDecoder().decode(await process.output());
}
