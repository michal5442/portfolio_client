import React from "react";
import "./Project.css";

function formatMoney(value) {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function Project({ project }) {

  if (!project) {
    return null;
  }

  const totalTaktziv =
    (project.totalTakzuvCoachAdam || 0) + (project.totalTakzivRechesh || 0);
  const gap = project.budgetHR - (project.plannedHR || 0);
  const gapRel = Math.abs(gap) / (project.plannedHR || 1);
  const GAP_THRESHOLD = 0.1;
  let gapStateClass;
  if (gap === 0) {
    gapStateClass = 'pc-gap--ok';
  } else if (gapRel >= GAP_THRESHOLD) {
    gapStateClass = gap > 0 ? 'pc-gap--exceed-pos' : 'pc-gap--exceed-neg';
  } else {
    gapStateClass = 'pc-gap--ok';
  }

  return (
    <article className="project-card" dir="rtl" aria-label={project.name}>
      <header className="pc-header">
        <div className="pc-badges">
          {project.shortTag && (
            <span className="pc-pill">{project.shortTag}</span>
          )}
          {project.unit && (
            <span className="pc-subpill">{project.unit}</span>
          )}
        </div>
        <h3 className="pc-title">{project.name}</h3>
      </header>

      {project.desc && <p className="pc-desc">{project.desc}</p>}

      <section className="pc-grid">
        <div className="pc-item">
          <div className="pc-item-label">תקציב רכש</div>
          <div className="pc-item-value">{formatMoney(project.budgetProc)}</div>
        </div>
        <div className="pc-item">
          <div className="pc-item-label">תקציב כ"א</div>
          <div className="pc-item-value">{formatMoney(project.budgetHR)}</div>
        </div>
        <div className="pc-item">
          <div className="pc-item-label">תכנון כ"א</div>
          <div className="pc-item-value">{formatMoney(project.plannedHR)}</div>
        </div>
        <div className="pc-item">
          <div className="pc-item-label">פערים</div>
          <div className={`pc-item-value pc-gap ${gapStateClass}`}>
            {formatMoney(Math.abs(gap))}
              {gap > 0 ? <span className="pc-arrow">▲</span> : (gap < 0 ? <span className="pc-arrow">▼</span> : null)}
          </div>
        </div>
      </section>

      <footer className="pc-footer">
        <div className="pc-pager">
          <span className="dot" />
          <span className="dot" />
        </div>
        <div className="pc-total">סה"כ {formatMoney(totalTaktziv)}</div>
      </footer>
    </article>
  );
}
