import React from "react";
import { useProjects } from "../../../../services/context/ProjectsContext";
import ProjectCard from "./ProjectCard/ProjectCard";
import ProjectRow from "./ProjectRow/ProjectRow";

export default function Project({ project }) {
  const { selectedProjectId, viewMode, projectFinanceMap } = useProjects();
  


  const financeData = projectFinanceMap[project.id];
  
  const isSelected = selectedProjectId === project.id;

  if (viewMode === "list") {
    return <ProjectRow project={project} financeData={financeData} isSelected={isSelected} />;
  }
  
  return <ProjectCard project={project} financeData={financeData} isSelected={isSelected} />;
}