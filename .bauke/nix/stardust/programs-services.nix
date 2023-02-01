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
      desktopManager.xfce.enable = true;
      displayManager.lightdm.enable = true;
      enable = true;
      layout = "be";
      videoDrivers = [ "nvidia" ];
      xkbVariant = "";
    };
  };
}
