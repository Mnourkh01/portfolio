import LogoMark from "@/components/LogoMark";

export default function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="nav__mark" aria-label="Mohammad Nour, home">
        <LogoMark height={24} />
      </a>
      <div className="nav__links">
        <a className="nav__link" href="#about">
          About
        </a>
        <a className="nav__link" href="#work">
          Work
        </a>
        <a className="nav__link" href="#stack">
          Stack
        </a>
        <a className="nav__link" href="#contact">
          Contact
        </a>
      </div>
    </nav>
  );
}
