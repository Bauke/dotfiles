# Configuration for programs and services.

{ ... }:

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

    openssh = {
      enable = true;
      settings = {
        PasswordAuthentication = false;
        PermitRootLogin = "no";
      };
    };
  };
}
