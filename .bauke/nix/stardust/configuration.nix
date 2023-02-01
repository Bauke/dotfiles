# The main configuration file.

{ pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix
    ./packages.nix
    ./programs-services.nix
    ./users.nix
    ./system.nix
  ];

  nix = {
    settings.experimental-features = [ "flakes" "nix-command" ];
  };

  nixpkgs = {
    config.allowUnfree = true;
  };

  # Before changing this value read the documentation for this option!
  # https://search.nixos.org/options?channel=22.11&show=system.stateVersion
  system.stateVersion = "22.11";
}
