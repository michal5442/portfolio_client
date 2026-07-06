import React, { useMemo, useState } from 'react';
import './HRvsPlannedChart.css';
import { useProjects } from '../../../../services/context/ProjectsContext';
import { computeRelativeGap, compareByRelativeGap } from '../dashUtils/dashUtils';

const COLOR_HR_BUDGET = '#1e3a5f';
const COLOR_PROC_BUDGET = '#2563eb';
const COLOR_PLANNED = '#93c5fd';
const INITIAL_VISIBLE_PROJECTS_COUNT = 4;

const formatCurrencyShort = n => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(0)}K` : String(n);

export default function HrVsPlannedChart() {
  const { projects } = useProjects();
  const [showMore, setShowMore] = useState(false);
  const maxProjectBudget = Math.max(...projects.map(p => Math.max(p.totalTakzuvCoachAdam || 0, p.totalTakzivRechesh || 0, p.coachAdam || 0)), 1);
  const sorted = useMemo(() => {
    return [...projects].sort(compareByRelativeGap);
  }, [projects]);
  const hiddenCount = Math.max(sorted.length - INITIAL_VISIBLE_PROJECTS_COUNT, 0);
  const visibleProjects = showMore ? sorted : sorted.slice(0, INITIAL_VISIBLE_PROJECTS_COUNT);
  const hasExpandableProjects = hiddenCount > 0;

  return (
    <div className="hrp-card">
      <div className="hrp-header">
        <span className="hrp-title">תקציב כ"א ורכש VS תכנון כ"א לפי פרויקט</span>
        <div className="hrp-legend">
          {[['תקציב כ"א', COLOR_HR_BUDGET], ['תקציב רכש', COLOR_PROC_BUDGET], ['תכנון כ"א', COLOR_PLANNED]].map(([label, color]) => (
            <span key={label} className="hrp-legend-item">
              <span className="hrp-legend-dot" style={{ background: color }} />{label}
            </span>
          ))}
        </div>
      </div>

      <div className="hrp-info">
        {sorted.length === 0 ? (
          <div className="hrp-note">אין פרויקטים להצגה.</div>
        ) : hasExpandableProjects ? (
          <div className="hrp-note">מציגים {showMore ? 'את כל הפרויקטים' : `${INITIAL_VISIBLE_PROJECTS_COUNT} פרויקטים עם הפער היחסי הגדול ביותר`}.</div>
        ) : (
          <div className="hrp-note">מציגים את כל הפרויקטים.</div>
        )}
      </div>

      <div className="hrp-rows">
        {visibleProjects.map(project => {
          const hrBudget = project.totalTakzuvCoachAdam || 0;
          const procBudget = project.totalTakzivRechesh || 0;
          const planned = project.coachAdam || 0;
          const difference = hrBudget - planned;
          const relativePercent = hrBudget > 0 ? Math.round(Math.abs(difference) / hrBudget * 100) : 0;
          const differenceClass = difference > 0 ? 'hrp-surplus' : difference < 0 ? 'hrp-over' : '';
          let differenceLabel;
          if (difference === 0) {
            differenceLabel = `₪0 (${relativePercent}%)`;
          } else {
            differenceLabel = difference > 0
              ? `▲ ₪${formatCurrencyShort(difference)} (${relativePercent}%)`
              : `▼ ₪${formatCurrencyShort(Math.abs(difference))} (${relativePercent}%)`;
          }

          return (
            <div key={project.id} className="hrp-row">
              <div className="hrp-lbl" title={project.projectName}>{project.projectName}</div>
              <div className="hrp-bars">
                {[[hrBudget, COLOR_HR_BUDGET], [procBudget, COLOR_PROC_BUDGET], [planned, COLOR_PLANNED]].map(([val, color], i) => (
                  <div key={i} className="hrp-track">
                    <div className="hrp-fill" style={{ width: `${Math.round(val / maxProjectBudget * 100)}%`, background: color }} />
                  </div>
                ))}
                <div className="hrp-nums" dir="ltr">
                  <span className={`hrp-item hrp-gap ${differenceClass}`}>
                    <span className="hrp-item-value">{differenceLabel}</span>
                  </span>
                  <span className="hrp-sep" aria-hidden="true">·</span>
                  <span className="hrp-item hrp-plan">
                    <span className="hrp-item-value">₪{formatCurrencyShort(planned)}</span>
                    <span className="hrp-item-label">תכנון</span>
                  </span>
                  <span className="hrp-sep" aria-hidden="true">·</span>
                  <span className="hrp-item hrp-proc">
                    <span className="hrp-item-value">₪{formatCurrencyShort(procBudget)}</span>
                    <span className="hrp-item-label">רכש</span>
                  </span>
                  <span className="hrp-sep" aria-hidden="true">·</span>
                  <span className="hrp-item hrp-budget">
                    <span className="hrp-item-value">₪{formatCurrencyShort(hrBudget)}</span>
                    <span className="hrp-item-label">תקציב</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hasExpandableProjects && (
        <div className="hrp-footer">
          <div className="hrp-footer-note">
            {showMore
              ? `לחץ שוב כדי להסתיר פרויקטים נוספים.`
              : `עוד ${hiddenCount} פרויקטים זמינים בהרחבה.`}
          </div>
          <button
            type="button"
            className="hrp-expand-button"
            onClick={() => setShowMore((prev) => !prev)}
            aria-label={showMore ? 'הצג פחות פרויקטים' : 'הצג פרויקטים נוספים'}
          >
            <span className="hrp-expand-icon" style={{ transform: showMore ? 'rotate(225deg)' : 'rotate(45deg)' }}>
              ⇔
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
