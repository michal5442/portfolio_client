import React from 'react';
import './TrackDistributionDonut.css';
import { useProjects } from '../../../../services/context/ProjectsContext';
import { DASH_COLORS } from '../dashUtils/dashUtils';
import DonutChart from '../DonutChart/DonutChart';

export default function MaslolTrackDistributionDonut() {
  const { projects } = useProjects();
  const kiyumCount = projects.filter(project => project.maslol === 'KIYUM').length;
  const hitazmutCount = projects.filter(project => project.maslol === 'HITAZMUT').length;
  const continuationCount = projects.filter(project => Boolean(project.logHemsheci)).length;

  const chartSegments = [
    { value: kiyumCount, color: DASH_COLORS[0] },
    { value: hitazmutCount, color: DASH_COLORS[1] },
    { value: continuationCount, color: 'none', outline: '#94a3b8' },
  ];

  const legendItems = [
    { label: 'קיום',      displayValue: String(kiyumCount), color: DASH_COLORS[0] },
    { label: 'התעצמות',  displayValue: String(hitazmutCount), color: DASH_COLORS[1] },
    { label: 'המשכי',    displayValue: String(continuationCount), color: 'none', outline: '#94a3b8' },
  ];

  return (
    <div className="tdd-card">
      <div className="tdd-title">מסלול קיום / התעצמות</div>
      <DonutChart segments={chartSegments} items={legendItems} label="קיום" />
    </div>
  );
}
