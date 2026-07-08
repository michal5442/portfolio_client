import React, { useMemo } from 'react';
import './HRvsPlannedChart.css';
import { useProjects } from '../../../../services/context/ProjectsContext';
import { compareByRelativeGap } from '../../../../utils/calculateProjectFinance';
import { useExpandableProjectList } from '../dashUtils/useExpandableProjectList';
import { formatMoney } from '../../../../utils/formatMoney';
import { formatGapDisplay } from '../../../../utils/calculateProjectFinance';
import { BUDGET_COLORS, INITIAL_VISIBLE_PROJECTS_COUNT } from '../../../../constants/chartConstants';

const HRP_LEGEND_ITEMS = [
  { label: 'כ"א', color: BUDGET_COLORS.HR },
  { label: 'רכש', color: BUDGET_COLORS.PROC },
  { label: 'תכנון', color: BUDGET_COLORS.PLANNED },
];

export default function HrVsPlannedChart() {
  const { projects } = useProjects();
  const {
    sorted,
    showMore,
    toggleShowMore,
    visibleProjects,
    hiddenCount,
    hasExpandableProjects,
  } = useExpandableProjectList(projects, compareByRelativeGap, INITIAL_VISIBLE_PROJECTS_COUNT);
  const maxProjectBudget = useMemo(
    () => Math.max(...projects.map((p) => Math.max(p.totalTakzivCoachAdam || 0, p.totalTakzivRechesh || 0, p.coachAdam || 0)), 1),
    [projects],
  );

  return (
    <div className="hrp-card">
      <div className="hrp-header">
        <span className="hrp-title">תקציב כ"א ורכש VS תכנון כ"א לפי פרויקט</span>
        <div className="hrp-legend">
          {HRP_LEGEND_ITEMS.map(({ label, color }) => (
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
          const hrBudget = project.totalTakzivCoachAdam || 0;
          const procBudget = project.totalTakzivRechesh || 0;
          const planned = project.coachAdam || 0;
          const difference = hrBudget - planned;
          const differenceClass = difference > 0 ? 'hrp-surplus' : difference < 0 ? 'hrp-over' : '';
          const differenceLabel = formatGapDisplay(difference, hrBudget);

          return (
            <div key={project.id} className="hrp-row">
              <div className="hrp-lbl" title={project.projectName}>{project.projectName}</div>
              <div className="hrp-bars">
                {[[hrBudget, BUDGET_COLORS.HR], [procBudget, BUDGET_COLORS.PROC], [planned, BUDGET_COLORS.PLANNED]].map(([val, color]) => (
                  <div key={`bar-${color}`} className="hrp-track">
                    <div className="hrp-fill" style={{ width: `${Math.round(val / maxProjectBudget * 100)}%`, background: color }} />
                  </div>
                ))}
                <div className="hrp-nums" dir="ltr">
                  <span className={`hrp-item hrp-gap ${differenceClass}`}>
                    <span className="hrp-item-value">{differenceLabel}</span>
                  </span>
                  <span className="hrp-sep" aria-hidden="true">·</span>
                  <span className="hrp-item hrp-hr">
                    <span className="hrp-item-value">₪{formatMoney(hrBudget)}</span>
                    <span className="hrp-item-label">כ"א</span>
                  </span>
                  <span className="hrp-sep" aria-hidden="true">·</span>
                  <span className="hrp-item hrp-proc">
                    <span className="hrp-item-value">₪{formatMoney(procBudget)}</span>
                    <span className="hrp-item-label">רכש</span>
                  </span>
                  <span className="hrp-sep" aria-hidden="true">·</span>
                  <span className="hrp-item hrp-plan">
                    <span className="hrp-item-value">₪{formatMoney(planned)}</span>
                    <span className="hrp-item-label">תכנון</span>
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
            onClick={toggleShowMore}
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
