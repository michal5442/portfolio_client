// src/components/ProjectsList/Project/ProjectFinanceLayout.js
import React from "react";
import { formatMoney } from "../../../../../utils/formatMoney";
import { BudgetGap } from "../ProjectElements/ProjectElements";
import "./ProjectFinanceLayout.css";

export default function ProjectFinanceLayout({ financeData, mode = "card", onEdit }) {
    const { totalTakzivCoachAdam, totalTakzivRechesh, coachAdam, totalTaktziv } = financeData;

  if (mode === "card") {
    return (
      <div className="card-fin">
        <div className="cf"><div className="cf-lbl">תקציב כ"א</div><div className="cf-val">{formatMoney(totalTakzivCoachAdam)}</div></div>
        <div className="cf"><div className="cf-lbl">תקציב רכש</div><div className="cf-val">{formatMoney(totalTakzivRechesh)}</div></div>
        <div className="cf"><div className="cf-lbl">תכנון כ"א</div><div className="cf-val">{formatMoney(coachAdam)}</div></div>
        <div className="cf"><div className="cf-lbl">פערים</div><div className="cf-val"><BudgetGap financeData={financeData} /></div></div>
        <div className="cf-tot-row">
          <div className="cf-tot">סה"כ {formatMoney(totalTaktziv)}</div>
          {onEdit && (
            <button className="cf-edit-btn" onClick={onEdit} aria-label="עדכן" title="עדכן">
              <span className="cf-edit-icon" />
            </button>
          )}
        </div>
     </div>
    );
  }

  if (mode === "row") {
    return (
      <div className="li-fin" aria-hidden>
        <span>כ"א <strong>{formatMoney(totalTakzivCoachAdam)}</strong></span>
        <span>רכש <strong>{formatMoney(totalTakzivRechesh)}</strong></span>
        <span className="li-gap">פערים <BudgetGap financeData={financeData} /></span>
      </div>
    );
  }

  return (
    <div className="pd-fin-grid">
      <div className="pd-fc"><div className="pd-fc-lbl">תקציב כ"א</div><div className="pd-fc-val">{formatMoney(totalTakzivCoachAdam)}</div></div>
      <div className="pd-fc"><div className="pd-fc-lbl">תקציב רכש</div><div className="pd-fc-val">{formatMoney(totalTakzivRechesh)}</div></div>
      <div className="pd-fc"><div className="pd-fc-lbl">סה"כ תקציב</div><div className="pd-fc-val">{formatMoney(totalTaktziv)}</div></div>
      <div className="pd-fc"><div className="pd-fc-lbl">תכנון כ"א</div><div className="pd-fc-val">{formatMoney(coachAdam)}</div></div>
      <div className="pd-fc">
        <div className="pd-fc-lbl">פערים</div>
        <div className="pd-fc-val">
          <BudgetGap financeData={financeData} />
        </div>
      </div>
    </div>
  );
}