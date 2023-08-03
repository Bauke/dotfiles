import { Command } from "./dependencies.ts";
import { runCommand, tomlFrontmatter } from "./utilities.ts";

/** The TOML frontmatter data for each video. */
type Frontmatter = {
  page_title: string;
  id: string;
  speedrun?: {
    entry: string;
    leaderboard: string;
    chapters?: Array<[string, string]>;
    mods?: string[];
  };
};

async function main(): Promise<void> {
  const { options } = await new Command()
    .name("edit-youtube-video")
    .description("Edit a YouTube video title and description")
    .option(
      "--category-id <categoryId:number>",
      "The categoryId of the video.",
      { default: 20 },
    )
    .option("--description <description>", "The new description of the video.")
    .option("--dry-run", "Do everything apart from calling the YouTube API.")
    .option("--id <id>", "The ID of the video.")
    .option(
      "--markdown-file <file>",
      "A Markdown file with TOML frontmatter.",
      {
        required: true,
      },
    )
    .option("--title <title>", "The new title of the video.")
    .parse(Deno.args);

  const frontmatter = tomlFrontmatter<Frontmatter>(
    await Deno.readTextFile(options.markdownFile),
  )[0];

  const categoryId = options.categoryId;
  const description = formatDescription(frontmatter);
  const title = options.title ?? frontmatter.page_title;
  const videoId = options.id ?? frontmatter.id;

  console.log({ categoryId, title, videoId });
  console.log(description);
  if (options.dryRun) {
    return;
  }

  await runCommand("youtube3", {
    args: [
      "videos",
      "update",
      "-r",
      `id=${videoId}`,
      "-r",
      `snippet.category-id=${categoryId}`,
      "-r",
      `snippet.description=${description}`,
      "-r",
      `snippet.title=${title}`,
    ],
  });
}

/** Format the description using the video's frontmatter data. */
function formatDescription(frontmatter: Frontmatter): string {
  let description = "See all details on my website\n";
  description += `https://bauke.xyz/v/${frontmatter.id}/\n`;

  const chapters = frontmatter.speedrun?.chapters ?? [];
  if (chapters.length > 0) {
    description += `\nChapters\n`;
    for (const [timestamp, text] of chapters) {
      description += `${timestamp} ${text}\n`;
    }
  }

  return description;
}

if (import.meta.main) {
  void main();
}
