import React from "react";
import { useProjects } from "../../../services/context/ProjectsContext";
import { StatusPill, BudgetGap } from "../ProjectsList/Project/ProjectElements/ProjectElements";
import { formatMoney } from "../../../utils/formatMoney";
import GenericTable from "../../Common/GenericTable";
import "../ProjectsList/Project/Project.css";
import "./Table.css";

/**
 * Projects table columns: title + how to render the cell.
 * Add/remove a column here and every table using this component updates.
 */
const COLUMNS = [
  {
    key: "name",
    label: "שם הפרויקט",
    headerClassName: "pt-th-name",
    cellClassName: "tr-name-cell",
    render: (project, financeData) => (
      <div className="tr-name" title={project.projectName}>{project.projectName}</div>
    ),
  },
  {
    key: "sector",
    label: "אגף",
    cellClassName: "tr-sector",
    render: (project) => project.agaff,
  },
  {
    key: "unit",
    label: "יחידה מבצעת",
    cellClassName: "tr-unit",
    render: (project) => project.yechidaMevatzat,
  },
  {
    key: "continuation",
    label: "המשכיות",
    cellClassName: "tr-continuation",
    render: (project) => (
      <span className={`badge ${project.logHemsheci ? "b-yes" : "b-no"}`}>
        {project.logHemsheci ? "המשיכי: כן" : "חדש"}
      </span>
    ),
  },
  {
    key: "status",
    label: "מסלול",
    headerClassName: "pt-th-status",
    cellClassName: "tr-status",
    render: (project) => <StatusPill maslol={project.maslol} />,
  },
  {
    key: "hrBudget",
    label: 'תקציב כ"א',
    cellClassName: "tr-num",
    render: (project, financeData) => formatMoney(financeData?.totalTakzivCoachAdam || 0),
  },
  {
    key: "procBudget",
    label: "תקציב רכש",
    cellClassName: "tr-num",
    render: (project, financeData) => formatMoney(financeData?.totalTakzivRechesh || 0),
  },
  {
    key: "gaps",
    label: "פערים",
    cellClassName: "tr-num",
    render: (project, financeData) => <BudgetGap financeData={financeData || {}} />,
  },
];

/**
 * Projects table wrapper.
 * Uses GenericTable with project-specific logic: selection, context integration.
 * Pass it any list of projects (full list, filtered list, a modal segment, etc.)
 */
export default function Table({ projects }) {
  const { selectedProjectId, setSelectedProjectId, projectFinanceMap } = useProjects();

  // Convert projects to format expected by GenericTable, enriching with finance data
  const rowsWithFinance = projects.map((project) => ({
    ...project,
    __financeData: projectFinanceMap[project.id],
  }));

  // Column renderers that have access to finance data via __financeData
  const columnsWithFinance = COLUMNS.map((col) => ({
    ...col,
    render: (row) => col.render(row, row.__financeData),
  }));

  const handleRowClick = (row) => {
    const isSelected = selectedProjectId === row.id;
    setSelectedProjectId(isSelected ? null : row.id);
  };

  const getRowClassName = (row) => {
    const isSelected = selectedProjectId === row.id;
    return `tr-item ${isSelected ? "sel" : ""}`;
  };

  return (
    <GenericTable
      columns={columnsWithFinance}
      data={rowsWithFinance}
      tableClassName="p-table"
      wrapperClassName="p-table-wrap"
      rowClassName={getRowClassName}
      onRowClick={handleRowClick}
    />
  );
}