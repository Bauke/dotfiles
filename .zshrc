# Suggestions by xdg-ninja
export XDG_DATA_HOME="$HOME/.local/share"
export XDG_CONFIG_HOME="$HOME/.config"
export XDG_STATE_HOME="$HOME/.local/state"
export XDG_CACHE_HOME="$HOME/.cache"
export HISTFILE="$XDG_STATE_HOME/zsh/history"
export GTK2_RC_FILES="$XDG_CONFIG_HOME/gtk-2.0/gtkrc"
export XCOMPOSECACHE="$XDG_CACHE_HOME/X11/xcompose"
compinit -d "$XDG_CACHE_HOME/zsh/zcompdump-$ZSH_VERSION"
alias wget=wget --hsts-file="$XDG_DATA_HOME/wget-hsts"

# Oh My ZSH
export ZSH_COMPDUMP="$ZSH/cache/.zcompdump-$HOST"
export ZSH_CUSTOM="$HOME/.config/zsh-custom"
export ZSH="$HOME/.local/share/oh-my-zsh"
zstyle ':omz:update' mode auto   # Enable auto updates
zstyle ':omz:update' frequency 7 # Check every 7 days
source "$ZSH/oh-my-zsh.sh"

# Custom
export DENO_NO_UPDATE_CHECK="true"
export EDITOR="nano"
export LESS="-F -X $LESS"

export BAUKE_DIR="$HOME/.bauke"
export CARGO_BIN="$HOME/.cargo/bin"
export LOCAL_BIN="$HOME/.local/bin"
# export PNPM_HOME="$HOME/.local/share/pnpm"

export LC_ALL="C.UTF-8"

export PATH="$PATH:$LOCAL_BIN"
export PATH="$PATH:$CARGO_BIN"
# export PATH="$PATH:$PNPM_HOME"

# source "$HOME/.aliases.zsh"
# source "$HOME/.functions.zsh"
# source "$HOME/.zle.zsh"

eval "$(atuin init zsh --disable-up-arrow)"
# eval "$(register-python-argcomplete pipx)"
eval "$(direnv hook zsh)"
eval "$(starship init zsh)"
eval "$(zoxide init zsh)"
