import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getProjectByYear, insertProject, updateProject } from "../api/generalApi";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2025); // השנה הנבחרת בטופבר
  const [activeTab, setActiveTab] = useState("projects"); // "projects" או "dashboard"
  const [viewMode, setViewMode] = useState("split"); // "split" (מפוצלת) או "cards" (כרטיסיות)
  const [selectedProjectId, setSelectedProjectId] = useState(null); // הפרויקט שנבחר בפנל הצדדי

  const [filters, setFilters] = useState({
    search: "",
    sector: "",
    unit: "",
    track: "",
    isContinued: "" 
  });

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const data = await getProjectByYear(selectedYear);
        setProjects(data || []);
        setSelectedProjectId(null); 
      } catch (err) {
        console.error("שגיאה בטעינת פרויקטים לשנה הנבחרת:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, [selectedYear]);

  const updateFilter = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: "", sector: "", unit: "", track: "", isContinued: "" });
  };

  // --- 5. לוגיקת סינון הפרויקטים (Filtered Projects) ---
  // מתעדכן אוטומטית רק כשהפרויקטים מהשרת או הסינונים משתנים
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = !filters.search || 
        project.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.desc?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesSector = !filters.sector || project.sector === filters.sector;
      const matchesUnit = !filters.unit || project.unit === filters.unit;
      const matchesTrack = !filters.track || project.track === filters.track;
      
      let matchesCont = true;
      if (filters.isContinued === "yes") matchesCont = project.isContinued === true;
      if (filters.isContinued === "no") matchesCont = project.isContinued === false;

      return matchesSearch && matchesSector && matchesUnit && matchesTrack && matchesCont;
    });
  }, [projects, filters]);

  // --- 6. חישוב מדדים עבור כרטיסי הסיכום (Summary Cards Data) ---
  // מחושב בזמן אמת על בסיס הפרויקטים המסוננים שמופיעים על המסך
  const summaryData = useMemo(() => {
    let totalCount = filteredProjects.length;
    let totalHR = 0;
    let totalProc = 0;
    let totalPlannedHR = 0;

    filteredProjects.forEach(p => {
      totalHR += (p.budgetHR || 0);
      totalProc += (p.budgetProc || 0);
      totalPlannedHR += (p.plannedHR || 0);
    });

    const totalBudget = totalHR + totalProc;
    const totalGap = totalHR - totalPlannedHR; // פער כ"א מול תכנון

    return {
      totalCount,
      totalHR,
      totalProc,
      totalBudget,
      totalGap
    };
  }, [filteredProjects]);

  // --- 7. פעולות CRUD (הוספה, עריכה, מחיקה) ---
  
  // הוספת פרויקט חדש
  const addNewProject = async (projectData) => {
    // הוספת השנה הנוכחית לנתונים שנשלחים
    const fullData = { ...projectData, year: selectedYear };
    const savedProject = await insertProject(fullData);
    setProjects(prev => [...prev, savedProject]);
    return savedProject;
  };

  // עדכון פרויקט קיים
  const updateProjectData = async (projectData) => {
    const updated = await updateProject(projectData);
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
    return updated;
  };

//   // מחיקת פרויקט (Soft Delete לפי האפיון שלכם)
//   const removeProject = async (id) => {
//     await deleteProject(id);
//     setProjects(prev => prev.filter(p => p.id !== id));
//     if (selectedProjectId === id) setSelectedProjectId(null);
//   };

  // מציאת האובייקט המלא של הפרויקט שנבחר לפנל הצדדי
  const selectedProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  const value = {
    projects,
    filteredProjects,
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
    updateFilter,
    clearFilters,
    addNewProject,
    updateProjectData,
    //removeProject
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}