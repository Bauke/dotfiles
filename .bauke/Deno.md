# Deno Scripts

## Scripts

- [`bulk`]: bulk doer of things.
- [`codium-extensions`]: save and install VS Codium extensions using their identifier.
- [`copy-nixos-config`]: copies NixOS configuration from `$BAUKE_DIR/nix/<hostname>/` to `/etc/nixos/`.
- [`desktop-wallpaper`]: desktop wallpaper changer.
- [`drg-data-entry`]: Deep Rock Galactic data tracker.
- [`edit-youtube-video`]: edit a YouTube video via the Data API.
- [`project-avatar`]: image generator for projects.
- [`simple-git-push`]: `git push` with extra semantics.
- [`tauon-controls`]: remote control CLI for Tauon Music Box.

[`bulk`]: ./scripts/bulk/bulk.ts
[`codium-extensions`]: ./scripts/codium-extensions.ts
[`copy-nixos-config`]: ./scripts/copy-nixos-config.ts
[`desktop-wallpaper`]: ./scripts/desktop-wallpaper.ts
[`drg-data-entry`]: ./scripts/drg-data-entry.ts
[`edit-youtube-video`]: ./scripts/edit-youtube-video.ts
[`project-avatar`]: ./scripts/project-avatar.ts
[`simple-git-push`]: ./scripts/simple-git-push.ts
[`tauon-controls`]: ./scripts/tauon-controls.ts

## Cliffy

For CLI creation [Cliffy] is used, a Deno-specific framework for handling input and parsing arguments.

* A simple command with a `--file <file>` argument:

```ts
// Assuming the script location is `$BAUKE_DIR/scripts`.
import { Command } from "./dependencies.ts";

const { options } = await new Command()
  // CLI information, shown in --help.
  .name("example-cli")
  .description("Description of the program.")
  // Add the --file option with a default value.
  .option("-f, --file <file:file>", "Example file", {
    default: "example.txt"
  })
  .parse(Deno.args);

console.log(options.file);
```

* An example of subcommands can be seen in [`bulk`], each command is created like above but added to the main CLI via `.command("name", Command)`.

[Cliffy]: https://cliffy.io

## Why `bin/` + `scripts/`

Deno has [some issues](https://github.com/denoland/deno/issues/17195) with running files without a file extension (like what you'd want in `bin/`). So instead all the scripts are located in `scripts/` with proper file extensions and the `bin/` files call those scripts using `deno run`.

Though even if Deno didn't have these issues, having massive shebangs would also not be nice, so this setup is fine.
