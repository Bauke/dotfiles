# The list of system packages to install.

{ pkgs, ... }:

{
  environment = {
    systemPackages = with pkgs; [
      bat
      eza
      fd
      git
      kitty.terminfo
      raspberrypi-eeprom
      starship
    ];
  };
}
