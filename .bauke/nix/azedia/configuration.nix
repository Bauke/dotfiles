# The main configuration file.

{ config, pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix # Created by nixos-generate-config.
    ./packages.nix
  ];

  nix = {
    settings.experimental-features = [ "flakes" "nix-command" ];
  };

  nixpkgs = {
    config = {
      allowUnfree = true;
      packageOverrides = pkgs: {
        # Add the unstable channel as a separate package set.
        unstable = import <nixos-unstable> {
          # Pass config through so everything is shared between all channels.
          config = config.nixpkgs.config;
        };
      };
    };
  };

  # Before changing this value read the documentation for this option!
  # https://search.nixos.org/options?channel=23.05&show=system.stateVersion
  system.stateVersion = "23.05";
}
