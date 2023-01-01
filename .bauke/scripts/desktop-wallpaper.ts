import { Command } from "https://deno.land/x/cliffy@v0.25.5/command/mod.ts";

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
    .option("--width <width:number>", "The width of the image", {
      default: 1920,
      depends: ["unsplash"],
    })
    .parse(Deno.args);

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
  await Deno.run({
    cmd: ["curl", "-fsLS", url, "-o", imagePath],
  }).status();
}

async function setWallpaper(): Promise<void> {
  const monitors = ["monitorHDMI-0", "monitorHDMI-1"];
  for (const monitor of monitors) {
    await Deno.run({
      cmd: [
        "xfconf-query",
        "-c",
        "xfce4-desktop",
        "-p",
        `/backdrop/screen0/${monitor}/workspace0/last-image`,
        "-s",
        imagePath,
      ],
    }).status();
  }
}

if (import.meta.main) {
  void main();
}