import React from 'react';
import './HRvsPlannedChart.css';
import { useProjects } from '../../../../services/context/ProjectsContext';

const COLOR_HR_BUDGET = '#1e3a5f';
const COLOR_PLANNED = '#3b82f6';

const formatCurrencyShort = n => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(0)}K` : String(n);

export default function HrVsPlannedChart() {
  const { projects } = useProjects();
  const maxProjectBudget = Math.max(...projects.map(p => p.totalTakzuvCoachAdam || 0), 1);

  return (
    <div className="hrp-card">
      <div className="hrp-header">
        <span className="hrp-title">תקציב כ"א VS תכנון כ"א לפי פרויקט</span>
        <div className="hrp-legend">
          {[['תקציב כ"א', COLOR_HR_BUDGET], ['תכנון כ"א', COLOR_PLANNED]].map(([label, color]) => (
            <span key={label} className="hrp-legend-item">
              <span className="hrp-legend-dot" style={{ background: color }} />{label}
            </span>
          ))}
        </div>
      </div>

      <div className="hrp-rows">
        {projects.map(project => {
          const hrBudget = project.totalTakzuvCoachAdam || 0;
          const planned = project.coachAdam || 0;
          const difference = hrBudget - planned;
          const differenceClass = difference > 0 ? 'hrp-surplus' : 'hrp-over';
          let differenceLabel;
          if (difference === 0) {
            differenceLabel = `₪0`;
          } else {
            differenceLabel = difference > 0
              ? `▲ ₪${formatCurrencyShort(difference)}`
              : `▼ ₪${formatCurrencyShort(Math.abs(difference))}`;
          }

          return (
            <div key={project.id} className="hrp-row">
              <div className="hrp-lbl" title={project.projectName}>{project.projectName}</div>
              <div className="hrp-bars">
                {[[hrBudget, COLOR_HR_BUDGET], [planned, COLOR_PLANNED]].map(([val, color], i) => (
                  <div key={i} className="hrp-track">
                    <div className="hrp-fill" style={{ width: `${Math.round(val / maxProjectBudget * 100)}%`, background: color }} />
                  </div>
                ))}
              </div>
              <div className="hrp-nums">
                <span className={differenceClass}>{differenceLabel}</span>
                <span className="hrp-sep">·</span>
                <span className="hrp-totals">תקציב ₪{formatCurrencyShort(hrBudget)} · תכנון ₪{formatCurrencyShort(planned)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
