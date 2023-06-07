import { Command } from "./dependencies.ts";
import { pathExists, runCommand } from "./utilities.ts";

const hiddenApi = "http://127.0.0.1:7813";
const remoteApi = "http://127.0.0.1:7814/api1";

async function main(): Promise<void> {
  const { options } = await new Command()
    .name("tauon-controls")
    .description("Small remote control CLI for Tauon Music Box!")
    .option("--current-song", "Send a notification with the current song.")
    .option("--next-song", "Play the next song.")
    .option("--play-pause", "Toggle play or pause.")
    .option("--previous-song", "Play the previous song.")
    .option("--print <print:string>", "Print data from the current song.")
    .option(
      "--volume <volume:number>",
      "Change the volume by a relative amount.",
    )
    .option("--write-image", "Write the album cover image to a temporary file.")
    .parse(Deno.args);

  if (options.currentSong) {
    await notifyCurrentSong();
  }

  if (options.nextSong) {
    await fetch(`${remoteApi}/next`);
  }

  if (options.playPause) {
    await fetch(`${hiddenApi}/playpause/`);
  }

  if (options.previousSong) {
    await fetch(`${remoteApi}/back`);
  }

  if (options.volume !== undefined) {
    await fetch(`${remoteApi}/setvolumerel/${options.volume}`);
  }

  if (options.print !== undefined) {
    const status = await getStatus();
    const progressPercentage = ((status.progress / status.track.duration) * 100)
      .toFixed(2);
    const markersAndReplacements = [
      ["album", status.album],
      ["artist", status.artist],
      ["title", status.title],
      ["progress", progressPercentage],
    ];

    let formattedString = options.print;
    for (const [marker, replacement] of markersAndReplacements) {
      const regex = new RegExp(`<${marker}>`, "g");
      formattedString = formattedString.replace(regex, replacement);
    }

    console.log(formattedString);
  }

  if (options.writeImage) {
    const status = await getStatus();
    const path = `/tmp/tauon-cover-${status.id}.jpg`;
    if (await pathExists(path)) {
      console.log(path);
      return;
    }

    const image = await fetch(`${remoteApi}/pic/medium/${status.id}`);
    if (image.body === null) {
      return;
    }

    const imageBuffer = new Uint8Array(await image.arrayBuffer());
    await Deno.writeFile(path, imageBuffer);
    console.log(path);
  }
}

type Status = {
  album: string;
  artist: string;
  id: number;
  progress: number;
  title: string;
  track: {
    duration: number;
  };
};

async function getStatus(): Promise<Status> {
  return await (await fetch(`${remoteApi}/status`)).json();
}

async function notifyCurrentSong(): Promise<void> {
  const status = await getStatus();
  await runCommand("notify-send", {
    args: [status.title, status.artist],
  });
}

if (import.meta.main) {
  void main();
}
