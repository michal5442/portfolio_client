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
 * GapAlertIcon disabled — no exclamation icon rendered.
 */
const GapAlertIcon = ({ value, achuzPearim }) => {
  return null;
};

/**
 * תצוגה משותפת לכל סכום פער (חיובי/שלילי) עם חץ מתאים.
 * משמש גם בשורת/כרטיס פרויקט בודד וגם בריבועי הסיכום.
 */
export const GapIndicator = ({ value, statusPearim, achuzPearim, className = "" }) => {
  const isNegative = value < 0;
  const fallbackStatus = value === 0 ? "takin" : (isNegative ? "geraon" : "odef");
  let status = statusPearim || fallbackStatus;
  if (value < 0 && status === 'takin') {
    status = 'geraon';
  }
  const absValue = Math.abs(value);
  const displayValue = value === 0
    ? `₪${formatMoney(absValue)}`
    : `${isNegative ? "▼ " : "▲ +"}${formatMoney(absValue)}`;

  return (
    <span className={`pc-gap pc-gap--${status} ${className}`} >
      <GapAlertIcon value={value} achuzPearim={achuzPearim} />
      {displayValue}
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