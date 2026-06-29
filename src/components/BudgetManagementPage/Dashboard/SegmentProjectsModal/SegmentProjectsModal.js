import React, { useMemo, useState } from 'react';
import Modal from '../../Modal/Modal';
import './SegmentProjectsModal.css';
import { useProjects } from '../../../../services/context/ProjectsContext';
import Project from '../../ProjectsList/Project/Project';
import { MASLOL_LABELS } from '../../../../constants/maslol';

export default function SegmentProjectsModal({ title, initialProjects, onClose }) {
  const { projectFinanceMap } = useProjects();
  const [search, setSearch] = useState('');
  const [maslolFilter, setMaslolFilter] = useState('any');
  const [resourceFilter, setResourceFilter] = useState('any'); // 'hr' | 'proc' | 'any'
  const [continuationFilter, setContinuationFilter] = useState('any'); // 'any'|'continuation'|'new'

  const filtered = useMemo(() => {
    return initialProjects.filter(p => {
      if (search && !p.projectName?.toLowerCase().includes(search.toLowerCase())) return false;
      if (maslolFilter !== 'any' && (p.maslol || '') !== maslolFilter) return false;
      if (continuationFilter !== 'any') {
        const isCont = Boolean(p.logHemsheci);
        if (continuationFilter === 'continuation' && !isCont) return false;
        if (continuationFilter === 'new' && isCont) return false;
      }
      if (resourceFilter !== 'any') {
        const hr = (p.totalTakzuvCoachAdam || 0);
        const proc = (p.totalTakzivRechesh || 0);
        if (resourceFilter === 'hr' && hr <= proc) return false;
        if (resourceFilter === 'proc' && proc <= hr) return false;
      }
      return true;
    });
  }, [initialProjects, search, maslolFilter, resourceFilter, continuationFilter]);

  return (
    <Modal onClose={onClose} maxWidth={820}>
      <div className="spm-root" dir="rtl">
        <div className="spm-header">
          <h3>{title}</h3>
          <div className="spm-controls">
            <input className="spm-search" placeholder="חיפוש פרויקט" value={search} onChange={e => setSearch(e.target.value)} />

            <select className="spm-select" value={maslolFilter} onChange={e => setMaslolFilter(e.target.value)}>
              <option value="any">כל המסלולים</option>
              <option value="KIYUM">{MASLOL_LABELS.KIYUM}</option>
              <option value="HITAZMUT">{MASLOL_LABELS.HITAZMUT}</option>
            </select>

            <select className="spm-select" value={resourceFilter} onChange={e => setResourceFilter(e.target.value)}>
              <option value="any">כל המשאבים</option>
              <option value="hr">כ"א דומיננטי</option>
              <option value="proc">רכש דומיננטי</option>
            </select>

            <select className="spm-select" value={continuationFilter} onChange={e => setContinuationFilter(e.target.value)}>
              <option value="any">הכל</option>
              <option value="continuation">המשכיים</option>
              <option value="new">חדשים</option>
            </select>
          </div>
        </div>

        <div className="spm-body">
          <div className="spm-count">נמצאו {filtered.length} פרויקטים</div>
          <div className="spm-list">
            {filtered.map(p => (
              <div key={p.id} className="spm-row">
                <Project project={p} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </Modal>
  );
}
