"use client";

import { projectCategories, type ProjectCategory } from "@/data/projects";

type ProjectFilterProps = {
  active: ProjectCategory;
  onChange: (category: ProjectCategory) => void;
};

export function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
      {projectCategories.map((category) => {
        const selected = category === active;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(category)}
            className={selected ? "btn btn-primary min-h-10 px-4" : "btn btn-secondary min-h-10 px-4"}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
