"use client";

import { useMemo, useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";

export function WorkExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory>("All");

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.category === active)),
    [active, projects],
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {projectCategories.map((category) => {
            const selected = category === active;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(category)}
                className={
                  selected
                    ? "btn btn-primary min-h-10 px-4"
                    : "btn btn-secondary min-h-10 px-4"
                }
              >
                {category}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-ink-soft">Nothing in this category yet.</p>
      ) : (
        <ul
          key={active}
          className={visible.length > 1 ? "list-in mt-12 grid gap-6 md:grid-cols-2" : "list-in mt-12 grid gap-6"}
        >
          {visible.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} index={projects.indexOf(project)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
