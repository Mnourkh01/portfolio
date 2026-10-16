import { Component, Frame, LayoutGrid, Type } from "lucide-react";
import type { ReactNode } from "react";
import { flagships } from "@/lib/projects";
import { colorTokens } from "@/lib/tokens";

type Row = {
  key: string;
  long: string;
  short: string;
  icon: ReactNode;
};

const HERO_KIDS = [
  { id: "h1", label: "Headline", component: false },
  { id: "role", label: "Role", component: false },
  { id: "line", label: "Intro", component: false },
  { id: "btn", label: "Button/Primary", component: true },
  { id: "btn2", label: "Button/Secondary", component: true },
];

const AFTER_BOARD: Row[] = [
  { key: "more", long: "Page 2 / More work", short: "More work", icon: <LayoutGrid /> },
  { key: "process", long: "Process / How I ship", short: "Process", icon: <Frame /> },
  { key: "experience", long: "Experience / Version history", short: "Experience", icon: <Frame /> },
  { key: "stack", long: "Assets / Libraries", short: "Stack", icon: <Component /> },
  { key: "contact", long: "Contact / Ship it", short: "Contact", icon: <Frame /> },
];

function LayerLink({ row }: { row: Row }) {
  return (
    <a className="ly-row" href={`#${row.key}`} data-layer={row.key}>
      <span className="ly-ic" aria-hidden="true">
        {row.icon}
      </span>
      <span className="ly-long">{row.long}</span>
      <span className="ly-short">{row.short}</span>
    </a>
  );
}

export default function LayersNav() {
  return (
    <nav className="layers" aria-label="Layers">
      <div className="ly-scroll">
        <p className="ly-head" aria-hidden="true">
          <span>Layers</span>
          <span>Page 1</span>
        </p>
        <ol className="ly-list">
          <li className="ly-item">
            <LayerLink
              row={{ key: "home", long: "Home / Desktop 1440", short: "Home", icon: <Frame /> }}
            />
            <ul className="ly-kids" aria-hidden="true">
              {HERO_KIDS.map((kid) => (
                <li key={kid.id} data-kid={kid.id}>
                  {kid.component ? <Component /> : <Type />}
                  {kid.label}
                </li>
              ))}
            </ul>
          </li>
          <li className="ly-item ly-group">
            <LayerLink
              row={{ key: "work", long: "Board / Selected work", short: "Selected work", icon: <LayoutGrid /> }}
            />
            <ol className="ly-sub">
              {flagships.map((f) => (
                <li key={f.id} className="ly-item">
                  <LayerLink
                    row={{
                      key: f.id,
                      long: f.layer,
                      short: f.name,
                      icon: f.visual.type === "diagram" ? <Component /> : <Frame />,
                    }}
                  />
                </li>
              ))}
            </ol>
          </li>
          <li className="ly-sep" aria-hidden="true" />
          {AFTER_BOARD.map((row) => (
            <li key={row.key} className="ly-item">
              <LayerLink row={row} />
            </li>
          ))}
        </ol>
      </div>
      <div className="ly-styles">
        <p className="ly-title">Local styles</p>
        <ul className="sw-list">
          {colorTokens.map((t) => (
            <li key={t.id} className="sw">
              <i className={`sw-chip sw-${t.id}`} aria-hidden="true" />
              <span className="sw-name">{t.name}</span>
              <code className="sw-hex" data-token={t.cssVar}>
                {t.hex}
              </code>
            </li>
          ))}
        </ul>
        <ul className="ty-list">
          <li className="ty ty-display">
            <b aria-hidden="true">Aa</b>Display, Schibsted Grotesk
          </li>
          <li className="ty ty-body">
            <b aria-hidden="true">Aa</b>Body, Instrument Sans
          </li>
        </ul>
      </div>
    </nav>
  );
}
