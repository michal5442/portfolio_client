import React from 'react';
import './ContinuationDistributionDonut.css';
import { useProjects } from '../../../../services/context/ProjectsContext';
import { DASH_COLORS, formatCompactNumber, computeProjectTotalBudget } from '../dashUtils/dashUtils';
import DonutChart from '../DonutChart/DonutChart';

export default function ContinuationVsNewBudgetDonut() {
  const { projects } = useProjects();
  const continuationBudgetTotal = projects
    .filter(project => Boolean(project.logHemsheci))
    .reduce((sum, project) => sum + computeProjectTotalBudget(project), 0);

  const newProjectsBudgetTotal = projects
    .filter(project => !Boolean(project.logHemsheci))
    .reduce((sum, project) => sum + computeProjectTotalBudget(project), 0);

  const chartSegments = [
    { value: continuationBudgetTotal, color: DASH_COLORS[0] },
    { value: newProjectsBudgetTotal,  color: DASH_COLORS[1] },
  ];

  const legendItems = [
    { label: 'המשכי', displayValue: `₪${formatCompactNumber(continuationBudgetTotal)}`, color: DASH_COLORS[0] },
    { label: 'חדש',   displayValue: `₪${formatCompactNumber(newProjectsBudgetTotal)}`,  color: DASH_COLORS[1] },
  ];

  return (
    <div className="cdd-card">
      <div className="cdd-title">תקציב פרויקטים המשכיים VS חדשים</div>
      <DonutChart segments={chartSegments} items={legendItems} label="המשכי" />
    </div>
  );
}
