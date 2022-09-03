source "$HOME/.oh-my-zsh/oh-my-zsh.sh"

export EDITOR=nano
export LESS="-F -X $LESS"

export CARGO_BIN="$HOME/.cargo/bin"
export LOCAL_BIN="$HOME/.local/bin"

export PATH="$PATH:$CARGO_BIN"
export PATH="$PATH:$LOCAL_BIN"

source "$HOME/.aliases.zsh"
source "$HOME/.functions.zsh"
source "$HOME/.zle.zsh"

export NVS_HOME="$HOME/.local/share/nvs"
source "$NVS_HOME/nvs.sh"

export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PATH:$PNPM_HOME"

eval "$(register-python-argcomplete pipx)"
eval "$(starship init zsh)"
