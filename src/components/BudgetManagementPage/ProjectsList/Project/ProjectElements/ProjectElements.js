import React from "react";
import { formatMoney } from "../../../../../utils/formatMoney";

export const StatusPill = ({ maslol }) => {
  const isKiyum = maslol === "KIYUM";
  return (
    <span className={`badge ${isKiyum ? "b-kioom" : "b-hit"}`}>
      {isKiyum ? "קיום" : "התעצמות"}
    </span>
  );
};

export const BudgetGap = ({ financeData }) => {

  const { pearim, achuzPearim, statusPearim } = financeData;

  return (
    <span className={`pc-gap pc-gap--${statusPearim}`}>
      {pearim < 0 ? "▼ " : "▲ +"}
      {formatMoney(pearim)} ({achuzPearim}%)
    </span>
  );
};