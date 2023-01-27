# Deno Scripts

## Why `bin/` + `scripts/`

Deno has [some issues](https://github.com/denoland/deno/issues/17195) with running files without a file extension (like what you'd want in `bin/`). So instead all the scripts are located in `scripts/` with proper file extensions and the `bin/` files call those scripts using `deno run`.

Though even if Deno didn't have these issues, having massive shebangs would also not be nice, so this setup is fine.
