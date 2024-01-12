# Configuration for programs and services.

{ pkgs, ... }:

{
  programs = {
    adb = {
      enable = true;
    };

    gnupg = {
      agent = {
        enable = true;
        enableSSHSupport = true;
      };
    };

    thunar = {
      plugins = with pkgs.xfce; [ thunar-archive-plugin ];
    };

    zsh = {
      enable = true;
    };
  };

  services = {
    avahi = {
      enable = true;
      nssmdns = true;
    };

    pipewire = {
      alsa.enable = true;
      alsa.support32Bit = true;
      enable = true;
      pulse.enable = true;
    };

    usbmuxd.enable = true;

    xserver = {
      desktopManager.xfce.enable = true;
      enable = true;
      layout = "be";
      videoDrivers = [ "nvidia" ];
      xkbVariant = "";

      displayManager = {
        lightdm = {
          enable = true;
          extraSeatDefaults = ''
            greeter-setup-script=${pkgs.numlockx}/bin/numlockx on
          '';
        };
      };
    };
  };
}
