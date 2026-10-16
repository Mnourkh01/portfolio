import { Component, KeyRound, LayoutGrid, ShieldCheck, Store } from "lucide-react";

type Point = { x: number; y: number };

type Node = {
  id: string;
  wide: Point;
  compact: Point;
};

const WIDE = { w: 1440, h: 740, plane: { x: 500, y: 372, w: 460, h: 276 }, store: { w: 300, h: 116 } };
const COMPACT = { w: 400, h: 520, plane: { x: 200, y: 262, w: 300, h: 196 }, store: { w: 112, h: 64 } };

const STORES: Node[] = [
  { id: "1", wide: { x: 168, y: 150 }, compact: { x: 68, y: 52 } },
  { id: "2", wide: { x: 500, y: 74 }, compact: { x: 200, y: 52 } },
  { id: "3", wide: { x: 832, y: 150 }, compact: { x: 332, y: 52 } },
  { id: "4", wide: { x: 168, y: 590 }, compact: { x: 104, y: 470 } },
  { id: "5", wide: { x: 790, y: 640 }, compact: { x: 296, y: 470 } },
];

const SIGNATURE: Node = { id: "sig", wide: { x: 500, y: 182 }, compact: { x: 200, y: 124 } };

function Lines({ mode }: { mode: "wide" | "compact" }) {
  const g = mode === "wide" ? WIDE : COMPACT;
  return (
    <svg
      className={`eng-lines eng-lines-${mode}`}
      viewBox={`0 0 ${g.w} ${g.h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {STORES.map((s) => {
        const p = s[mode];
        return (
          <line
            key={s.id}
            x1={p.x}
            y1={p.y}
            x2={g.plane.x}
            y2={g.plane.y}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

export default function EngineDiagram() {
  return (
    <div className="eng">
      <div className="eng-map">
        <Lines mode="wide" />
        <Lines mode="compact" />
        <p
          className="eng-node eng-sig"
          aria-hidden="true"
          style={{
            "--x": SIGNATURE.wide.x,
            "--y": SIGNATURE.wide.y,
            "--cx": SIGNATURE.compact.x,
            "--cy": SIGNATURE.compact.y,
          }}
        >
          Signed, HMAC-SHA256
        </p>
        <div
          className="eng-node eng-plane"
          style={{
            "--x": WIDE.plane.x,
            "--y": WIDE.plane.y,
            "--w": WIDE.plane.w,
            "--h": WIDE.plane.h,
            "--cx": COMPACT.plane.x,
            "--cy": COMPACT.plane.y,
            "--cw": COMPACT.plane.w,
            "--ch": COMPACT.plane.h,
          }}
        >
          <p className="ep-k">
            <Component aria-hidden="true" />
            Main component
          </p>
          <p className="ep-t">Control plane</p>
          <ul className="ep-list">
            <li>
              <KeyRound aria-hidden="true" />
              Licences
            </li>
            <li>
              <LayoutGrid aria-hidden="true" />
              Feature access per site
            </li>
            <li>
              <ShieldCheck aria-hidden="true" />
              Fail-closed gate
            </li>
          </ul>
        </div>
        <ul className="eng-stores" aria-label="Five live storefronts">
          {STORES.map((s) => (
            <li
              key={s.id}
              className="eng-node eng-store"
              style={{
                "--x": s.wide.x,
                "--y": s.wide.y,
                "--w": WIDE.store.w,
                "--h": WIDE.store.h,
                "--cx": s.compact.x,
                "--cy": s.compact.y,
                "--cw": COMPACT.store.w,
                "--ch": COMPACT.store.h,
              }}
            >
              <Store aria-hidden="true" />
              <span className="es-t">Storefront {s.id}</span>
              <span className="es-s">Signed health report</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="eng-legend">
        <p className="eng-key">
          <span className="el-line" aria-hidden="true" />
          Signed call, HMAC-SHA256
        </p>
        <p className="eng-note">
          The control plane issues licences and per-site feature access through a fail-closed capability
          gate, and each store sends signed health reports, so no site can reach another site’s data.
        </p>
      </div>
    </div>
  );
}
