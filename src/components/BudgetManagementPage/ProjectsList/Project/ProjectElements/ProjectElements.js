import React from "react";
import { formatMoney } from "../../../../../utils/formatMoney";
import "./ProjectElements.css";

export const StatusPill = ({ maslol }) => {
  const isKiyum = maslol === "KIYUM";
  return (
    <span className={`badge ${isKiyum ? "b-kioom" : "b-hit"}`}>
      {isKiyum ? "קיום" : "התעצמות"}
    </span>
  );
};

/**
 * עיגול אזהרה עם סימן קריאה: אדום לפער שלילי (גירעון), כתום לפער חיובי (עודף).
 * לא מוצג כשאין פער (value === 0).
 */
const GapAlertIcon = ({ value }) => {
  if (!value) return null;
  const isNegative = value < 0;
  return (
    <span
      className={`pc-gap-alert ${isNegative ? "pc-gap-alert--red" : "pc-gap-alert--orange"}`}
      aria-hidden="true"
    >
      !
    </span>
  );
};

/**
 * תצוגה משותפת לכל סכום פער (חיובי/שלילי) עם חץ מתאים.
 * משמש גם בשורת/כרטיס פרויקט בודד וגם בריבועי הסיכום.
 */
export const GapIndicator = ({ value, statusPearim, achuzPearim, className = "" }) => {
  //console.log(value+" "+statusPearim+" "+achuzPearim+" "+className);
  
  const isNegative = value < 0;
  const fallbackStatus = isNegative ? "geraon" : "odef";
  const status = statusPearim || fallbackStatus;

  return (
    <span className={`pc-gap pc-gap--${status} ${className}`} >
      <GapAlertIcon value={value} />
      {isNegative ? "▼ " : "▲ +"}
      {formatMoney(value)}
      {achuzPearim !== undefined && ` (${achuzPearim}%)`}
    </span>
  );
};

export const BudgetGap = ({ financeData }) => {
  const { pearim, achuzPearim, statusPearim } = financeData;

  return (
    <GapIndicator value={pearim} achuzPearim={achuzPearim} statusPearim={statusPearim} />
  );
};