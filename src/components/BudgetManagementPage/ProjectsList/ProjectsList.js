// src/components/ProjectsList/ProjectsList.js
import React from "react";
import { useProjects } from "../../../services/context/ProjectsContext";
import Project from "./Project/Project";
import ProjectDetail from "../ProjectDetail/ProjectDetail";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";
import "./ProjectsList.css";

function DetailContainer({ project, onClose }) {
  if (!project) return null;

  return (
    <Modal onClose={onClose}>
      <ProjectDetail project={project} onClose={onClose} />
    </Modal>
  );
}

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

  if (isList) {
    return (
      <section className="p-list" dir="rtl">
        <div className="p-split p-split--no-det">
          <Table projects={filteredProjects} />
          <DetailContainer project={selectedProject} onClose={closeDetail} />
        </div>
      </section>
    );
  }

  return (
    <section className="p-list" dir="rtl">
      <div className="p-grid">
        {filteredProjects.map((p) => (
          <Project key={p.id} project={p} />
        ))}
      </div>
      <DetailContainer project={selectedProject} onClose={closeDetail} />
    </section>
  );
}