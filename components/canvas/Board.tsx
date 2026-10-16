import { Mouse } from "lucide-react";
import { flagships } from "@/lib/projects";
import HeroFrame from "@/components/canvas/HeroFrame";
import FlagshipFrame from "@/components/canvas/FlagshipFrame";

export default function Board() {
  return (
    <div className="board" id="board">
      <div className="viewport">
        <div className="world">
          <HeroFrame />
          <section className="work" id="work" aria-labelledby="work-title">
            <div className="board-title" data-key="work">
              <h2 id="work-title">Selected work</h2>
              <p>
                Six frames from the file, each one designed and built by me. Karmetta and FoloPrint run
                on FoloEngine, the main component between them.
              </p>
            </div>
            {flagships.map((project, i) => (
              <FlagshipFrame key={project.id} project={project} eager={i === 0} />
            ))}
            <p className="wire wire-k" aria-hidden="true">
              <span>runs on</span>
            </p>
            <p className="wire wire-f" aria-hidden="true">
              <span>runs on</span>
            </p>
          </section>
          <div className="mcur" aria-hidden="true">
            <svg viewBox="0 0 20 22">
              <path d="M2 2l15.5 7.2-6.6 1.9-2.6 6.6z" />
            </svg>
            <span className="cur-tag">Mohammad</span>
          </div>
        </div>
        <p className="hint" aria-hidden="true">
          <Mouse />
          <span>Scroll to zoom out</span>
        </p>
      </div>
    </div>
  );
}
