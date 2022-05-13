source "$HOME/.oh-my-zsh/oh-my-zsh.sh"

export EDITOR=nano
export LESS="-F -X $LESS"

export CARGO_BIN="$HOME/.cargo/bin"
export LOCAL_BIN="$HOME/.local/bin"

export PATH="$PATH:$CARGO_BIN"
export PATH="$PATH:$LOCAL_BIN"

source "$HOME/.aliases.zsh"

export NVS_HOME="$HOME/.local/share/nvs"
source "$NVS_HOME/nvs.sh"

eval "$(register-python-argcomplete pipx)"
eval "$(starship init zsh)"
