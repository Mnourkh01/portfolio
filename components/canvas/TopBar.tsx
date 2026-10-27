import {
  Frame,
  Hand,
  Linkedin,
  Mail,
  MessageCircle,
  MousePointer2,
  PenTool,
  Type,
  Download,
} from "lucide-react";
import LogoMark from "@/components/LogoMark";
import { CV_URL, FILE, LINKEDIN_URL, MAILTO, PERSON } from "@/lib/site";

const TOOLS = [
  { id: "move", Icon: MousePointer2 },
  { id: "frame", Icon: Frame },
  { id: "pen", Icon: PenTool },
  { id: "text", Icon: Type },
  { id: "hand", Icon: Hand },
  { id: "comment", Icon: MessageCircle },
];

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="tb-left">
        <a className="tb-logo" href="#home" aria-label={`${PERSON.name}, back to the top`}>
          <LogoMark height={20} />
        </a>
        <div className="tb-tools" aria-hidden="true">
          {TOOLS.map(({ id, Icon }) => (
            <span key={id} className={id === "move" ? "tool is-on" : "tool"}>
              <Icon />
            </span>
          ))}
        </div>
      </div>
      <p className="tb-file">
        <span className="tb-owner">{FILE.owner}</span>
        <span className="tb-sep" aria-hidden="true">
          /
        </span>
        <span className="tb-name">{FILE.name}</span>
      </p>
      <div className="tb-right">
        <div className="tb-avatars" aria-hidden="true">
          <span className="av av-me">M</span>
          <span className="av av-you">Y</span>
        </div>
        <span className="tb-zoom" aria-hidden="true" data-zoom>
          100%
        </span>
        <a
          className="btn btn-secondary btn-sm tb-secondary"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener"
        >
          <Linkedin aria-hidden="true" />
          LinkedIn
        </a>
        {CV_URL ? (
          <a className="btn btn-secondary btn-sm tb-secondary" href={CV_URL} download>
            <Download aria-hidden="true" />
            Download CV
          </a>
        ) : null}
        <a className="btn btn-primary btn-sm" href={MAILTO}>
          <Mail aria-hidden="true" />
          Email me
        </a>
      </div>
    </header>
  );
}
