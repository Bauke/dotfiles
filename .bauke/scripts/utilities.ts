import { toml } from "./dependencies.ts";

export async function pathExists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch {
    return false;
  }
}

export function stringifyJsonPretty(input: unknown): string {
  return JSON.stringify(input, null, 2);
}

export async function runCommand(
  command: string,
  options: Deno.CommandOptions = {},
): Promise<void> {
  await new Deno.Command(command, {
    stderr: "inherit",
    stdout: "inherit",
    ...options,
  }).output();
}

export async function runAndReturnStdout(
  command: string,
  options: Deno.CommandOptions = {},
): Promise<string> {
  const process = new Deno.Command(command, { stdout: "piped", ...options });
  const { stdout } = await process.output();
  return new TextDecoder().decode(stdout);
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
