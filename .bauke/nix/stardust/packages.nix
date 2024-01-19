# The list of system packages to install.

{ pkgs, ... }:

{
  environment = {
    systemPackages = with pkgs; [
      android-studio
      apngasm
      unstable.atuin
      autorestic
      bat
      bento4
      bottom
      calibre
      catppuccin-cursors
      chromium
      clang
      conky
      delta
      deno
      dig
      direnv
      dupeguru
      du-dust
      eclipses.eclipse-java
      element-desktop
      eza
      fd
      ffmpeg
      firefox
      flameshot
      font-manager
      gegl
      gimp
      git
      git-lfs
      glab
      gnome.file-roller
      gramps
      handbrake
      hexyl
      ifuse
      imagemagick
      jq
      keepassxc
      kitty
      libimobiledevice
      libnotify
      libreoffice
      librewolf
      limitcpu
      lm_sensors
      lutris
      mat2
      mpv
      nitrogen
      nix-output-monitor
      nodejs
      nodePackages.pnpm
      numlockx
      nvitop
      osu-lazer
      pavucontrol
      peek
      picard
      pkg-config
      podman-compose
      pop-icon-theme
      prismlauncher
      protonup-ng
      protonvpn-cli
      protonvpn-gui
      python311Packages.argcomplete
      python311Packages.pip
      python311Packages.pipx
      qalculate-gtk
      restic
      resvg
      ripgrep
      rnix-lsp
      # rustup
      sqlite-interactive
      sqlitebrowser
      standardnotes
      starship
      steam
      tauon
      tea
      temurin-bin
      transmission-gtk
      unstable.turbo
      typst
      typst-lsp
      vagrant
      vscodium.fhs
      watchexec
      xarchiver
      xclip
      xdotool
      xfce.xfce4-genmon-plugin
      xfce.xfce4-pulseaudio-plugin
      xfce.xfce4-timer-plugin
      xfce.xfce4-whiskermenu-plugin
      xorg.libXcursor
      (callPackage ./samrewritten.nix { })
      (unstable.clonehero.overrideAttrs ({ postInstall ? "", ... }: {
        # Remove the built-in songs from Clone Hero.
        postInstall = postInstall + ''
          rm -rf "$out/share/clonehero/StreamingAssets/songs"
          mkdir "$out/share/clonehero/StreamingAssets/songs"
        '';
      }))
      (wrapOBS {
        plugins = with obs-studio-plugins; [
          input-overlay
          obs-livesplit-one
          obs-pipewire-audio-capture
          obs-source-record
          obs-vkcapture
        ];
      })
    ];
  };
}
