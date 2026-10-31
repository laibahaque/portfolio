import type { CoverVariant } from "@/data/projects";

const palette = {
  light: { bg: "#E6DFD2", ink: "#161411", mark: "#9A3426", line: "rgba(22,20,17,0.16)" },
  dark: { bg: "#241F1B", ink: "#F3EFE7", mark: "#E7A090", line: "rgba(243,239,231,0.16)" },
} as const;

export function ProjectCover({
  variant,
  tone = "light",
}: {
  variant: CoverVariant;
  tone?: "light" | "dark";
}) {
  const color = palette[tone];

  return (
    <div className="aspect-[16/10] overflow-hidden" data-cover style={{ backgroundColor: color.bg }}>
      <svg viewBox="0 0 640 400" className="h-full w-full" role="img" aria-hidden="true">
        {variant === "queue" && <Queue color={color} />}
        {variant === "route" && <Route color={color} />}
        {variant === "ledger" && <Ledger color={color} />}
        {variant === "window" && <Window color={color} />}
        {variant === "dial" && <Dial color={color} />}
      </svg>
    </div>
  );
}

type Tone = {
  bg: string;
  ink: string;
  mark: string;
  line: string;
};

function Queue({ color }: { color: Tone }) {
  const widths = [470, 390, 430, 300, 350];
  return (
    <>
      <line x1="48" y1="48" x2="48" y2="352" stroke={color.mark} strokeWidth="2" />
      {widths.map((width, index) => (
        <rect
          key={width}
          x="78"
          y={64 + index * 58}
          width={width}
          height="26"
          fill={index === 1 ? color.mark : color.ink}
          opacity={index === 1 ? 1 : 0.88}
        />
      ))}
    </>
  );
}

function Route({ color }: { color: Tone }) {
  const stops = [
    [90, 290],
    [230, 150],
    [390, 230],
    [540, 110],
  ] as const;
  return (
    <>
      {[80, 160, 240, 320].map((y) => (
        <line key={y} x1="40" y1={y} x2="600" y2={y} stroke={color.line} strokeWidth="1" />
      ))}
      <path
        d="M90 290 C 150 290, 170 150, 230 150 S 330 250, 390 230 S 480 110, 540 110"
        fill="none"
        stroke={color.ink}
        strokeWidth="3"
      />
      {stops.map(([x, y], index) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={index === 2 ? 11 : 7} fill={index === 2 ? color.mark : color.ink} />
      ))}
    </>
  );
}

function Ledger({ color }: { color: Tone }) {
  return (
    <>
      <rect x="96" y="48" width="448" height="304" fill="none" stroke={color.ink} strokeWidth="2" />
      <line x1="96" y1="108" x2="544" y2="108" stroke={color.ink} strokeWidth="2" />
      {[0, 1, 2, 3].map((column) => (
        <rect
          key={column}
          x={128 + column * 100}
          y={168 - column * 12}
          width="64"
          height={120 + column * 18}
          fill={column === 2 ? color.mark : color.ink}
        />
      ))}
    </>
  );
}

function Window({ color }: { color: Tone }) {
  return (
    <>
      <rect x="70" y="54" width="500" height="292" fill="none" stroke={color.ink} strokeWidth="2" />
      <line x1="70" y1="108" x2="570" y2="108" stroke={color.ink} strokeWidth="2" />
      <circle cx="98" cy="81" r="6" fill={color.mark} />
      <circle cx="122" cy="81" r="6" fill={color.ink} />
      <circle cx="146" cy="81" r="6" fill={color.ink} />
      <rect x="94" y="132" width="200" height="180" fill={color.ink} />
      <rect x="318" y="132" width="220" height="78" fill="none" stroke={color.ink} strokeWidth="2" />
      <rect x="318" y="230" width="220" height="82" fill={color.mark} />
    </>
  );
}

function Dial({ color }: { color: Tone }) {
  return (
    <>
      <circle cx="320" cy="200" r="120" fill="none" stroke={color.ink} strokeWidth="2" />
      <circle cx="320" cy="200" r="6" fill={color.mark} />
      <line x1="320" y1="200" x2="410" y2="150" stroke={color.mark} strokeWidth="3" />
      {Array.from({ length: 12 }, (_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        const inner = 132;
        const outer = index % 3 === 0 ? 150 : 142;
        const x1 = 320 + Math.cos(angle) * inner;
        const y1 = 200 + Math.sin(angle) * inner;
        const x2 = 320 + Math.cos(angle) * outer;
        const y2 = 200 + Math.sin(angle) * outer;
        return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color.ink} strokeWidth="2" />;
      })}
    </>
  );
}
