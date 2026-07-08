import React from "react";
import { formatMoney } from "../../../../../utils/formatMoney";
import { formatGapDisplay } from "../../../../../utils/calculateProjectFinance";
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
 * GapAlertIcon disabled — no exclamation icon rendered.
 */
const GapAlertIcon = ({ value, achuzPearim }) => {
  return null;
};

/**
 * תצוגה משותפת לכל סכום פער (חיובי/שלילי) עם חץ מתאים.
 * משמש גם בשורת/כרטיס פרויקט בודד וגם בריבועי הסיכום.
 */
export const GapIndicator = ({ value, statusPearim, achuzPearim, totalBudget = null, className = "" }) => {
  const isNegative = value < 0;
  const fallbackStatus = value === 0 ? "takin" : (isNegative ? "geraon" : "odef");
  const status = statusPearim || fallbackStatus;
  
  // Use formatGapDisplay to get consistent formatting
  const displayValue = totalBudget 
    ? formatGapDisplay(value, totalBudget) 
    : (achuzPearim !== undefined 
        ? `${isNegative ? "▼ " : "▲ "}₪${formatMoney(Math.abs(value))} (${achuzPearim}%)`
        : formatGapDisplay(value, null));

  return (
    <span className={`pc-gap pc-gap--${status} ${className}`} >
      <GapAlertIcon value={value} achuzPearim={achuzPearim} />
      {displayValue}
    </span>
  );
};

export const BudgetGap = ({ financeData }) => {
  const { pearim, achuzPearim, statusPearim } = financeData;

  return (
    <GapIndicator value={pearim} achuzPearim={achuzPearim} statusPearim={statusPearim} />
  );
};