import { Check } from "lucide-react";
import { flagships } from "@/lib/projects";
import { PERSON } from "@/lib/site";

const WORK_KEYS = ["work", "more", ...flagships.map((f) => f.id)].join(" ");

const JUMPS = [
  { href: "#work", label: "Work", keys: WORK_KEYS },
  { href: "#process", label: "Process", keys: "process" },
  { href: "#experience", label: "Experience", keys: "experience stack" },
  { href: "#contact", label: "Contact", keys: "contact" },
];

export function BottomBar() {
  return (
    <nav className="pillbar" aria-label="Jump to section">
      <ul>
        {JUMPS.map((j) => (
          <li key={j.href}>
            <a href={j.href} data-layer-group={j.keys}>
              {j.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="sf-in">
        <p>Designed and built by {PERSON.name}, in this file.</p>
        <p>{PERSON.location}</p>
      </div>
    </footer>
  );
}

export function Overlays() {
  return (
    <>
      <div className="toast" aria-hidden="true">
        <span className="tk">
          <Check />
        </span>
        <b>Deployed</b>
        <span>Home is live</span>
      </div>
      <div className="ycur" aria-hidden="true">
        <svg viewBox="0 0 20 22">
          <path d="M2 2l15.5 7.2-6.6 1.9-2.6 6.6z" />
        </svg>
        <span className="cur-tag">You</span>
      </div>
    </>
  );
}
