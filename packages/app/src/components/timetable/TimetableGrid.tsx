import { useMemo } from 'react';
import type { TimetableDoc, TimetableBlock } from '../../types/timetable';
import { TIME_SLOTS, DAYS_OF_WEEK, getBlockDuration } from '../../utils/timeUtils';
import { getSubjectIcon } from '../../utils/subjectIcons';
import TimetableCell from './TimetableCell';
import './TimetableGrid.css';

interface TimetableGridProps {
  timetable: TimetableDoc;
}

export default function TimetableGrid({ timetable }: TimetableGridProps) {
  const gridData = useMemo(() => {
    const grid: Map<string, TimetableBlock[]> = new Map();
    
    timetable.days.forEach((day) => {
      day.blocks.forEach((block) => {
        const key = `${day.day}-${block.startTime}`;
        if (!grid.has(key)) {
          grid.set(key, []);
        }
        grid.get(key)!.push(block);
      });
    });

    return grid;
  }, [timetable]);

  const getBlocksForSlot = (day: string, timeSlot: string): TimetableBlock[] => {
    return gridData.get(`${day}-${timeSlot}`) || [];
  };

  const getBlockSpan = (block: TimetableBlock): number => {
    const duration = getBlockDuration(block.startTime, block.endTime);
    const slotDuration = 30; // 30 minutes per slot
    return Math.max(1, Math.round(duration / slotDuration));
  };

  const isCommonBlock = (subject: string): boolean => {
    return [
      'Registration and Early Morning Work',
      'Tea Break',
      'Lunch',
      'Handwriting',
    ].includes(subject);
  };

  return (
    <div className="timetable-container">
      <div className="timetable-header">
        <div className="timetable-brand">
          <h1>BrainMo</h1>
        </div>
        <div className="timetable-meta">
          {timetable.weekLabel && (
            <div className="week-label">{timetable.weekLabel}</div>
          )}
          <button className="view-today-btn">View Today</button>
          <button className="save-btn">
            <span className="crown-icon">👑</span>
            Save! I'm Ready for Class!
          </button>
          <div className="user-profile">👤</div>
        </div>
      </div>

      <div className="timetable-grid">
        <div className="time-column">
          <div className="time-header"></div>
          {TIME_SLOTS.map((time) => (
            <div key={time} className="time-slot">
              {time}
            </div>
          ))}
        </div>

        {DAYS_OF_WEEK.map((day) => {
          const isToday = day === new Date().toLocaleDateString('en-US', { weekday: 'long' });

          return (
            <div key={day} className="day-column">
              <div className="day-header">
                <div className="day-number">
                  {new Date().getDate() + DAYS_OF_WEEK.indexOf(day)}
                </div>
                <div className="day-name">{day.slice(0, 3)}</div>
                {isToday && <div className="today-badge">Today</div>}
              </div>
              {TIME_SLOTS.map((timeSlot) => {
                const blocks = getBlocksForSlot(day, timeSlot);
                const commonBlocks = blocks.filter((b) => isCommonBlock(b.subject));
                const regularBlocks = blocks.filter((b) => !isCommonBlock(b.subject));

                return (
                  <div key={`${day}-${timeSlot}`} className="time-cell">
                    {commonBlocks.length > 0 && (
                      <div className="common-block">
                        {commonBlocks.map((block, idx) => {
                          const icon = getSubjectIcon(block.subject);
                          return (
                            <div key={idx} className="common-block-item" style={{ borderLeftColor: icon.color }}>
                              <span className="block-icon">{icon.icon}</span>
                              <span className="block-text">{block.subject}</span>
                              {block.notes && <span className="block-notes">{block.notes}</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {regularBlocks.map((block, idx) => {
                      const span = getBlockSpan(block);
                      const icon = getSubjectIcon(block.subject);
                      return (
                        <TimetableCell
                          key={idx}
                          block={block}
                          span={span}
                          icon={icon}
                        />
                      );
                    })}
                    {blocks.length === 0 && (
                      <div className="empty-slot">+</div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        <div className="side-column">
          <div className="side-header"></div>
          {TIME_SLOTS.map(() => (
            <div key={Math.random()} className="side-cell">
              <div className="trash-icon">🗑️</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

