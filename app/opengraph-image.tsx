import { ImageResponse } from "next/og";

export const alt = "Mohammad Nour — Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          color: "#cdeed4",
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: "#00ff5f",
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: 4, color: "#7fbf90" }}>
            M.NOUR
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: "0 18px",
              fontSize: 76,
              lineHeight: 1.02,
              maxWidth: 900,
            }}
          >
            <span>Reliable systems, built with</span>
            <span style={{ color: "#00ff5f" }}>craft.</span>
          </div>
          <div style={{ fontSize: 30, color: "#7fbf90" }}>
            Backend Engineer · Java · Kotlin · PHP · TypeScript
          </div>
        </div>
      </div>
    ),
    size
  );
}
