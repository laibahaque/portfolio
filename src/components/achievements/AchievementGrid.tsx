import { achievements } from "@/data/achievements";
import { AwardCard } from "@/components/achievements/AwardCard";

export function AchievementGrid() {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((item) => (
        <li key={item.id}>
          <AwardCard item={item} />
        </li>
      ))}
    </ol>
  );
}
