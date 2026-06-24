// src/components/ProjectsList/ProjectsList.js
import React from "react";
import { useProjects } from "../../../services/context/ProjectsContext";
import Project from "./Project/Project";
import ProjectDetail from "../ProjectDetail/ProjectDetail";
import Modal from "../Modal/Modal";
import "./ProjectsList.css";

export default function ProjectsList() {
  const { filteredProjects, isLoading, viewMode, selectedProject, setSelectedProjectId } = useProjects();

  if (isLoading) {
    return <section className="p-list p-list--load" dir="rtl"><p>טוען פרויקטים...</p></section>;
  }

  if (!filteredProjects?.length) {
    return <section className="p-list p-list--empty" dir="rtl"><p>לא נמצאו פרויקטים להצגה.</p></section>;
  }

  const closeDetail = () => setSelectedProjectId(null);
  const isList = viewMode === "list";

  const projectItems = filteredProjects.map((p) => (
    <Project key={p.id} project={p} />
  ));

  if (isList) {
    return (
      <section className="p-list" dir="rtl">
        <div className={`p-split ${selectedProject ? "" : "p-split--no-det"}`}>
          <div className="p-rows">{projectItems}</div>
          {selectedProject && (
            <div className="p-side-det">
              <ProjectDetail project={selectedProject} onClose={closeDetail} />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="p-list" dir="rtl">
      <div className="p-grid">{projectItems}</div>
      {selectedProject && (
        <Modal onClose={closeDetail}>
          <ProjectDetail project={selectedProject} onClose={closeDetail} />
        </Modal>
      )}
    </section>
  );
}