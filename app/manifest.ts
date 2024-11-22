import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Farm Guard",
    short_name: "farm guard",
    description: "Farming made easy",
    start_url: "/",
    display: "standalone",
    theme_color: "#005161",
    background_color: "#efefef",
    icons: [
      {
        src: "/icon512_rounded.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon512_rounded.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
