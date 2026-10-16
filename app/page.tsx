import TopBar from "@/components/canvas/TopBar";
import LayersNav from "@/components/canvas/LayersNav";
import Board from "@/components/canvas/Board";
import MoreWork from "@/components/canvas/MoreWork";
import Process from "@/components/canvas/Process";
import Experience from "@/components/canvas/Experience";
import Libraries from "@/components/canvas/Libraries";
import Contact from "@/components/canvas/Contact";
import { BottomBar, Overlays, SiteFooter } from "@/components/canvas/Chrome";
import CanvasMotion from "@/components/canvas/CanvasMotion";
import LogoMorph from "@/components/canvas/LogoMorph";
import LayerSync from "@/components/canvas/LayerSync";

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <TopBar />
      <LayersNav />
      <main id="main" tabIndex={-1}>
        <Board />
        <div className="after">
          <MoreWork />
          <Process />
          <Experience />
          <Libraries />
          <Contact />
        </div>
      </main>
      <SiteFooter />
      <BottomBar />
      <Overlays />
      <LayerSync />
      <LogoMorph />
      <CanvasMotion />
    </>
  );
}
