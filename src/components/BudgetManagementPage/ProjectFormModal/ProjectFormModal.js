import React from "react";
import "./ProjectFormModal.css";

export default function ProjectFormModal({ open, onClose, initialData = {}, mode = "new" }) {
  if (!open) return null;

  return (
    <div className="pfm-backdrop" dir="rtl">
      <div className="pfm-modal">
        <header className="pfm-header">
          <h3>{mode === "edit" ? "עדכון פרויקט" : "פרויקט חדש"}</h3>
          <button onClick={onClose} aria-label="close">✕</button>
        </header>
        <div className="pfm-body">
          <p>טופס פרויקט — כאן ניתן לשים את הטופס המלא במימוש מלא. כרגע מדובר ברכיב placeholder.</p>
        </div>
        <footer className="pfm-footer">
          <button onClick={onClose}>סגור</button>
        </footer>
      </div>
    </div>
  );
}
