import { ImageResponse } from "next/og";

export const alt = "Laiba Haque, junior game developer in Karachi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F3EFE7",
          color: "#161411",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 3 }}>
          <span>Lh.</span>
          <span>KARACHI</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, letterSpacing: 5, color: "#9A3426" }}>GAME DEVELOPER</div>
          <div style={{ fontSize: 86, lineHeight: 0.95, marginTop: 18, letterSpacing: -2 }}>
            Serious about play.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <span>Laiba Haque</span>
          <span>Techversol</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
