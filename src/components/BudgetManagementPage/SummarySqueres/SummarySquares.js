import React, { useState, useMemo } from "react";
import { useProjects } from "../../../services/context/ProjectsContext";
import { GapIndicator } from "../ProjectsList/Project/ProjectElements/ProjectElements";
import { formatMoney } from "../../../utils/formatMoney";
import { GAP_STATUS_THRESHOLD } from "../Dashboard/dashUtils/dashUtils";
import GapDetailsModal from "../GapDetailsModal/GapDetailsModal";
import "./SummarySquares.css";

export default function SummarySquares() {
  const { summaryData, isLoading, gapDetails } = useProjects();
  const { totalCount, totalActive, totalHR, totalProc, totalBudget, totalGap } = summaryData;
  const [isGapOpen, setIsGapOpen] = useState(false);

  const totalGapStatus = useMemo(() => {
    if (!totalHR) return "takin";
    const percent = Math.abs(totalGap) / totalHR;
    if (percent >= GAP_STATUS_THRESHOLD) {
      return totalGap < 0 ? "geraon" : "odef";
    }
    return "takin";
  }, [totalGap, totalHR]);

  const summaryCards = [
    { label: "פרויקטים", value: totalCount, subText: `פעילים: ${totalActive}` },
    { label: `תקציב כ"א`, value: formatMoney(totalHR) },
    { label: "תקציב רכש", value: formatMoney(totalProc) },
    { label: "סה''כ תקציב", value: formatMoney(totalBudget) },
  ];

  if (isLoading) return <div className="ss-wrapper">טוען סיכומים...</div>;

  return (
    <div className="ss-wrapper">
      <div className="ss-grid">
        {summaryCards.map(({ label, value, subText }) => (
          <div key={label} className="ss-card">
            <div className="ss-title">{label}</div>
            <div className="ss-value">{value}</div>
            {subText && <div className="ss-sub">{subText}</div>}
          </div>
        ))}

        <div
          className={`ss-card ss-card--clickable${isGapOpen ? " ss-card--active" : ""}`}
          onClick={() => setIsGapOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setIsGapOpen(true);
          }}
        >
          <div className="ss-title">פערים</div>
          <div className="ss-value">
            <GapIndicator value={totalGap} statusPearim={totalGapStatus} />
          </div>
        </div>
      </div>

      {isGapOpen && (
        <GapDetailsModal
          rows={gapDetails}
          totalGap={totalGap}
          totalActual={totalHR}
          onClose={() => setIsGapOpen(false)}
        />
      )}
    </div>
  );
}