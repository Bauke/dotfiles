# Dotfiles

## Setup & Usage

Create a directory that'll act as the bare git directory, then initialize it using `$HOME` as the working tree.

```
mkdir $HOME/.dotfiles
git init --bare $HOME/.dotfiles
```

To manage it, use `GIT_DIR` and `GIT_WORK_TREE`. Preferably as an alias.

```
alias dotfiles="GIT_DIR=$HOME/.dotfiles GIT_WORK_TREE=$HOME"
```

From there, prefix `dotfiles` to any commands that recognize these variables.

```
# Git
dotfiles git add .zshrc
dotfiles git status
# VS Codium
dotfiles codium
# ...
```

Hide untracked files from `dotfiles git status`, otherwise everything in `$HOME` will show up.

```
dotfiles git config --local status.showUntrackedFiles no
```

For VS Codium, create `$HOME/.vscode/settings.json`.

```
{
  "git.untrackedChanges": "hidden"
}
```

## Subtleties

### Can't add files from git repositories

For example, since `.oh-my-zsh` is a git repository, files inside `.oh-my-zsh/custom` can't be added. But since they're just scripts like any other, place them directly inside `$HOME` (or anywhere else) and `source <file>` them in `.zshrc` manually.

Another solution is to set `$ZSH_CUSTOM` to something outside the `$ZSH` directory.
