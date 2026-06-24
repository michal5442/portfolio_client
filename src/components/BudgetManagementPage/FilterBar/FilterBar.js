import React from "react";
import { useProjects } from "../../../services/context/ProjectsContext";
import { MASLOL_LABELS } from "../constants/maslol";
import "./FilterBar.css";

export default function FilterBar() {
  const { filters, filterOptions, updateFilter, clearFilters } = useProjects();

  return (
    <div className="toolbar" dir="rtl">
      <input
        type="text"
        placeholder="🔍  חיפוש שם, תיאור, אגף..."
        value={filters.search || ""}
        onChange={(e) => updateFilter("search", e.target.value)}
      />

      <select
        value={filters.agaff}
        onChange={(e) => updateFilter("agaff", e.target.value)}
      >
        <option value="">כל האגפים</option>
        {filterOptions.agaff?.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      <select
        value={filters.yechidaMevatzat}
        onChange={(e) => updateFilter("yechidaMevatzat", e.target.value)}
      >
        <option value="">כל היחידות</option>
        {filterOptions.yechidaMevatzat?.map((u) => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>

      <select
        value={filters.maslol}
        onChange={(e) => updateFilter("maslol", e.target.value)}
      >
        <option value="">כל המסלולים</option>
        <option value="KIYUM">{MASLOL_LABELS.KIYUM}</option>
        <option value="HITAZMUT">{MASLOL_LABELS.HITAZMUT}</option>
      </select>

      <select
        value={filters.logHemsheci}
        onChange={(e) => updateFilter("logHemsheci", e.target.value)}
      >
        <option value="">המשיכי — הכל</option>
        <option value="yes">המשיכי</option>
        <option value="no">חדש</option>
      </select>

      <button type="button" className="btn" onClick={clearFilters}>
        נקה
      </button>
    </div>
  );
}