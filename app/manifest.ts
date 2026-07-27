import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Piol & Tako",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a1633",
    lang: "fr",
    icons: [
      { src: "/brand/app-icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/app-icon.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    ],
  };
}
