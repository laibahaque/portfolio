import { ViewTransition } from "react";
import type { CoverVariant } from "@/data/projects";
import { ProjectCover } from "@/components/work/ProjectCover";

export function ProjectGallery({ variant, caption }: { variant: CoverVariant; caption: string }) {
  return (
    <figure>
      <ViewTransition name={`cover-${variant}`}>
        <ProjectCover variant={variant} tone="light" />
      </ViewTransition>
      <figcaption className="mt-4 text-sm text-muted">
        {caption}
        <span className="block">UI screenshots can be added manually under public/images/projects.</span>
      </figcaption>
    </figure>
  );
}
