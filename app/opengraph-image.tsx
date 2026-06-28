import { ImageResponse } from "next/og";

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
          background: "#020402",
          color: "#e9ecf6",
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
            background: "#00ff5f",
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
            background: "rgba(0,255,95,0.18)",
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
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#00ff5f",
              }}
            />
            <div style={{ fontSize: 26, letterSpacing: 6, color: "#7fbf90" }}>
              M.NOUR
            </div>
          </div>
          <div style={{ fontSize: 24, color: "#4d7a59" }}>github.com/Mnourkh01</div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1 }}>
            Mohammad Nour
          </div>
          <div style={{ fontSize: 36, color: "#00ff5f" }}>
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
                color: "#cdeed4",
                border: "1px solid rgba(0,255,95,0.35)",
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
