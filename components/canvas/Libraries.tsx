import { ChevronDown, Component, Library } from "lucide-react";
import { stack } from "@/lib/experience";

export default function Libraries() {
  return (
    <section className="sec libs" id="stack" aria-labelledby="stack-title" data-key="stack">
      <p className="flabel" aria-hidden="true">
        <Library />
        Assets / Libraries
      </p>
      <div className="frame sec-frame lframe">
        <div className="l-head">
          <h2 id="stack-title">Stack</h2>
          <p>The languages, frameworks and tools I use to design, build and ship.</p>
        </div>
        <div className="lib-grid">
          {stack.map((group) => (
            <section key={group.id} className="lib" aria-labelledby={`lib-${group.id}`}>
              <h3 id={`lib-${group.id}`}>
                <ChevronDown aria-hidden="true" />
                {group.name}
                <span className="lib-count" aria-hidden="true">
                  {group.items.length}
                </span>
              </h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <Component aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
