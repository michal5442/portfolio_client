import { useState } from "react";
import { useProjects } from "../../../../services/context/ProjectsContext";
import "./NewProjectButton.css";

export default function NewProjectButton() {
  const { addNewProject } = useProjects();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("פרטים");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    projectName: "",
    agaff: "",
    yechidaMevatzat: "",
    maslol: "0",
    logHemsheci: false,
    teur: "",
    hearot: "",
    totalTakzuvCoachAdam: 0,
    totalTakzivRechesh: 0,
    coachAdam: 0,
  });

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const totalBudget = Number(form.totalTakzuvCoachAdam) + Number(form.totalTakzivRechesh);
  const gaps = totalBudget - Number(form.coachAdam);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!form.projectName.trim()) newErrors.projectName = true;
    if (!form.yechidaMevatzat.trim()) newErrors.yechidaMevatzat = true;
    if (!form.agaff.trim()) newErrors.agaff = true;
    if (Number(form.totalTakzivRechesh) === 0) newErrors.totalTakzivRechesh = true;
    if (Number(form.totalTakzuvCoachAdam) === 0) newErrors.totalTakzuvCoachAdam = true;
    if (Number(form.coachAdam) === 0) newErrors.coachAdam = true;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    await addNewProject({
      projectName: form.projectName,
      agaff: form.agaff,
      yechidaMevatzat: form.yechidaMevatzat,
      maslol: Number(form.maslol),
      logHemsheci: form.logHemsheci,
      teur: form.teur,
      hearot: form.hearot,
      totalTakzuvCoachAdam: Number(form.totalTakzuvCoachAdam),
      totalTakzivRechesh: Number(form.totalTakzivRechesh),
      coachAdam: Number(form.coachAdam),
    });
    setOpen(false);
    setForm({
      projectName: "", agaff: "", yechidaMevatzat: "", maslol: "0",
      logHemsheci: false, teur: "", hearot: "",
      totalTakzuvCoachAdam: 0, totalTakzivRechesh: 0, coachAdam: 0,
    });
    setErrors({});
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

            {/* Tabs */}
            <div className="np-tabs">
              {["פרטים", "תקציב"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`np-tab${tab === t ? " np-tab--active" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "פרטים" && (
              <>
                <div className="np-field">
                  <label className="np-label">שם הפרויקט *</label>
                  <input className={`np-input${errors.projectName ? " np-input--error" : ""}`} value={form.projectName} onChange={(e) => set("projectName", e.target.value)} />
                </div>

                <div className="np-row">
                  <div className="np-field">
                    <label className="np-label">יחידת פיתוח *</label>
                    <input className={`np-input${errors.yechidaMevatzat ? " np-input--error" : ""}`} value={form.yechidaMevatzat} onChange={(e) => set("yechidaMevatzat", e.target.value)} />
                  </div>
                  <div className="np-field">
                    <label className="np-label">אגף מבצע *</label>
                    <input className={`np-input${errors.agaff ? " np-input--error" : ""}`} value={form.agaff} onChange={(e) => set("agaff", e.target.value)} />
                  </div>
                </div>

                <div className="np-row">
                  <div className="np-field">
                    <label className="np-label">המשיכי</label>
                    <select className="np-select" value={form.logHemsheci} onChange={(e) => set("logHemsheci", e.target.value === "true")}>
                      <option value="false">לא</option>
                      <option value="true">כן</option>
                    </select>
                  </div>
                  <div className="np-field">
                    <label className="np-label">מסלול *</label>
                    <select className="np-select" value={form.maslol} onChange={(e) => set("maslol", e.target.value)}>
                      <option value="0">קיום</option>
                      <option value="1">פיתוח</option>
                    </select>
                  </div>
                </div>

                <div className="np-field">
                  <label className="np-label">תיאור הפרויקט</label>
                  <textarea rows={4} className="np-textarea" value={form.teur} onChange={(e) => set("teur", e.target.value)} />
                </div>

                <div className="np-field np-field--last">
                  <label className="np-label">הערות</label>
                  <textarea rows={2} className="np-textarea" value={form.hearot} onChange={(e) => set("hearot", e.target.value)} />
                </div>
              </>
            )}

            {tab === "תקציב" && (
              <>
                <div className="np-row">
                  <div className="np-field">
                    <label className="np-label">תקציב רכש (₪) *</label>
                    <input type="number" className={`np-input${errors.totalTakzivRechesh ? " np-input--error" : ""}`} value={form.totalTakzivRechesh} onChange={(e) => set("totalTakzivRechesh", e.target.value)} />
                  </div>
                  <div className="np-field">
                    <label className="np-label">תקציב כ"א (₪) *</label>
                    <input type="number" className={`np-input${errors.totalTakzuvCoachAdam ? " np-input--error" : ""}`} value={form.totalTakzuvCoachAdam} onChange={(e) => set("totalTakzuvCoachAdam", e.target.value)} />
                  </div>
                </div>

                <div className="np-field">
                  <label className="np-label">סה"כ תקציב (אוטומטי)</label>
                  <input className="np-input" readOnly value={`₪${totalBudget}`} style={{ backgroundColor: "#f9fafb", color: "#374151" }} />
                </div>

                <div className="np-row np-field--last">
                  <div className="np-field" style={{ marginBottom: 0 }}>
                    <label className="np-label">פערים (אוטומטי)</label>
                    <input className="np-input" readOnly value={gaps >= 0 ? `▲ ₪${gaps}+` : `▼ ₪${Math.abs(gaps)}-`} style={{ backgroundColor: "#f9fafb", color: gaps >= 0 ? "#059669" : "#dc2626" }} />
                  </div>
                  <div className="np-field" style={{ marginBottom: 0 }}>
                    <label className="np-label">תכנון כ"א (₪) *</label>
                    <input type="number" className={`np-input${errors.coachAdam ? " np-input--error" : ""}`} value={form.coachAdam} onChange={(e) => set("coachAdam", e.target.value)} />
                  </div>
                </div>
              </>
            )}

            <div className="np-actions">
              <button className="np-btn-cancel" onClick={() => setOpen(false)}>ביטול</button>
              <button className="np-btn-submit" onClick={handleSubmit}>הוסף פרויקט</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
