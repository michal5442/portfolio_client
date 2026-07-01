// src/components/ProjectsList/Project/ProjectRow.js
import React from "react";
import { useProjects } from "../../../../../services/context/ProjectsContext";
import { StatusPill, BudgetGap } from "../ProjectElements/ProjectElements";
import { formatMoney } from "../../../../../utils/formatMoney";
import "../Project.css";
import "./ProjectRow.css";

export default function ProjectRow({ project, financeData, isSelected }) {
  const { setSelectedProjectId } = useProjects();

  const { totalTakzivCoachAdam, totalTakzivRechesh } = financeData;

  return (
    <tr
      className={`tr-item ${isSelected ? "sel" : ""}`}
      onClick={() => setSelectedProjectId(isSelected ? null : project.id)}
    >
      <td className="tr-name-cell">
        <div className="tr-name" title={project.projectName}>{project.projectName}</div>
      </td>
      <td className="tr-sector">אגף {project.agaff}</td>
      <td className="tr-unit">{project.yechidaMevatzat}</td>
      <td className="tr-continuation">
        <span className={`badge ${project.logHemsheci ? "b-yes" : "b-no"}`}>
          {project.logHemsheci ? "המשיכי: כן" : "חדש"}
        </span>
      </td>
      <td className="tr-status">
        <StatusPill maslol={project.maslol} />
      </td>
      <td className="tr-num">{formatMoney(totalTakzivCoachAdam)}</td>
      <td className="tr-num">{formatMoney(totalTakzivRechesh)}</td>
      <td className="tr-num">
        <BudgetGap financeData={financeData} />
      </td>
    </tr>
  );
}