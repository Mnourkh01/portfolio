import { ArrowUpRight, FileText, Frame, Github } from "lucide-react";
import Image from "next/image";
import { moreWork, type MoreWork as Item } from "@/lib/projects";

function Body({ item }: { item: Item }) {
  return (
    <>
      <p className="mw-sum">{item.summary}</p>
      <ul className="tags" aria-label={`${item.name} stack`}>
        {item.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      {item.link ? (
        <a className="pc-link" href={item.link.href} target="_blank" rel="noopener">
          {item.shot ? null : <Github aria-hidden="true" />}
          {item.link.label}
          <ArrowUpRight aria-hidden="true" />
        </a>
      ) : null}
    </>
  );
}

export default function MoreWork() {
  const shots = moreWork.filter((m) => m.shot !== null);
  const repos = moreWork.filter((m) => m.shot === null);

  return (
    <section className="sec page2" id="more" aria-labelledby="more-title" data-key="more">
      <div className="sec-head">
        <p className="page-tab" aria-hidden="true">
          Page 2
        </p>
        <h2 id="more-title">More work</h2>
        <p>Live sites, a marketplace, product tools and open-source backend starters.</p>
      </div>

      <ul className="mw-grid mw-shots">
        {shots.map((item) => (
          <li key={item.id}>
            <article className="mw" aria-labelledby={`mw-${item.id}`}>
              <p className="flabel" aria-hidden="true">
                <Frame />
                Work / {item.name}
              </p>
              <div className="frame mw-frame">
                {item.shot ? (
                  <Image
                    className="mw-img"
                    src={item.shot.src}
                    width={item.shot.width}
                    height={item.shot.height}
                    alt={item.shot.alt}
                  />
                ) : null}
                <div className="mw-body">
                  <h3 id={`mw-${item.id}`}>{item.name}</h3>
                  <Body item={item} />
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <ul className="mw-grid mw-repos">
        {repos.map((item) => (
          <li key={item.id}>
            <article className="mw" aria-labelledby={`mw-${item.id}`}>
              <p className="flabel" aria-hidden="true">
                <FileText />
                README.md
              </p>
              <div className="frame mw-frame mw-readme">
                <div className="mw-body">
                  <h3 id={`mw-${item.id}`}>
                    <span className="mw-hash" aria-hidden="true">
                      #
                    </span>
                    {item.name}
                  </h3>
                  <Body item={item} />
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
