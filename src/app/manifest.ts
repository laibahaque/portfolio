import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Laiba Haque — Game Developer",
    short_name: "Laiba Haque",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F3EFE7",
    theme_color: "#161411",
    lang: "en",
  };
}
