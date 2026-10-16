import { Frame, GraduationCap, History } from "lucide-react";
import { education, roles } from "@/lib/experience";

export default function Experience() {
  return (
    <section className="sec history" id="experience" aria-labelledby="exp-title" data-key="experience">
      <p className="flabel" aria-hidden="true">
        <Frame />
        Experience / Version history
      </p>
      <div className="frame sec-frame hframe">
        <div className="h-head">
          <h2 id="exp-title">Where I have worked</h2>
          <p>Product, backend and QA automation roles, in Jordan and remote for teams in Canada.</p>
        </div>
        <div className="vh-panel">
          <p className="vh-title" aria-hidden="true">
            <History />
            Version history
          </p>
          <ol className="vh">
            {roles.map((role) => (
              <li key={role.id} className={role.current ? "vh-item is-now" : "vh-item"}>
                <span className="vh-dot" aria-hidden="true" />
                <div className="vh-body">
                  <h3>
                    {role.company}
                    {role.current ? <span className="vh-cur">Current version</span> : null}
                  </h3>
                  <p className="vh-role">
                    {role.title}
                    {role.place ? <span className="vh-place">{role.place}</span> : null}
                  </p>
                  {role.period ? <p className="vh-period">{role.period}</p> : null}
                  <p className="vh-sum">{role.summary}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="vh-edu">
            <GraduationCap aria-hidden="true" />
            <div>
              <h3>Education</h3>
              {education.period ? <p className="vh-period">{education.period}</p> : null}
              <p>
                {education.school}, {education.award}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
