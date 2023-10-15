# Configuration for user accounts.

{ pkgs, ... }:

{
  users = {
    defaultUserShell = pkgs.zsh;

    users.bauke = {
      description = "Bauke";
      extraGroups = [ "docker" "wheel" ];
      isNormalUser = true;
    };
  };
}
