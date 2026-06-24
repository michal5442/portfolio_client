import React from 'react';
import './GapByProjectChart.css';
import { useProjects } from '../../../../services/context/ProjectsContext';
import { formatCompactNumber, computeBudgetMinusPlanned } from '../dashUtils/dashUtils';

export default function GapByProjectChart() {
  const { projects } = useProjects();
  const sorted = [...projects].sort((a, b) => computeBudgetMinusPlanned(b) - computeBudgetMinusPlanned(a));
  const maxAbs = Math.max(...sorted.map(p => Math.abs(computeBudgetMinusPlanned(p))), 1);
  const W = 44;
  const THRESHOLD = 0.1; // חריגה = 10% ומעלה

  return (
    <div className="gap-card">
      <div className="gap-header">
        <span className="gap-title">פערים לפי פרויקט (תקציב כ"א − תכנון)</span>
        <div className="gap-subtitle" style={{ textAlign: 'right', fontSize: 12 }}>
          <div>חריגה = 10% ומעלה</div>
          <div>חריגה במינוס = אדום</div>
          <div>חריגה בפלוס = כתום</div>
          <div>ללא חריגה = כחול</div>
        </div>
      </div>
      <div className="gap-rows">
        {sorted.map(p => {
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

          // Responsive percent-based clamp: never allow bar percent to exceed MAX_BAR_PCT
          const MAX_BAR_PCT = 42; // max percent of axis the bar can occupy (keeps space for label)
          const INSIDE_LABEL_PCT = 12; // if bar >= this percent, we can render label visually 'inside'
          const effPct = Math.min(pct, MAX_BAR_PCT);
          const labelInside = effPct >= INSIDE_LABEL_PCT;
          const offsetPct = labelInside ? Math.max(effPct - 6, 2) : Math.min(effPct + 1, MAX_BAR_PCT - 2);
          const posKey = isPos ? 'left' : 'right';
          const labelColor = labelInside ? '#ffffff' : barColor;

          return (
            <div key={p.id} className="gap-row">
              <div className="gap-axis">
                <div className="gap-zero" />
                <div className="gap-bar" style={{
                  [isPos ? 'left' : 'right']: '50%',
                  width: `${effPct}%`,
                  background: barColor
                }} />
                <span className="gap-val" style={{
                  [posKey]: `calc(50% + ${offsetPct}%)`,
                  color: labelColor,
                  whiteSpace: 'nowrap'
                }}>{valueLabel}</span>
              </div>
              <div className="gap-lbl" title={p.projectName}>{p.projectName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
