# NixOS Configurations

## Management

Using the `copy-nixos-config` script, all the configurations are stored in `$BAUKE_DIR/nix/<system>` and copied to `/etc/nixos` for each respective [system](#systems).

* Get a diff between the current files in `/etc/nixos` and `$BAUKE_DIR/nix/<system>`:

```zsh
copy-nixos-config --diff
```

* Copy the configuration and immediately run `nixos-rebuild <command>`:

```zsh
copy-nixos-config --rebuild <command>

# For example, to switch:
copy-nixos-config --rebuild switch
```

## Systems

* [Azedia](./nix/azedia/)
* [Stardust](./nix/stardust/)
