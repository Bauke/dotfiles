import { Command } from "./dependencies.ts";
import { runCommand } from "./utilities.ts";

const imagePath = new URL("../data/wallpaper.jpg", import.meta.url).pathname;

async function main(): Promise<void> {
  const { options } = await new Command()
    .name("desktop-wallpaper")
    .description("Desktop wallpaper changer for XFCE")
    .option("--unsplash", "Download a random Unsplash wallpaper")
    .option("--height <height:number>", "The height of the image", {
      default: 1080,
      depends: ["unsplash"],
    })
    .option(
      "--save-current <file:file>",
      "Save the current wallpaper to a different file",
    )
    .option("--set <file:file>", "Set a file as the wallpaper")
    .option("--width <width:number>", "The width of the image", {
      default: 1920,
      depends: ["unsplash"],
    })
    .parse(Deno.args);

  if (options.saveCurrent) {
    await Deno.copyFile(imagePath, options.saveCurrent);
  }

  if (options.set) {
    await setWallpaper(options.set);
  }

  if (options.unsplash) {
    await downloadImage(
      `https://source.unsplash.com/random/${options.width}x${options.height}`,
    );
    console.log("Saved Unsplash image to");
    console.log("-", imagePath);
    await setWallpaper();
  }
}

async function downloadImage(url: string): Promise<void> {
  await runCommand("curl", {
    args: ["-fsLS", url, "-o", imagePath],
  });
}

async function setWallpaper(file: string = imagePath): Promise<void> {
  const monitors = ["monitorHDMI-0", "monitorHDMI-1"];
  for (const monitor of monitors) {
    await runCommand("xfconf-query", {
      args: [
        "-c",
        "xfce4-desktop",
        "-p",
        `/backdrop/screen0/${monitor}/workspace0/last-image`,
        "-s",
        file,
      ],
    });
  }
}

if (import.meta.main) {
  void main();
}
