import { nodeUtil, toml } from "./dependencies.ts";

export function stringifyJsonPretty(input: unknown): string {
  return JSON.stringify(input, null, 2);
}

export async function runAndReturnStdout(
  options: Deno.RunOptions,
): Promise<string> {
  const process = Deno.run({ stdout: "piped", ...options });
  return new nodeUtil.TextDecoder().decode(await process.output());
}

export function tomlFrontmatter<T>(
  data: string,
): [T, string] {
  const startMarker = "---toml\n";
  const endMarker = "\n---\n";

  let start = data.indexOf(startMarker);
  let end = data.indexOf(endMarker);

  if (start === -1 || end === -1) {
    throw new Error("Missing frontmatter");
  }

  if (start !== 0) {
    throw new Error("Frontmatter not at beginning of data");
  }

  start += startMarker.length;
  const frontmatter = data.slice(start, end);

  end += endMarker.length;
  const extra = data.slice(end);
  return [toml.parse(frontmatter) as T, extra.trimStart()];
}
