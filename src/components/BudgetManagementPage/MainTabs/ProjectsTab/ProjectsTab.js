import React from 'react';
import './ProjectsTab.css';
import SummarySquares from '../../SummarySqueres/SummarySquares';
import ProjectsList from '../../ProjectsList/ProjectsList';
import { useProjects } from '../../../../services/context/ProjectsContext';

export default function ProjectsTab() {
  const { viewMode } = useProjects();
  return (
    <div className="projects-tab">
      <SummarySquares />
      <ProjectsList view={viewMode} />
    </div>
  );
}
