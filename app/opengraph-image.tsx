import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LOGO_SRC } from "@/lib/logo";
import { FILE, PERSON } from "@/lib/site";
import { tokenHex } from "@/lib/tokens";

export const dynamic = "force-static";
export const alt = "Mohammad Nour, Product Engineer in Amman, Jordan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  canvas: tokenHex("canvas"),
  frame: tokenHex("frame"),
  ink: tokenHex("ink"),
  ink2: tokenHex("ink-2"),
  ink3: tokenHex("ink-3"),
  line: tokenHex("line"),
  accent: tokenHex("accent"),
  accentInk: tokenHex("accent-ink"),
  me: tokenHex("cursor-me"),
};

const HANDLES = [
  { left: -7, top: -7 },
  { right: -7, top: -7 },
  { left: -7, bottom: -7 },
  { right: -7, bottom: -7 },
];

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", LOGO_SRC));
  const logoDataUrl = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: C.canvas,
          padding: "40px 56px 48px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", fontSize: 20, color: C.ink3 }}>Home / Desktop 1440</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 14px",
              borderRadius: 999,
              background: C.frame,
              border: `1px solid ${C.line}`,
              fontSize: 20,
              color: C.ink,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: C.me }} />
            Live
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: C.frame,
            borderRadius: 6,
            padding: "40px 64px 48px",
            boxShadow: "0 20px 40px -24px rgba(17,17,17,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                background: C.frame,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={logoDataUrl} width={52} height={34} alt="" />
            </div>
            <div style={{ display: "flex", fontSize: 26, color: C.ink3 }}>
              {FILE.owner} / {FILE.name}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignSelf: "flex-start", position: "relative", padding: "0 6px" }}>
              <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: -4, color: C.ink, lineHeight: 1 }}>
                {PERSON.name}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: -6,
                  right: 0,
                  bottom: -6,
                  border: `3px solid ${C.accent}`,
                  display: "flex",
                }}
              >
                {HANDLES.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      width: 14,
                      height: 14,
                      background: C.frame,
                      border: `3px solid ${C.accent}`,
                      ...h,
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 44, fontWeight: 700, color: C.ink }}>
              {PERSON.role}
            </div>
            <div style={{ display: "flex", marginTop: 10, fontSize: 28, color: C.ink2 }}>{PERSON.line}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
