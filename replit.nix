{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.npm
    pkgs.nodePackages.yarn
    pkgs.nodePackages.expo-cli
  ];
  env = {
    PATH = "${pkgs.nodejs-18_x}/bin:${pkgs.nodePackages.npm}/bin:${pkgs.nodePackages.yarn}/bin:$PATH";
  };
}
