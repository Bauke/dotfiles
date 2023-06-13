# Configuration for user accounts.

{ pkgs, ... }:

{
  users = {
    defaultUserShell = pkgs.zsh;

    users.bauke = {
      description = "Bauke";
      extraGroups = [ "networkmanager" "vboxusers" "wheel" ];
      isNormalUser = true;
    };
  };
}
