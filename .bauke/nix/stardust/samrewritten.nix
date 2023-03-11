{ lib
, stdenv
, fetchFromGitHub
, pkg-config
, curl
, glibmm
, gtkmm3
, steam
, yajl
}:

stdenv.mkDerivation rec {
  pname = "SamRewritten";
  version = "202008";

  src = fetchFromGitHub {
    owner = "PaulCombal";
    repo = pname;
    rev = version;
    sha256 = "sha256-q3kDuZdnWw1Nfu3hVDD8XKJzbmwlx/lafJfhziVYKhw=";
  };

  nativeBuildInputs = [ pkg-config ];
  buildInputs = [ curl glibmm gtkmm3 steam yajl ];

  installFlags = [ "PREFIX=$(out)" ];

  postInstall = ''
    substituteInPlace "$out/share/applications/samrewritten.desktop" \
      --replace "Exec=/usr" "Exec=$out"
  '';

  meta = with lib; {
    description = "Steam Achievement Manager For Linux. Rewritten in C++.";
    homepage = "https://github.com/PaulCombal/SamRewritten";
    license = licenses.gpl3;
    platforms = [ "x86_64-linux" ];
  };
}
