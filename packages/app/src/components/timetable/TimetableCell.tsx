import type { TimetableBlock } from '../../types/timetable';
import './TimetableCell.css';

interface TimetableCellProps {
  block: TimetableBlock;
  span: number;
  icon: { icon: string; color: string };
}

export default function TimetableCell({ block, span, icon }: TimetableCellProps) {
  return (
    <div
      className="timetable-cell"
      style={{
        gridRow: `span ${span}`,
        borderLeftColor: icon.color,
      }}
    >
      <div className="cell-content">
        <div className="cell-header">
          <span className="cell-icon" style={{ color: icon.color }}>
            {icon.icon}
          </span>
          <span className="cell-subject">{block.subject}</span>
        </div>
        {block.notes && (
          <div className="cell-notes">{block.notes}</div>
        )}
        {block.room && (
          <div className="cell-room">Room: {block.room}</div>
        )}
        <div className="cell-time">
          {block.startTime} - {block.endTime}
        </div>
      </div>
    </div>
  );
}

