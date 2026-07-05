import React, { useState, useRef, useEffect } from "react";
import { useProjects } from "../../../services/context/ProjectsContext";
import { MASLOL_LABELS } from "../../../constants/maslol";
import "./FilterBar.css";

function CheckListDropdown({ label, allLabel, options, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    const isSelected = selected.includes(option);
    const next = isSelected
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    onChange(next);
  };

  const valueText =
    selected.length === 0
      ? allLabel
      : selected.length === 1
      ? selected[0]
      : `נבחרו ${selected.length}`;

  return (
    <div className="filter-dropdown" ref={ref}>
      <button
        type="button"
        className="filter-button"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="filter-button-value">{valueText}</span>
        <span className="filter-button-arrow">▾</span>
      </button>

      {open && (
        <div className="filter-popover">
          {selected.length > 0 && (
            <div className="filter-popover-header">
              <button
                type="button"
                className="btn"
                onClick={() => onChange([])}
              >
                נקה
              </button>
            </div>
          )}
          <div className="filter-options">
            {options?.map((option) => {
              const isChecked = selected.includes(option);
              return (
                <div
                  key={option}
                  className="filter-option"
                  onClick={() => toggleOption(option)}
                >
                  
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleOption(option)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="filter-option-text">{option}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * By default reads/writes the global ProjectsContext filters.
 * Pass `filters` / `filterOptions` / `updateFilter` / `clearFilters` as props
 * to make this a fully local, self-contained filter bar (e.g. inside a modal)
 * that never touches the app-wide filter state.
 */
export default function FilterBar({
  filters: filtersProp,
  filterOptions: filterOptionsProp,
  updateFilter: updateFilterProp,
  clearFilters: clearFiltersProp,
}) {
  const context = useProjects();

  const filters = filtersProp ?? context.filters;
  const filterOptions = filterOptionsProp ?? context.filterOptions;
  const updateFilter = updateFilterProp ?? context.updateFilter;
  const clearFilters = clearFiltersProp ?? context.clearFilters;
  
  console.log("FilterBar received filterOptions:", filterOptions);

  return (
    <div className="toolbar" dir="rtl">
      <input
        type="text"
        placeholder="🔍  חיפוש שם, תיאור, אגף..."
        value={filters.search || ""}
        onChange={(e) => updateFilter("search", e.target.value)}
      />

      <CheckListDropdown
        label="אגף"
        allLabel="כל האגפים"
        options={filterOptions.agaff}
        selected={filters.agaff || []}
        onChange={(next) => updateFilter("agaff", next)}
      />

      <CheckListDropdown
        label="יחידה מבצעת"
        allLabel="כל היחידות"
        options={filterOptions.yechidaMevatzat}
        selected={filters.yechidaMevatzat || []}
        onChange={(next) => updateFilter("yechidaMevatzat", next)}
      />

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

      <CheckListDropdown
        label="פערים"
        allLabel="כל הפערים"
        options={filterOptions?.statusPearim || []}
        selected={filters.statusPearim || []}
        onChange={(next) => updateFilter("statusPearim", next)}
      />

      <button type="button" className="btn" onClick={clearFilters}>
        נקה הכל
      </button>
    </div>
  );
}