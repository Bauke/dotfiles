source "$HOME/.oh-my-zsh/oh-my-zsh.sh"

export EDITOR="nano"
export LESS="-F -X $LESS"

export BAUKE_DIR="$HOME/.bauke"
export CARGO_BIN="$HOME/.cargo/bin"
export LOCAL_BIN="$HOME/.local/bin"
export PNPM_HOME="$HOME/.local/share/pnpm"

export PATH="$PATH:$CARGO_BIN"
export PATH="$PATH:$PNPM_HOME"

source "$HOME/.aliases.zsh"
source "$HOME/.functions.zsh"
source "$HOME/.zle.zsh"

eval "$(register-python-argcomplete pipx)"
eval "$(direnv hook zsh)"
eval "$(starship init zsh)"
