# The list of system packages to install.

{ pkgs, ... }:

{
  environment = {
    systemPackages = with pkgs; [
      bat
      catppuccin-cursors
      chromium
      exa
      delta
      deno
      direnv
      firefox
      ffmpeg
      gegl
      gimp
      git
      imagemagick
      kitty
      libnotify
      librewolf
      mat2
      mpv
      nodejs
      nodePackages.pnpm
      nvitop
      osu-lazer
      pavucontrol
      picard
      pop-icon-theme
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
      xorg.libXcursor
      xfce.xfce4-pulseaudio-plugin
      xfce.xfce4-timer-plugin
      xfce.xfce4-whiskermenu-plugin
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
