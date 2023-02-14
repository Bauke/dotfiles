# The list of system packages to install.

{ pkgs, ... }:

{
  environment = {
    systemPackages = with pkgs; [
      airshipper
      bat
      catppuccin-cursors
      chromium
      clonehero
      delta
      deno
      direnv
      exa
      ffmpeg
      firefox
      flameshot
      gegl
      gimp
      git
      imagemagick
      jq
      keepassxc
      kitty
      libnotify
      librewolf
      mat2
      mpv
      nodejs
      nodePackages.pnpm
      numlockx
      nvitop
      osu-lazer
      pavucontrol
      picard
      pop-icon-theme
      protonup-ng
      python310Packages.pipx
      qalculate-gtk
      restic
      ripgrep
      rnix-lsp
      rustup
      standardnotes
      starship
      steam
      tauon
      tea
      transmission-gtk
      vscodium.fhs
      xarchiver
      xclip
      xfce.xfce4-pulseaudio-plugin
      xfce.xfce4-timer-plugin
      xfce.xfce4-whiskermenu-plugin
      xorg.libXcursor
      (wrapOBS {
        plugins = with obs-studio-plugins; [
          input-overlay
          obs-pipewire-audio-capture
          obs-source-record
          obs-vkcapture
        ];
      })
    ];
  };
}
