import React from "react";
import "./ProjectsToolbar.css";
import NewProjectButton from "../TopBar/NewProjectButton/NewProjectButton";
import ViewToggle from "../TopBar/ViewToggle/ViewToggle";
import { useProjects } from "../../../services/context/ProjectsContext";

export default function ProjectsToolbar() {
  const { viewMode, setViewMode } = useProjects();

  return (
    <div className="projects-toolbar" dir="rtl">
      <ViewToggle view={viewMode} onChange={setViewMode} />
      <NewProjectButton />
    </div>
  );
}