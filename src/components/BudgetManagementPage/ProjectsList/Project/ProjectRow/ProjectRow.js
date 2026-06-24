// src/components/ProjectsList/Project/ProjectRow.js
import React from "react";
import { useProjects } from "../../../../../services/context/ProjectsContext";
import { StatusPill } from "../ProjectElements/ProjectElements";
import ProjectFinanceLayout from "../ProjectFinanceLayout/ProjectFinanceLayout";
import "../Project.css";
import "./ProjectRow.css";

export default function ProjectRow({ project, financeData, isSelected }) {
  const { setSelectedProjectId } = useProjects();

  return (
    <div className={`list-item ${isSelected ? "sel" : ""}`} onClick={() => setSelectedProjectId(isSelected ? null : project.id)}>
      <div className="li-content">
        <div className="li-name" title={project.projectName}>{project.projectName}</div>

        <div className="li-badges">
          <span className="badge b-sector">אגף {project.agaff}</span>
          <span className="badge b-unit">{project.yechidaMevatzat}</span>
          <span className={`badge ${project.logHemsheci ? "b-yes" : "b-no"}`}>
            {project.logHemsheci ? "המשיכי: כן" : "חדש"}
          </span>
        </div>

        <ProjectFinanceLayout financeData={financeData} mode="row" />
      </div>

      <div className="li-side">
        <StatusPill maslol={project.maslol} />
      </div>
    </div>
  );
}