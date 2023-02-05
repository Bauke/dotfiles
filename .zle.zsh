# See "man zshzle" for ZLE documentation.

# Paste URLs inside quotes if there are special characters.
autoload -Uz bracketed-paste-url-magic
zle -N bracketed-paste bracketed-paste-url-magic
