# The list of system packages to install.

{ pkgs, ... }:

{
  environment = {
    systemPackages = with pkgs; [
      exa
      fd
    ];
  };
}
