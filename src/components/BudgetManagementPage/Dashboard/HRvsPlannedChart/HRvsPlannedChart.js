import React from 'react';
import './HRvsPlannedChart.css';
import { useProjects } from '../../../../services/context/ProjectsContext';

const COLOR_HR_BUDGET = '#1e3a5f';
const COLOR_PLANNED = '#3b82f6';

const formatCurrencyShort = n => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(0)}K` : String(n);

export default function HrVsPlannedChart() {
  const { projects } = useProjects();
  const developmentUnits = [...new Set(projects.map(p => p.yechidaMevatzat))].filter(Boolean).sort();
  const maxUnitTotal = Math.max(...developmentUnits.map(unit =>
    projects.filter(p => p.yechidaMevatzat === unit).reduce((sum, p) => sum + (p.totalTakzuvCoachAdam || 0), 0)
  ), 1);

  return (
    <div className="hrp-card">
      <div className="hrp-header">
        <span className="hrp-title">תקציב כ"א VS תכנון כ"א לפי יחידת פיתוח</span>
        <div className="hrp-legend">
          {[['תקציב כ"א', COLOR_HR_BUDGET], ['תכנון כ"א', COLOR_PLANNED]].map(([label, color]) => (
            <span key={label} className="hrp-legend-item">
              <span className="hrp-legend-dot" style={{ background: color }} />{label}
            </span>
          ))}
        </div>
      </div>

      <div className="hrp-rows">
        {developmentUnits.map(unit => {
          const unitProjects = projects.filter(p => p.yechidaMevatzat === unit);
          const hrBudgetTotal = unitProjects.reduce((sum, p) => sum + (p.totalTakzuvCoachAdam || 0), 0);
          const plannedTotal = unitProjects.reduce((sum, p) => sum + (p.coachAdam || 0), 0);
          const difference = hrBudgetTotal - plannedTotal;
          const differenceClass = difference > 0 ? 'hrp-surplus' : 'hrp-over';
          let differenceLabel;
          if (difference === 0) {
            differenceLabel = `₪0`;
          } else {
            differenceLabel = difference > 0
              ? `▲ ₪${formatCurrencyShort(difference)} חריגה`
              : `▼ ₪${formatCurrencyShort(Math.abs(difference))} חריגה`;
          }

          return (
            <div key={unit} className="hrp-row">
              <div className="hrp-lbl" title={unit}>{unit}</div>
              <div className="hrp-main">
                <div className="hrp-bars">
                  {[[hrBudgetTotal, COLOR_HR_BUDGET], [plannedTotal, COLOR_PLANNED]].map(([val, color], i) => (
                    <div key={i} className="hrp-track">
                      <div className="hrp-fill" style={{ width: `${Math.round(val / maxUnitTotal * 100)}%`, background: color }} />
                    </div>
                  ))}
                </div>
                <div className="hrp-nums">
                  <span className={differenceClass}>{differenceLabel}</span>
                  <span className="hrp-sep">·</span>
                  <span className="hrp-totals">תקציב ₪{formatCurrencyShort(hrBudgetTotal)} · תכנון ₪{formatCurrencyShort(plannedTotal)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
