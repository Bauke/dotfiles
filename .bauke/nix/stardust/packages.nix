# The list of system packages to install.

{ pkgs, ... }:

{
  environment = {
    systemPackages = with pkgs; [
      aether-lv2
      airwindows-lv2
      android-studio
      apngasm
      ardour
      autorestic
      bat
      bento4
      # bespokesynth
      bolliedelayxt-lv2
      bottom
      calf
      calibre
      carla
      catppuccin-cursors
      ChowCentaur
      ChowKick
      ChowPhaser
      chromium
      clang
      conky
      delayarchitect
      delta
      deno
      dig
      direnv
      distrho
      du-dust
      dupeguru
      eclipses.eclipse-java
      element-desktop
      ensemble-chorus
      eq10q
      eza
      fd
      ffmpeg
      fire
      firefox
      flameshot
      font-manager
      gegl
      geonkick
      gimp
      git
      git-lfs
      glab
      gnome.file-roller
      gnome.gucharmap
      gramps
      handbrake
      helm
      hexyl
      hydrogen
      ifuse
      imagemagick
      jq
      keepassxc
      kitty
      libimobiledevice
      libnotify
      LibreArp
      LibreArp-lv2
      libreoffice
      librewolf
      limitcpu
      lm_sensors
      lsp-plugins
      lutris
      mangohud
      mat2
      mda_lv2
      metersLv2
      mod-arpeggiator-lv2
      mpv
      nil
      nitrogen
      unstable.nixfmt-rfc-style
      nix-output-monitor
      nodejs
      nodePackages.pnpm
      numlockx
      nvitop
      odin2
      openrazer-daemon
      osu-lazer
      pavucontrol
      peek
      picard
      pkg-config
      podman-compose
      polybar
      polychromatic
      pop-icon-theme
      prismlauncher
      protonup-ng
      protonvpn-cli
      protonvpn-gui
      python3
      python311Packages.argcomplete
      python311Packages.pip
      python311Packages.pipx
      qalculate-gtk
      quadrafuzz
      restic
      resvg
      ripgrep
      rkrlv2
      rnix-lsp
      rofi
      sorcer
      sqlite-interactive
      sqlitebrowser
      standardnotes
      starship
      steam
      string-machine
      surge-XT
      swh_lv2
      tap-plugins
      tauon
      tea
      temurin-bin
      tenacity
      transmission-gtk
      tunefish
      typst
      typst-lsp
      unstable.atuin
      unstable.turbo
      vagrant
      vital
      vscodium.fhs
      watchexec
      wolf-shaper
      x42-plugins
      xarchiver
      xclip
      xdotool
      xfce.xfce4-genmon-plugin
      xfce.xfce4-pulseaudio-plugin
      xfce.xfce4-timer-plugin
      xfce.xfce4-whiskermenu-plugin
      xorg.libXcursor
      zam-plugins
      zynaddsubfx
      (callPackage ./samrewritten.nix { })
      (bespokesynth.overrideAttrs (old: {
        src = fetchFromGitHub {
          owner = "BespokeSynth";
          repo = "BespokeSynth";
          rev = "c4eb7dd9a877cded8cc1701eb8a1dbcffc7ffcc2";
          hash = "sha256-wfqN6Vx5hYij8Mz6Ae7frUbhdj3nxtCHfpvC2+XNAJ4=";
          fetchSubmodules = true;
        };
      }))
      (unstable.clonehero.overrideAttrs (
        {
          postInstall ? "",
          ...
        }:
        {
          # Remove the built-in songs from Clone Hero.
          postInstall =
            postInstall
            + ''
              rm -rf "$out/share/clonehero/StreamingAssets/songs"
              mkdir "$out/share/clonehero/StreamingAssets/songs"
            '';
        }
      ))
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
