import React from "react";
import "./ProjectsPage.css";
import SummarySquares from "../SummarySqueres/SummarySquares";
import FilterBar from "../FilterBar/FilterBar";
import ProjectsList from "../ProjectsList/ProjectsList";
import ProjectsToolbar from "../ProjectsToolbar/ProjectsToolbar";
import PageTitle from "../TopBar/PageTitle/PageTitle";

export default function ProjectsPage() {

  return (
    <>

      <main className="page-shell">
        <FilterBar />
        <ProjectsToolbar />
        <ProjectsList />
      </main>
    </>
  );
}