import type { SimpleIcon } from "simple-icons";
import {
  siArduino,
  siBootstrap,
  siCplusplus,
  siCss,
  siCursor,
  siExpress,
  siFirebase,
  siHtml5,
  siJavascript,
  siMongodb,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siThreedotjs,
} from "simple-icons";

const marks: { name: string; icon: SimpleIcon }[] = [
  { name: "JavaScript", icon: siJavascript },
  { name: "HTML5", icon: siHtml5 },
  { name: "CSS3", icon: siCss },
  { name: "Java", icon: siOpenjdk },
  { name: "Python", icon: siPython },
  { name: "C++", icon: siCplusplus },
  { name: "Three.js", icon: siThreedotjs },
  { name: "React", icon: siReact },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Express", icon: siExpress },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Bootstrap", icon: siBootstrap },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MySQL", icon: siMysql },
  { name: "MongoDB", icon: siMongodb },
  { name: "Firebase", icon: siFirebase },
  { name: "Arduino", icon: siArduino },
  { name: "Cursor", icon: siCursor },
];

export function SkillMarks() {
  return (
    <ul data-reveal-group className="mt-10 grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-4 lg:grid-cols-8">
      {marks.map((mark) => (
        <li key={mark.name} data-reveal-item data-animate="scale" className="bg-bone">
          <div className="flex h-full flex-col items-center justify-center gap-3 px-3 py-6 text-center">
            <svg viewBox="0 0 24 24" className="size-8" role="img" aria-label={mark.name}>
              <path d={mark.icon.path} fill={`#${mark.icon.hex}`} />
            </svg>
            <span className="text-[0.72rem] font-medium tracking-wide text-ink">{mark.name}</span>
          </div>
        </li>
      ))}
      <li data-reveal-item data-animate="scale" className="bg-bone">
        <div className="flex h-full flex-col items-center justify-center gap-3 px-3 py-6 text-center">
          <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true">
            <circle cx="12" cy="12" r="2.2" fill="#9a3426" />
            <path
              d="M12 3.5v3.2M12 17.3V21M3.5 12h3.2M17.3 12H21M6 6l2.2 2.2M15.8 15.8 18 18M18 6l-2.2 2.2M8.2 15.8 6 18"
              fill="none"
              stroke="#161411"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[0.72rem] font-medium tracking-wide text-ink">AI agents</span>
        </div>
      </li>
    </ul>
  );
}
