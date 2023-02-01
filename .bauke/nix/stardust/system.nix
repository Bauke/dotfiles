# General system configuration.

{ pkgs, ... }:

{
  boot = {
    loader = {
      efi.canTouchEfiVariables = true;
      efi.efiSysMountPoint = "/boot/efi";
      systemd-boot.enable = true;
    };

    supportedFilesystems = [ "ntfs" ];
  };

  console = {
    keyMap = "be-latin1";
  };

  environment = {
    extraOutputsToInstall = [ "dev" ];
    shells = [ pkgs.zsh ];
  };

  fonts.fonts = with pkgs; [
    hasklig
    inter
    iosevka
    noto-fonts
    (nerdfonts.override { fonts = [ "Hasklig" ]; })
  ];

  hardware = {
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
    networkmanager.enable = true;
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
}
