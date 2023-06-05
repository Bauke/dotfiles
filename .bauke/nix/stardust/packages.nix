# The list of system packages to install.

{ pkgs, ... }:

{
  environment = {
    systemPackages = with pkgs; [
      airshipper
      apngasm
      bat
      bottom
      calibre
      catppuccin-cursors
      chromium
      clang
      # clonehero
      conky
      delta
      deno
      dig
      direnv
      dupeguru
      eclipses.eclipse-java
      exa
      fd
      ffmpeg
      firefox
      flameshot
      font-manager
      gegl
      gimp
      git
      handbrake
      hexyl
      imagemagick
      jq
      keepassxc
      kitty
      libnotify
      libreoffice
      librewolf
      limitcpu
      lm_sensors
      lutris
      mat2
      mkvtoolnix
      mpv
      nitrogen
      nodejs
      nodePackages.pnpm
      numlockx
      nvitop
      osu-lazer
      pavucontrol
      peek
      picard
      pkg-config
      pop-icon-theme
      prismlauncher
      protonup-ng
      protonvpn-gui
      python310Packages.pipx
      qalculate-gtk
      ranger
      restic
      resvg
      ripgrep
      rnix-lsp
      rustup
      shotcut
      sqlite
      sqlitebrowser
      standardnotes
      starship
      steam
      tauon
      tea
      temurin-bin
      transmission-gtk
      turbo
      typst
      typst-lsp
      vscodium.fhs
      xarchiver
      xclip
      xdotool
      xfce.xfce4-genmon-plugin
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
