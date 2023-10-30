source "$HOME/.oh-my-zsh/oh-my-zsh.sh"

export DENO_NO_UPDATE_CHECK="true"
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

eval "$(atuin init zsh --disable-up-arrow)"
eval "$(register-python-argcomplete pipx)"
eval "$(direnv hook zsh)"
eval "$(starship init zsh)"
