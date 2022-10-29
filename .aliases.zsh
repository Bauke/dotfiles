alias c.="codium ."
alias cat="bat"
alias icat="kitty +kitten icat"
alias ls="exa"
alias mgs="mgitstatus"
alias o="xdg-open"
alias ssh="kitty +kitten ssh"
alias tar-extract="tar -x -f"
alias tar-list="tar -t -f"
alias trash="gio trash"
alias youtube-dl="yt-dlp"

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

alias clipboard-to-file="xclip -sel clip -o > $1"
alias file-to-clipboard="xclip -sel clip -i $1"

alias restic-b2="source $HOME/.bauke/restic-b2-credentials.zsh && restic"
