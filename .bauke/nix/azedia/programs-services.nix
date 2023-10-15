# Configuration for programs and services.

{ pkgs, ... }:

{
  programs = {
    zsh.enable = true;
  };

  services = {
    openssh.enable = true;

    # Enable `resolved` so the `<hostname>.local` domain works.
    resolved.enable = true;
  };
}
