# Configuration for user accounts.

{ pkgs, ... }:

{
  users = {
    defaultUserShell = pkgs.zsh;

    users.bauke = {
      description = "Bauke";
      extraGroups = [
        "adbusers"
        "networkmanager"
        "plugdev"
        "vboxusers"
        "wheel"
      ];
      isNormalUser = true;
    };
  };
}
