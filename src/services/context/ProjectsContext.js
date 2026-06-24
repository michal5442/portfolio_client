import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getProjectByYear, insertProject, updateProject } from "../api/generalApi";
import { calculateProjectFinance } from "../../utils/calculateProjectFinance";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [activeTab, setActiveTab] = useState("projects");
  const [viewMode, setViewMode] = useState("cards");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    agaff: "",
    yechidaMevatzat: "",
    maslol: "",
    logHemsheci: "",
  });

  // // map of computed finance values for quick access in UI
  // map of computed finance values for quick access in UI
  const projectFinanceMap = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      map[p.id] = calculateProjectFinance(p);
    });
    return map;
  }, [projects]);

  useEffect(() => {
    let mounted = true;
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const data = await getProjectByYear(selectedYear);
        const normalized = (data || []).map((p) => ({
          ...p,
          // keep both possible field names used across the app; compute safe defaults
          projectName: p.projectName || p.name || "",
          teur: p.teur || p.desc || "",
          totalTakzuvCoachAdam: p.totalTakzuvCoachAdam || 0,
          totalTakzivRechesh: p.totalTakzivRechesh || 0,
          coachAdam: p.coachAdam || 0,
        }));
        if (!mounted) return;
        setProjects(normalized);
        setSelectedProjectId(null);
      } catch (err) {
        console.error("שגיאה בטעינת פרויקטים לשנה הנבחרת:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    fetchProjects();
    return () => {
      mounted = false;
    };
  }, [selectedYear]);

  const updateFilter = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: "", agaff: "", yechidaMevatzat: "", maslol: "", logHemsheci: "" });
  };

  // derive filter options from loaded projects
  const filterOptions = useMemo(() => {
    const uniq = (key) => Array.from(new Set(projects.map((p) => p[key]).filter(Boolean))).sort();
    return {
      agaff: uniq("agaff"),
      yechidaMevatzat: uniq("yechidaMevatzat"),
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        !filters.search ||
        project.projectName?.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.teur?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesAgaff = !filters.agaff || project.agaff === filters.agaff;
      const matchesYechida = !filters.yechidaMevatzat || project.yechidaMevatzat === filters.yechidaMevatzat;
      const matchesMaslol = !filters.maslol || String(project.maslol) === String(filters.maslol);

      let matchesHemsheci = true;
      if (filters.logHemsheci === "yes") matchesHemsheci = project.logHemsheci === true;
      if (filters.logHemsheci === "no") matchesHemsheci = project.logHemsheci === false;

      return matchesSearch && matchesAgaff && matchesYechida && matchesMaslol && matchesHemsheci;
    });
  }, [projects, filters]);

  const summaryData = useMemo(() => {
    let totalHR = 0;
    let totalProc = 0;
    let totalPlannedHR = 0;

    filteredProjects.forEach((p) => {
      totalHR += p.totalTakzuvCoachAdam || 0;
      totalProc += p.totalTakzivRechesh || 0;
      totalPlannedHR += p.coachAdam || 0;
    });

    return {
      totalCount: filteredProjects.length,
      totalHR,
      totalProc,
      totalBudget: totalHR + totalProc,
      totalGap: totalHR - totalPlannedHR,
    };
  }, [filteredProjects]);

  const addNewProject = async (projectData) => {
    const fullData = { ...projectData, year: selectedYear };
    // ensure numeric fields
    fullData.totalTakzuvCoachAdam = Number(fullData.totalTakzuvCoachAdam || 0);
    fullData.totalTakzivRechesh = Number(fullData.totalTakzivRechesh || 0);
    fullData.coachAdam = Number(fullData.coachAdam || 0);
    const savedProject = await insertProject(fullData);
    const normalizedSaved = { ...savedProject, totalTakzuvCoachAdam: savedProject.totalTakzuvCoachAdam || 0, totalTakzivRechesh: savedProject.totalTakzivRechesh || 0, coachAdam: savedProject.coachAdam || 0 };
    setProjects((prev) => [...prev, normalizedSaved]);
    return normalizedSaved;
  };

  const updateProjectData = async (projectData) => {
    const toSend = { ...projectData };
    toSend.totalTakzuvCoachAdam = Number(toSend.totalTakzuvCoachAdam || 0);
    toSend.totalTakzivRechesh = Number(toSend.totalTakzivRechesh || 0);
    toSend.coachAdam = Number(toSend.coachAdam || 0);
    const updated = await updateProject(toSend);
    const normalizedUpdated = { ...updated, totalTakzuvCoachAdam: updated.totalTakzuvCoachAdam || 0, totalTakzivRechesh: updated.totalTakzivRechesh || 0, coachAdam: updated.coachAdam || 0 };
    setProjects((prev) => prev.map((p) => (p.id === normalizedUpdated.id ? normalizedUpdated : p)));
    return normalizedUpdated;
  };

  const selectedProject = useMemo(() => projects.find((p) => p.id === selectedProjectId) || null, [projects, selectedProjectId]);

  const value = {
    projects,
    filteredProjects,
    projectFinanceMap,
    summaryData,
    isLoading,
    selectedYear,
    setSelectedYear,
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    filters,
    filterOptions,
    updateFilter,
    clearFilters,
    addNewProject,
    updateProjectData,
  };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) throw new Error("useProjects must be used within a ProjectsProvider");
  return context;
}