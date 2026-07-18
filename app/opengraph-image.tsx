import { ImageResponse } from "next/og";
import { LOGO_BARS, LOGO_VIEWBOX } from "@/lib/logo";

export const dynamic = "force-static";
export const alt = "Mohammad Nour · Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGS = ["Java", "Kotlin", "PHP", "TypeScript", "Spring Boot", "Laravel"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e1013",
          color: "#ece7dd",
          padding: "72px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* green accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 12,
            background: "#ff5c1c",
          }}
        />
        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(255,159,28,0.12)",
            filter: "blur(40px)",
          }}
        />

        {/* top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <svg
            viewBox={LOGO_VIEWBOX}
            width={106}
            height={76}
            fill="#ffb454"
          >
            {LOGO_BARS.map(([x, y, w, h, rx]) => (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={w}
                height={h}
                rx={rx}
              />
            ))}
          </svg>
          <div style={{ fontSize: 24, color: "#8a8577" }}>github.com/Mnourkh01</div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1 }}>
            Mohammad Nour
          </div>
          <div style={{ fontSize: 36, color: "#ffb454" }}>
            Backend Engineer · backend-focused full-stack
          </div>
        </div>

        {/* tag chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {TAGS.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 24,
                color: "#b5ae9c",
                border: "1px solid rgba(236,231,221,0.25)",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
