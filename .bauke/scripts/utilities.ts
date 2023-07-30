import { toml } from "./dependencies.ts";

/**
 * Check if a path exists by running {@linkcode Deno.stat} on it.
 */
export async function pathExists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Run `JSON.stringify` with 2 spaces of indentation.
 */
export function stringifyJsonPretty(input: unknown): string {
  return JSON.stringify(input, null, 2);
}

/**
 * Run a command with by default inherited `stderr` and `stdout`.
 */
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

/**
 * Run a command and return its `stdout` output.
 */
export async function runAndReturnStdout(
  command: string,
  options: Deno.CommandOptions = {},
): Promise<string> {
  const process = new Deno.Command(command, { stdout: "piped", ...options });
  const { stdout } = await process.output();
  return new TextDecoder().decode(stdout);
}

/**
 * Parse the TOML frontmatter of a string, throwing an error if there is no
 * frontmatter or returning the parsed frontmatter with the remaining text
 * string. For example the following snippet:
 *
 * ```txt
 * ---toml
 * example_value = "Hello, world!"
 * ---
 *
 * # Markdown
 * ```
 *
 * Will return:
 *
 * ```js
 * [
 *   {
 *     example_value: "Hello, world!"
 *   },
 *   "# Markdown\n"
 * ]
 * ```
 */
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
