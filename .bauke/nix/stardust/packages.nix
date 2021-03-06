# The list of system packages to install.

{ pkgs, ... }:

{
  environment = {
    systemPackages = with pkgs; [
      airshipper
      bat
      bottom
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
      font-manager
      gegl
      gimp
      git
      handbrake
      imagemagick
      jq
      keepassxc
      kitty
      libnotify
      librewolf
      limitcpu
      lm_sensors
      lutris
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
      protonvpn-gui
      python310Packages.pipx
      qalculate-gtk
      ranger
      restic
      ripgrep
      rnix-lsp
      rustup
      sqlite
      sqlitebrowser
      standardnotes
      starship
      steam
      tauon
      tea
      transmission-gtk
      vscodium.fhs
      xarchiver
      xclip
      xdotool
      xfce.xfce4-pulseaudio-plugin
      xfce.xfce4-timer-plugin
      xfce.xfce4-whiskermenu-plugin
      xorg.libXcursor
      (callPackage ./samrewritten.nix { })
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
