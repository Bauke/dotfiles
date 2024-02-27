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

    picom.enable = true;

    pipewire = {
      alsa.enable = true;
      alsa.support32Bit = true;
      enable = true;
      pulse.enable = true;
      jack.enable = true;
    };

    usbmuxd.enable = true;

    xserver = {
      enable = true;
      layout = "be";
      videoDrivers = [ "nvidia" ];
      xkbVariant = "";

      desktopManager = {
        xterm.enable = false;
        xfce = {
          enable = true;
          enableXfwm = true;
          noDesktop = true;
        };
      };

      displayManager = {
        defaultSession = "xfce+i3";
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
          i3status-rust
          rofi
        ];
      };
    };
  };
}
