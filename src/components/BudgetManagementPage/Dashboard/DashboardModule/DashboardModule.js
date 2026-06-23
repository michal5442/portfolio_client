import React from 'react';
import './DashboardModule.css';
import { useProjects } from '../../../../services/context/ProjectsContext';
import BudgetBySectorChart from '../BudgetBySectorChart/BudgetBySectorChart';
import GapByProjectChart from '../GapByProjectChart/GapByProjectChart';
import HRvsPlannedChart from '../HRvsPlannedChart/HRvsPlannedChart';
import BudgetDistributionDonut from '../BudgetDistributionDonut/BudgetDistributionDonut';
import MaslolTrackDistributionDonut from '../TrackDistributionDonut/TrackDistributionDonut';
import ContinuationVsNewBudgetDonut from '../ContinuationDistributionDonut/ContinuationDistributionDonut';

export default function DashboardModule() {
  const { projects, isLoading } = useProjects();

  if (isLoading) return <div className="dashboard-empty">טוען נתונים...</div>;
  if (!projects.length) return <div className="dashboard-empty">אין נתונים לשנה זו</div>;

  return (
    <div className="dashboard" dir="rtl">
      <BudgetBySectorChart />
      <GapByProjectChart />
      <HRvsPlannedChart />
      <div className="dashboard-row-2">
        <BudgetDistributionDonut />
        <MaslolTrackDistributionDonut />
        <div className="dashboard-row-2-full">
          <ContinuationVsNewBudgetDonut />
        </div>
      </div>
    </div>
  );
}
