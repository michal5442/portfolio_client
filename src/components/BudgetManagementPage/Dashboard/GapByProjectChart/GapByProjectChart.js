import React, { useState } from 'react';
import './GapByProjectChart.css';
import { useProjects } from '../../../../services/context/ProjectsContext';
import Modal from '../../Modal/Modal';
import ProjectDetail from '../../ProjectDetail/ProjectDetail';
import { formatCompactNumber, computeBudgetMinusPlanned } from '../dashUtils/dashUtils';

export default function GapByProjectChart() {
  const { projects } = useProjects();
  const [showMore, setShowMore] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const openProjectDetail = (id) => setSelectedProjectId(id);
  const closeProjectDetail = () => setSelectedProjectId(null);

  const sorted = [...projects].sort((a, b) => computeBudgetMinusPlanned(b) - computeBudgetMinusPlanned(a));
  const maxAbs = Math.max(...sorted.map((p) => Math.abs(computeBudgetMinusPlanned(p))), 1);
  const W = 44;
  const THRESHOLD = 0.4; // חריגה = 40% ומעלה
  const INITIAL_VISIBLE_COUNT = 5;

  const highGapProjects = sorted.filter((p) => {
    const g = computeBudgetMinusPlanned(p);
    const relativeBase = Math.max(p.coachAdam || 0, p.totalTakzuvCoachAdam || 0, 1);
    const rel = Math.abs(g) / relativeBase;
    return g !== 0 && rel >= THRESHOLD;
  });
  const hiddenCount = Math.max(highGapProjects.length - INITIAL_VISIBLE_COUNT, 0);
  const visibleProjects = showMore ? highGapProjects : highGapProjects.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <div className="gap-card">
      <div className="gap-header">
        <span className="gap-title">פערים לפי פרויקט (תקציב כ"א − תכנון)</span>
        <div className="gap-subtitle" style={{ textAlign: 'right', fontSize: 12 }}>
          <div>חריגה במינוס = אדום</div>
          <div>חריגה בפלוס = כתום</div>
          <div>ללא חריגה = כחול</div>
        </div>
      </div>

      <div className="gap-info flex flex-col gap-2 mb-3">
        {highGapProjects.length === 0 ? (
          <div className="text-right text-sm text-slate-600">אין כרגע פרויקטים עם פער של יותר מ‑40%.</div>
        ) : (
          <div className="text-right text-sm text-slate-600">לחץ על פרויקט כדי לראות פרטים נוספים.</div>
        )}
      </div>

      <div className="gap-rows">
        {visibleProjects.map((p) => {
          const g = computeBudgetMinusPlanned(p);
          const pct = Math.round(Math.abs(g) / maxAbs * W);
          const isPos = g >= 0;
          const rel = Math.abs(g) / (p.totalTakzuvCoachAdam || 1);
          const isExceed = g !== 0 && rel >= THRESHOLD;
          let barColor = '#3b82f6'; // default blue
          if (isExceed) barColor = isPos ? '#f97316' : '#dc2626';

          let valueLabel;
          if (g === 0) {
            valueLabel = `₪0`;
          } else if (isExceed) {
            valueLabel = `חריגה ${isPos ? '▲' : '▼'} ₪${formatCompactNumber(Math.abs(g))}`;
          } else {
            valueLabel = `${isPos ? '+' : '−'}₪${formatCompactNumber(Math.abs(g))}`;
          }

          const MAX_BAR_PCT = 42;
          const effPct = Math.min(pct, MAX_BAR_PCT);
          const offset = 1.1;

          return (
            <div
              key={p.id}
              className="gap-row"
              role="button"
              tabIndex={0}
              onClick={() => openProjectDetail(p.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProjectDetail(p.id);
                }
              }}
              aria-label={`פתח פרטי פרויקט ${p.projectName}`}
            >
              <div className="gap-lbl" title={p.projectName}>{p.projectName}</div>
              <div className="gap-axis">
                <div className="gap-zero" />
                <div
                  className="gap-bar"
                  style={{
                    [isPos ? 'left' : 'right']: '50%',
                    width: `${effPct}%`,
                    background: barColor,
                  }}
                />
                <span
                  className="gap-val"
                  style={{
                    [isPos ? 'left' : 'right']: `calc(50% + ${effPct}% + ${offset}rem)`,
                  }}
                >
                  {valueLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProject && (
        <Modal onClose={closeProjectDetail}>
          <ProjectDetail project={selectedProject} onClose={closeProjectDetail} />
        </Modal>
      )}

      {hiddenCount > 0 && (
        <div className="gap-footer mt-4 flex items-center justify-between gap-3">
          <div className="text-right text-sm text-slate-600">עוד {hiddenCount} פרויקטים עם פער של יותר מ‑40% זמינים בהרחבה.</div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white p-2 text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            onClick={() => setShowMore((prev) => !prev)}
            aria-label={showMore ? 'הצג פחות פרויקטים' : 'הצג פרויקטים נוספים'}
          >
            <span
              className="transition-transform duration-200"
              style={{ transform: showMore ? 'rotate(225deg)' : 'rotate(45deg)' }}
            >
              ⇔
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
