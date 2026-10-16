import { ArrowUpRight, Download, Frame, Github, Linkedin, Mail } from "lucide-react";
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, MAILTO, PERSON } from "@/lib/site";

export default function Contact() {
  return (
    <section className="sec contact" id="contact" aria-labelledby="contact-title" data-key="contact">
      <p className="flabel" aria-hidden="true">
        <Frame />
        Contact / Ship it
      </p>
      <div className="frame sec-frame cframe">
        <div className="c-main">
          <h2 id="contact-title">Have a product to build? Send me a message.</h2>
          <p>
            I am based in {PERSON.location} and open to backend, full-stack, product and AI engineering
            roles.
          </p>
          <div className="c-ctas">
            <a className="btn btn-primary btn-lg" href={MAILTO}>
              <Mail aria-hidden="true" />
              Email me
            </a>
            <a className="btn btn-secondary btn-lg" href={LINKEDIN_URL} target="_blank" rel="noopener">
              <Linkedin aria-hidden="true" />
              LinkedIn
            </a>
            {CV_URL ? (
              <a className="btn btn-secondary btn-lg" href={CV_URL} download>
                <Download aria-hidden="true" />
                Download CV
              </a>
            ) : null}
          </div>
        </div>
        <dl className="c-props">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={MAILTO}>{EMAIL}</a>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a href={GITHUB_URL} target="_blank" rel="noopener">
                <Github aria-hidden="true" />
                Mnourkh01
                <ArrowUpRight aria-hidden="true" />
              </a>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener">
                <Linkedin aria-hidden="true" />
                {PERSON.name}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{PERSON.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
