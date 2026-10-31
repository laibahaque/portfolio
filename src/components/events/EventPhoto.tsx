import { Tilt } from "@/components/motion/Tilt";

export function EventPhoto({ src, alt }: { src: string | null; alt: string }) {
  return (
    <Tilt max={7} className="h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink text-bone">
        {src ? (
          // Real photographs are added later as files in public/events.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col justify-between p-6">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-oxide-soft">Photograph</p>
            <div>
              <p className="font-display text-3xl italic leading-none">To be added</p>
              <p className="mt-3 max-w-xs text-sm text-mist">A photograph from the day goes here. The frame is ready.</p>
            </div>
          </div>
        )}
      </div>
    </Tilt>
  );
}
