# Configuration for programs and services.

{ pkgs, ... }:

{
  programs = {
    zsh.enable = true;
  };

  services = {
    avahi = {
      enable = true;
      nssmdns = true;
      publish = {
        addresses = true;
        domain = true;
        enable = true;
      };
    };

    openssh.enable = true;
  };
}
