# Configuration for programs and services.

{ pkgs, ... }:

{
  programs = {
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

    xserver = {
      enable = true;
      layout = "be";
      videoDrivers = [ "nvidia" ];
      xkbVariant = "";

      desktopManager = {
        xterm.enable = false;
        xfce = {
          enable = true;
          enableXfwm = false;
          noDesktop = true;
        };
      };

      displayManager = {
        defaultSession = "xfce";
        lightdm = {
          enable = true;
          extraSeatDefaults = ''
            greeter-setup-script=${pkgs.numlockx}/bin/numlockx on
          '';
        };
      };

      windowManager.i3 = {
        enable = true;
        extraPackages = with pkgs; [
          dmenu
          i3status
        ];
      };
    };
  };
}
