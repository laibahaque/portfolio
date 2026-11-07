import type { Achievement } from "@/data/achievements";

export function AwardCard({ item }: { item: Achievement }) {
  return (
    <article className="border border-ink/10 p-6">
      <p className="font-display text-3xl italic text-oxide">{item.year}</p>
      <h3 className="mt-3 text-xl tracking-[-0.03em]">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
    </article>
  );
}
