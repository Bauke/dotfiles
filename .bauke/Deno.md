# Deno Scripts

## Scripts

- [`codium-extensions`]: save and install VS Codium extensions using their identifier.
- [`copy-nixos-config`]: copies NixOS configuration from `$BAUKE_DIR/nix/<hostname>/` to `/etc/nixos/`.
- [`desktop-wallpaper`]: desktop wallpaper changer.
- [`edit-youtube-video`]: edit a YouTube video via the Data API.
- [`project-avatar`]: image generator for projects.
- [`simple-git-push`]: `git push` with extra semantics.
- [`tauon-controls`]: remote control CLI for Tauon Music Box.

[`codium-extensions`]: ./scripts/codium-extensions.ts
[`copy-nixos-config`]: ./scripts/copy-nixos-config.ts
[`desktop-wallpaper`]: ./scripts/desktop-wallpaper.ts
[`edit-youtube-video`]: ./scripts/edit-youtube-video.ts
[`project-avatar`]: ./scripts/project-avatar.ts
[`simple-git-push`]: ./scripts/simple-git-push.ts
[`tauon-controls`]: ./scripts/tauon-controls.ts

## Why `bin/` + `scripts/`

Deno has [some issues](https://github.com/denoland/deno/issues/17195) with running files without a file extension (like what you'd want in `bin/`). So instead all the scripts are located in `scripts/` with proper file extensions and the `bin/` files call those scripts using `deno run`.

Though even if Deno didn't have these issues, having massive shebangs would also not be nice, so this setup is fine.