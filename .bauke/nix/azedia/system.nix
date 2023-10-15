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

    firewall = {
      # * 22 is for SSH.
      # * 53, 5353 and 5355 are for `resolved` so we can access the server via
      #   the `<hostname>.local` domain. Maybe not all of the ports are needed
      #   but having them all makes it work.
      # * 80 and 443 are for Caddy HTTP and HTTPS access respectively.
      allowedTCPPorts = [ 22 53 5353 5355 80 443 ];
      allowedUDPPorts = [ 22 53 5353 5355 80 443 ];
    };

    # It probably isn't necessary to manually set the IPs but do it anyway just
    # in case if something else gets messed up they at least stay the same. Both
    # IPs are the original ones that were automatically assigned.
    interfaces.wlan0.ipv4.addresses = [{
      address = "192.168.0.202";
      prefixLength = 24;
    }];

    interfaces.wlan0.ipv6.addresses = [{
      address = "2a02:1810:9c2d:6b00:afd9:d79c:644d:f12f";
      prefixLength = 64;
    }];

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
