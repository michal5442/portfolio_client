import React from "react";
import "./ProjectsList.css";
import { useProjects } from "../../../services/context/ProjectsContext";
import Project from "./Project/Project";

export default function ProjectsList({ view = 'cards' }) {
  const { projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <section className="projects-list projects-list--loading" dir="rtl">
        <p>טוען פרויקטים...</p>
      </section>
    );
  }

  if (!projects?.length) {
    return (
      <section className="projects-list projects-list--empty" dir="rtl">
        <p>לא נמצאו פרויקטים להצגה.</p>
      </section>
    );
  }

  return (
    <section className="projects-list" dir="rtl" aria-label="רשימת פרויקטים">
      <header className="projects-list__header">
        <h2>כל הפרויקטים</h2>
        <p className="projects-list__count">{projects.length} פרויקטים</p>
      </header>

      <div className={`projects-list__grid projects-list__grid--${view}`}>
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
