import { useState, useMemo } from 'react';
import { useTimetables } from '../../hooks/useTimetable';
import type { TimetableDoc } from '../../types/timetable';
import './TimetableSelector.css';

interface TimetableSelectorProps {
  onSelect: (timetable: TimetableDoc) => void;
  selectedId?: string;
}

export default function TimetableSelector({ onSelect, selectedId }: TimetableSelectorProps) {
  const [teacherIdFilter, setTeacherIdFilter] = useState<string>('');
  const { timetables, loading, error } = useTimetables(teacherIdFilter || undefined);

  const filteredTimetables = useMemo(() => {
    if (!teacherIdFilter) return timetables;
    return timetables.filter((t) =>
      t.teacherId.toLowerCase().includes(teacherIdFilter.toLowerCase())
    );
  }, [timetables, teacherIdFilter]);

  if (loading) {
    return <div className="selector-loading">Loading timetables...</div>;
  }

  if (error) {
    return <div className="selector-error">Error: {error}</div>;
  }

  return (
    <div className="timetable-selector">
      <div className="selector-header">
        <h2>Select Timetable</h2>
        <input
          type="text"
          placeholder="Filter by Teacher ID"
          value={teacherIdFilter}
          onChange={(e) => setTeacherIdFilter(e.target.value)}
          className="teacher-filter"
        />
      </div>
      <div className="timetable-list">
        {filteredTimetables.length === 0 ? (
          <div className="no-timetables">No timetables found</div>
        ) : (
          filteredTimetables.map((timetable) => (
            <div
              key={timetable._id}
              className={`timetable-item ${selectedId === timetable._id ? 'selected' : ''}`}
              onClick={() => onSelect(timetable)}
            >
              <div className="item-header">
                <span className="item-teacher">Teacher: {timetable.teacherId}</span>
                {timetable.weekLabel && (
                  <span className="item-week">{timetable.weekLabel}</span>
                )}
              </div>
              <div className="item-meta">
                <span>{timetable.days.length} days</span>
                <span>
                  {timetable.days.reduce((sum, day) => sum + day.blocks.length, 0)} blocks
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

