import { AppWindow, ArrowDown, ArrowRight, Code, Frame, GitPullRequest, PanelsTopLeft, ShieldCheck, Undo2 } from "lucide-react";
import type { ReactNode } from "react";

type Step = {
  id: string;
  title: string;
  text: string;
  icon: ReactNode;
  gate: boolean;
};

const STEPS: Step[] = [
  { id: "design", title: "Design", text: "I own the layout, the UX and the visuals.", icon: <PanelsTopLeft />, gate: false },
  { id: "build", title: "Build", text: "From the backend to the UI, end to end.", icon: <Code />, gate: false },
  {
    id: "test",
    title: "Test gate",
    text: "Automated tests pass before anything ships. My QA automation background at Amdocs shaped this.",
    icon: <ShieldCheck />,
    gate: true,
  },
  { id: "browser", title: "Browser check", text: "Real browser and device QA, in both languages.", icon: <AppWindow />, gate: false },
  { id: "review", title: "Review", text: "Code review, then release with CI on GitHub Actions.", icon: <GitPullRequest />, gate: false },
];

export default function Process() {
  return (
    <section className="sec process" id="process" aria-labelledby="process-title" data-key="process">
      <p className="flabel" aria-hidden="true">
        <Frame />
        Process / How I ship
      </p>
      <div className="frame sec-frame pframe">
        <div className="p-head">
          <h2 id="process-title">How I ship</h2>
          <p>
            AI coding agents (Claude Code, Codex) are part of the daily workflow, and every change is
            still tested and verified before it ships.
          </p>
        </div>
        <div className="flow-wrap">
          <ol className="flow">
            {STEPS.map((step, i) => (
              <li key={step.id} className={step.gate ? "node is-gate" : "node"}>
                <span className="n-ic" aria-hidden="true">
                  {step.icon}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {step.gate ? (
                  <p className="n-loop">
                    <Undo2 aria-hidden="true" />
                    Red tests go back to Build.
                  </p>
                ) : null}
                {i < STEPS.length - 1 ? (
                  <span className="arrow" aria-hidden="true">
                    <ArrowRight className="ar-h" />
                    <ArrowDown className="ar-v" />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="loop" aria-hidden="true">
            <span>Red tests go back to Build</span>
          </p>
          <div className="psel" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <p className="ship">
          <span className="dot" aria-hidden="true" />
          Then it ships to real users.
        </p>
      </div>
    </section>
  );
}
