* [Restic Documentation](https://restic.readthedocs.io/en/stable/index.html)

## Credentials

File location is `$BAUKE_DIR/data/restic-b2-credentials.zsh`.

```zsh
export B2_ACCOUNT_ID=""
export B2_ACCOUNT_KEY=""
export RESTIC_PASSWORD=""
export RESTIC_REPOSITORY=""
```

## Commands

The `restic-b2` command is located in [`.aliases.zsh`](https://git.bauke.xyz/Bauke/dotfiles/src/commit/b7d791c88ad42a88f6651d7b299023bba4995911/.aliases.zsh#L28).

* Create a new snapshot:

```zsh
restic-b2 backup --tag '<month> <year>' <directory>
```

* List snapshots:

```zsh
restic-b2 snapshots
```

* Restore a snapshot:

```zsh
restic-b2 restore <snapshot ID> --target <directory>
```

* Check snapshot health:

```zsh
restic-b2 check
```

## Backups

* Monthly music library backup:

```zsh
restic-b2 backup --tag "$(date-last-month-year)" ~/Beets
```

* KeePassXC database:

```zsh
restic-b2 backup ~/Bauke.kdbx
```
