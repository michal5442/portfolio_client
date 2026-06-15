import React, { useEffect, useState } from "react";
import { getAllProjects } from "../services/api/generalApi";
import "./SummarySquares.css";

export default function SummarySquares() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getAllProjects();
        if (mounted) setProjects(data || []);
      } catch (err) {
        setError(err.message || "שגיאה בטעינת פרויקטים");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const totalProjects = projects.length;
  const totalActive = projects.filter((p) => p.Active).length;

  const sumField = (field) =>
    projects.reduce((acc, p) => acc + (Number(p[field]) || 0), 0);

  const totalTakzuvCoachAdam = sumField("TotalTakzuvCoachAdam");
  const totalTakzivRechesh = sumField("TotalTakzivRechesh");
  const totalOfBoth = totalTakzuvCoachAdam + totalTakzivRechesh;
  const totalCoachAdamPlanned = sumField("CoachAdam");
  const totalGaps = totalOfBoth - totalCoachAdamPlanned;

  if (loading)
    return <div className="ss-wrapper">טוען סיכומים...</div>;
  if (error) return <div className="ss-wrapper ss-error">{error}</div>;

  return (
    <div className="ss-wrapper">
      <div className="ss-grid">
        <div className="ss-card">
          <div className="ss-title">סה"כ פרויקטים</div>
          <div className="ss-value">{totalProjects}</div>
          <div className="ss-sub">פעילים: {totalActive}</div>
        </div>

        <div className="ss-card">
          <div className="ss-title">סה"כ Takzuv CoachAdam</div>
          <div className="ss-value">{totalTakzuvCoachAdam}</div>
        </div>

        <div className="ss-card">
          <div className="ss-title">סה"כ Takziv Rechesh</div>
          <div className="ss-value">{totalTakzivRechesh}</div>
        </div>

        <div className="ss-card">
          <div className="ss-title">סה"כ (2 + 3)</div>
          <div className="ss-value">{totalOfBoth}</div>
        </div>

        <div className="ss-card">
          <div className="ss-title">סה"כ תכנון כוח אדם (CoachAdam)</div>
          <div className="ss-value">{totalCoachAdamPlanned}</div>
        </div>

        <div className={"ss-card " + (totalGaps > 0 ? "ss-danger" : "ss-ok") }>
          <div className="ss-title">סה"כ פערים (כוח אדם - תכנון)</div>
          <div className="ss-value">{totalGaps}</div>
        </div>
      </div>
    </div>
  );
}
