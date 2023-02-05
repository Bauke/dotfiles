# General aliases.
alias c.="codium ."
alias cat="bat"
alias dust="dust -bs"
alias icat="kitty +kitten icat"
alias ls="exa"
alias mgs="mgitstatus"
alias mpv-audio="mpv --no-video"
alias tar-extract="tar -x -f"
alias tar-list="tar -t -f"
alias trash="gio trash"

# Git aliases.
alias dotfiles="GIT_DIR=$HOME/.dotfiles GIT_WORK_TREE=$HOME"
alias gap="git add --patch"
alias gd="git diff"
alias gdc="git diff --cached"
alias gl="git log"
alias gls="git log --all --decorate --oneline --graph"
alias gp="simple-git-push"
alias gr="git remote"
alias grv="git remote -v"
alias gs="git status"

# Clipboard aliases.
alias clipboard-to-file="xclip -sel clip -o > $1"
alias file-to-clipboard="xclip -sel clip -i $1"
alias gpg-decrypt-clipboard="xclip -sel clip -o | gpg --decrypt"

# See '$BAUKE_DIR/Restic Backups.md' for information.
alias restic-b2="source $BAUKE_DIR/data/restic-b2-credentials.zsh && restic"
