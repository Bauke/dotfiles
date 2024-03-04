# General system configuration.

{ pkgs, ... }:

{
  boot = {
    loader = {
      efi.canTouchEfiVariables = true;
      efi.efiSysMountPoint = "/boot/efi";
      systemd-boot.enable = true;
    };
  };

  console = {
    keyMap = "be-latin1";
  };

  environment = {
    extraOutputsToInstall = [ "dev" ];
    shells = [ pkgs.zsh ];
  };

  fonts = {
    fontconfig = {
      defaultFonts = {
        monospace = [ "Hasklig" ];
        sansSerif = [ "Inter" ];
        serif = [ "Inter" ];
      };
    };

    packages = with pkgs; [
      corefonts
      font-awesome
      hasklig
      inter
      iosevka
      victor-mono
      (nerdfonts.override { fonts = [ "Hasklig" ]; })
    ];
  };

  hardware = {
    nvidia = {
      modesetting.enable = true;
    };

    opengl = {
      driSupport32Bit = true;
      enable = true;
    };

    opentabletdriver = {
      enable = true;
    };

    pulseaudio = {
      enable = false;
    };
  };

  i18n = {
    defaultLocale = "en_US.UTF-8";
    extraLocaleSettings = {
      LC_ADDRESS = "en_GB.UTF-8";
      LC_IDENTIFICATION = "en_GB.UTF-8";
      LC_MEASUREMENT = "en_GB.UTF-8";
      LC_MONETARY = "en_GB.UTF-8";
      LC_NAME = "en_GB.UTF-8";
      LC_NUMERIC = "en_GB.UTF-8";
      LC_PAPER = "en_GB.UTF-8";
      LC_TELEPHONE = "en_GB.UTF-8";
      LC_TIME = "en_GB.UTF-8";
    };
  };

  networking = {
    hostName = "stardust";
    networkmanager = {
      enable = true;
      # There is an issue with NetworkManager and nameservers not being added to
      # "/etc/resolv.conf" on `nixos-rebuild switch`, that's why they're
      # specified twice. To make it work, right-click the NetworkManager tray
      # icon and toggle "Enable Networking", then check "/etc/resolv.conf" that
      # this IP is at the top.
      insertNameservers = [ "192.168.0.202" ];
    };
    nameservers = [ "192.168.0.202" ];
  };

  security = {
    rtkit.enable = true;
  };

  sound = {
    enable = true;
  };

  time = {
    timeZone = "Europe/Brussels";
  };

  virtualisation = {
    podman = {
      enable = true;
      defaultNetwork.settings = {
        dns_enabled = true;
      };
    };

    virtualbox = {
      host.enable = true;
    };
  };
}
