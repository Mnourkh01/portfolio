import { ChevronDown, Component, Library } from "lucide-react";
import { brandIcons } from "@/lib/brand-icons";
import { stack } from "@/lib/experience";

function ItemIcon({ name }: { name: string }) {
  const brand = brandIcons[name];
  if (!brand) return <Component aria-hidden="true" />;
  return (
    <svg className="lib-brand" viewBox={brand.viewBox} aria-hidden="true" focusable="false">
      {brand.parts.map((part) => (
        <path key={part.d.slice(0, 24)} d={part.d} style={part.hex ? { fill: part.hex } : { fill: "currentColor" }} />
      ))}
    </svg>
  );
}

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
                    <ItemIcon name={item} />
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
