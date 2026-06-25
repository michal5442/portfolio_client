import { useState } from "react";
import { useProjects } from "../../../../services/context/ProjectsContext";
import ProjectForm from "../../../BudgetManagementPage/ProjectFormModal/ProjectForm";
import "./NewProjectButton.css";

export default function NewProjectButton() {
  const { addNewProject } = useProjects();
  const [open, setOpen] = useState(false);

  const handleCreate = async (data) => {
    await addNewProject({
      projectName: data.projectName,
      agaff: data.agaff,
      yechidaMevatzat: data.yechidaMevatzat,
      maslol: Number(data.maslol),
      logHemsheci: data.logHemsheci,
      teur: data.teur,
      hearot: data.hearot,
      totalTakzuvCoachAdam: Number(data.totalTakzuvCoachAdam),
      totalTakzivRechesh: Number(data.totalTakzivRechesh),
      coachAdam: Number(data.coachAdam),
    });
    setOpen(false);
  };

  return (
    <>
      <button className="np-trigger" onClick={() => setOpen(true)}>
        פרויקט חדש
      </button>

      {open && (
        <div className="np-overlay">
          <div className="np-modal" dir="rtl">
            <h2 className="np-title">פרויקט חדש</h2>
            <ProjectForm onSubmit={handleCreate} onCancel={() => setOpen(false)} mode="new" />
          </div>
        </div>
      )}
    </>
  );
}
