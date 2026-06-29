// src/components/ProjectsList/ProjectsList.js
import React from "react";
import { useProjects } from "../../../services/context/ProjectsContext";
import Project from "./Project/Project";
import ProjectDetail from "../ProjectDetail/ProjectDetail";
import Modal from "../Modal/Modal";
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

  const projectItems = filteredProjects.map((p) => (
    <Project key={p.id} project={p} />
  ));

  if (isList) {
    return (
      <section className="p-list" dir="rtl">
        <div className={`p-split p-split--no-det`}>
          <div className="p-table-wrap">
            <table className="p-table">
              <thead>
                <tr>
                  <th className="pt-th-name">שם הפרויקט</th>
                  <th className="pt-th-sector">אגף</th>
                  <th className="pt-th-unit">יחידה מבצעת</th>
                  <th className="pt-th-continuation">המשכיות</th>
                  <th className="pt-th-status">מסלול</th>
                  <th>תקציב כ"א</th>
                  <th>תקציב רכש</th>
                  <th>פערים</th>
                </tr>
              </thead>
              <tbody>
                {projectItems}
              </tbody>
            </table>
          </div>
          <DetailContainer project={selectedProject} onClose={closeDetail} />
        </div>
      </section>
    );
  }

  return (
    <section className="p-list" dir="rtl">
      <div className="p-grid">{projectItems}</div>
      <DetailContainer project={selectedProject} onClose={closeDetail} />
    </section>
  );
}