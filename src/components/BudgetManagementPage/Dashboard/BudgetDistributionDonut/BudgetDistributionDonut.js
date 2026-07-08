import React from 'react';
import './BudgetDistributionDonut.css';
import { useProjects } from '../../../../services/context/ProjectsContext';
import { DASH_COLORS } from '../dashUtils/dashUtils';
import { formatMoney } from '../../../../utils/formatMoney';
import DonutChart from '../DonutChart/DonutChart';

export default function BudgetDistributionDonut() {
  const { projects } = useProjects();
  const totalHrBudget = projects.reduce((sum, p) => sum + (p.totalTakzivCoachAdam || 0), 0);
  const totalProcurementBudget = projects.reduce((sum, p) => sum + (p.totalTakzivRechesh   || 0), 0);

  const segments = [
    { value: totalHrBudget, color: DASH_COLORS[0] },
    { value: totalProcurementBudget, color: DASH_COLORS[1] },
  ];

  const items = [
    { label: 'כ"א',  displayValue: `₪${formatMoney(totalHrBudget)}`, color: DASH_COLORS[0] },
    { label: 'רכש',  displayValue: `₪${formatMoney(totalProcurementBudget)}`, color: DASH_COLORS[1] },
  ];

  return (
    <div className="bdd-card">
      <div className="bdd-title">כ"א VS רכש</div>
      <DonutChart segments={segments} items={items} label='כ"א'
        extra={`סה"כ ₪${formatMoney(totalHrBudget + totalProcurementBudget)}`}
      />
    </div>
  );
}
