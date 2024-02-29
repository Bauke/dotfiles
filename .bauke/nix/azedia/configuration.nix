# The main configuration file.

{ ... }:

{
  imports = [
    ./hardware-configuration.nix # Created by nixos-generate-config.
    ./packages.nix
    ./programs-services.nix
    ./system.nix
    ./users.nix
  ];

  nix = {
    settings.experimental-features = [
      "flakes"
      "nix-command"
    ];
  };

  nixpkgs = {
    config = {
      allowUnfree = true;
    };
  };

  # Before changing this value read the documentation for this option!
  # https://search.nixos.org/options?channel=23.11&show=system.stateVersion
  system.stateVersion = "23.11";
}
