# General system configuration.

{ pkgs, ... }:

{
  boot = {
    kernelPackages = pkgs.linuxKernel.packages.linux_rpi4;
    loader = {
      grub.enable = false;
      generic-extlinux-compatible.enable = true;
    };
  };

  console = {
    keyMap = "be-latin1";
  };

  environment = {
    shells = [ pkgs.zsh ];
  };

  hardware.enableRedistributableFirmware = true;

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
    hostName = "azedia";

    wireless = {
      enable = true;
      # The "wireless.env" should have "HOME_SSID=name" and "HOME_PSK=password"
      # set in it, then NixOS uses them to replace the `@variable@` ones below.
      environmentFile = "/var/secrets/wireless.env";
      interfaces = [ "wlan0" ];
      networks."@HOME_SSID@".psk = "@HOME_PSK@";
    };
  };

  time.timeZone = "Europe/Brussels";

  virtualisation = {
    docker = {
      enable = true;
      storageDriver = "btrfs";
    };
  };
}
