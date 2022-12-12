import { Command } from "https://deno.land/x/cliffy@v0.25.5/command/mod.ts";

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
    .option(
      "--volume <volume:number>",
      "Change the volume by a relative amount",
    )
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
}

type Status = {
  artist?: string;
  title?: string;
};

async function notifyCurrentSong(): Promise<void> {
  const status: Status = await (await fetch(`${remoteApi}/status`)).json();
  if (status.artist === undefined || status.title === undefined) {
    return;
  }

  await Deno.run({
    cmd: ["notify-send", status.title, status.artist],
  }).status();
}

if (import.meta.main) {
  void main();
}
