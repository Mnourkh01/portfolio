import { ArrowUpRight, Component, Frame, Lock } from "lucide-react";
import type { Flagship } from "@/lib/projects";
import Image from "next/image";
import EngineDiagram from "@/components/canvas/EngineDiagram";

type Props = {
  project: Flagship;
  eager: boolean;
};

function Visual({ project, eager }: Props) {
  const v = project.visual;

  if (v.type === "diagram") {
    return (
      <div className="frame eng-frame">
        <EngineDiagram />
      </div>
    );
  }

  if (v.type === "duo") {
    return (
      <div className="frame duo-frame">
        <p className="duo-brand">
          <Image src={v.brand.src} width={v.brand.width} height={v.brand.height} alt="" priority={eager} />
          {project.name}
        </p>
        <figure className="duo-shot duo-main">
          <figcaption>Recording</figcaption>
          <Image src={v.main.src} width={v.main.width} height={v.main.height} alt={v.main.alt} priority={eager} />
        </figure>
        <figure className="duo-shot duo-side">
          <figcaption>Settings</figcaption>
          <Image src={v.side.src} width={v.side.width} height={v.side.height} alt={v.side.alt} priority={eager} />
        </figure>
      </div>
    );
  }

  return (
    <div className="frame shot-frame">
      <Image
        src={v.shot.src}
        width={v.shot.width}
        height={v.shot.height}
        alt={v.shot.alt}
        priority={eager}
      />
    </div>
  );
}

export default function FlagshipFrame({ project, eager }: Props) {
  const titleId = `${project.id}-title`;
  const isComponent = project.visual.type === "diagram";

  return (
    <article
      className={`grp grp-proj grp-${project.visual.type}`}
      id={project.id}
      aria-labelledby={titleId}
      tabIndex={-1}
      data-key={project.id}
      data-frame={project.id}
      data-col={project.col}
      data-row={project.row}
      data-card={project.card}
      data-notes={project.notes.length}
    >
      <p className="flabel" aria-hidden="true">
        {isComponent ? <Component /> : <Frame />}
        {project.frame}
      </p>
      <div className="pcard">
        <p className="pc-k">{project.kind}</p>
        <h3 id={titleId}>{project.name}</h3>
        <p className="pc-p">{project.summary}</p>
        <ul className="tags" aria-label={`${project.name} stack`}>
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        {project.link ? (
          <a className="pc-link" href={project.link.href} target="_blank" rel="noopener">
            {project.link.label}
            <ArrowUpRight aria-hidden="true" />
          </a>
        ) : (
          <p className="pc-private">
            <Lock aria-hidden="true" />
            {project.privateNote}
          </p>
        )}
      </div>
      <div className="fwrap">
        <Visual project={project} eager={eager} />
        <div className="fsel" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <span className="pill" data-size={project.size}>
            {project.size}
          </span>
        </div>
      </div>
      <div className="stickies">
        {project.notes.map((note) => (
          <p key={note.text} className={`sticky sticky-${note.by}`}>
            <span className="st-who" aria-hidden="true">
              <i />
              {note.by === "me" ? "Mohammad" : "Note"}
            </span>
            {note.text}
          </p>
        ))}
      </div>
    </article>
  );
}
