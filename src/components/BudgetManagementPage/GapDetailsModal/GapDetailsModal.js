import React from "react";
import { BudgetGap } from "../ProjectsList/Project/ProjectElements/ProjectElements";
import { formatMoney } from "../../../utils/formatMoney";
import "./GapDetailsModal.css";

/**
 * הגדרת העמודות במקום אחד — הן הכותרת (thead) והן אופן הצגת הערך
 * נגזרים מכאן, גם בשורות הרגילות (tbody) וגם בשורת הסה"כ (tfoot).
 * מוסיפים/מסירים עמודה כאן בלבד, אין צורך לסנכרן בין כמה מקומות.
 */
const columns = [
  {
    key: "name",
    header: "פרויקט",
    renderCell: (row) => row.name,
    renderTotal: () => 'סה"כ',
  },
  {
    key: "actual",
    header: 'תקציב כ"א',
    renderCell: (row) => formatMoney(row.financeData.totalTakzivCoachAdam),
    renderTotal: (totals) => formatMoney(totals.totalActual),
  },
  {
    key: "planned",
    header: 'תכנון כ"א',
    renderCell: (row) => formatMoney(row.financeData.coachAdam),
    renderTotal: (totals) => formatMoney(totals.totalPlanned),
  },
  {
    key: "gap",
    header: "פער",
    renderCell: (row) => <BudgetGap financeData={row.financeData} />,
    renderTotal: (totals) => formatMoney(totals.totalGap),
  },
];

export default function GapDetailsModal({ rows, totalGap, totalActual, onClose }) {
  const totalPlanned = rows.reduce((s, r) => s + (r.financeData.coachAdam || 0), 0);
  const totals = { totalPlanned, totalActual, totalGap };

  return (
    <div className="gdm-overlay" onClick={onClose}>
      <div className="gdm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gdm-header">
          <div className="gdm-title">פערים בתקציב כ"א — {formatMoney(totalGap)}</div>
          <button className="gdm-close" onClick={onClose} aria-label="סגור">
            ✕
          </button>
        </div>

        <div className="gdm-body">
          {rows.length === 0 ? (
            <div className="gdm-empty">אין פרויקטים להצגה</div>
          ) : (
            <table className="gdm-table">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key}>{col.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {columns.map((col) => (
                      <td key={col.key}>{col.renderCell(row)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  {columns.map((col) => (
                    <td key={col.key}>{col.renderTotal(totals)}</td>
                  ))}
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}