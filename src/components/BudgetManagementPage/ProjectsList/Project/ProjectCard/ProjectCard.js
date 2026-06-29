// src/components/ProjectsList/Project/ProjectCard.js
import React from "react";
import { useProjects } from "../../../../../services/context/ProjectsContext";
import { StatusPill } from "../ProjectElements/ProjectElements";
import ProjectFinanceLayout from "../ProjectFinanceLayout/ProjectFinanceLayout";
import "../Project.css";
import "./ProjectCard.css";
import { useState } from "react";
import ProjectFormModal from "../../../ProjectFormModal/ProjectFormModal";

export default function ProjectCard({ project, financeData, isSelected }) {
  const { setSelectedProjectId } = useProjects();
  const isKiyum = project.maslol === "KIYUM";
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className={`card ${isSelected ? "sel" : ""}`} onClick={() => setSelectedProjectId(isSelected ? null : project.id)}>
      <div className={`card-accent ${isKiyum ? "card-accent--kiyum" : "card-accent--hit"}`} />
      <div className="card-body">
        <div className="card-title-row">
          <div className="card-name">{project.projectName}</div>
          <div className="card-actions">
            <StatusPill maslol={project.maslol} />
          </div>
        </div>
        <div className="card-meta">
          <span className="badge b-sector">אגף {project.agaff}</span>
          <span className="card-unit">{project.yechidaMevatzat}</span>
          <span className={`badge ${project.logHemsheci ? "b-yes" : "b-no"}`}>
            {project.logHemsheci ? "המשיכי: כן" : "חדש"}
          </span>
        </div>
        
        {project.teur && <div className="card-desc">{project.teur}</div>}

        <ProjectFinanceLayout
          financeData={financeData}
          mode="card"
          onEdit={(e) => { e.stopPropagation(); setOpenEdit(true); }}
        />
      </div>
      <ProjectFormModal open={openEdit} onClose={() => setOpenEdit(false)} initialData={project} mode="edit" />
    </div>
  );
}