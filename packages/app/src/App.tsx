import { useState } from 'react';
import TimetableSelector from './components/timetable/TimetableSelector';
import TimetableGrid from './components/timetable/TimetableGrid';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage';
import { useTimetable } from './hooks/useTimetable';
import type { TimetableDoc } from './types/timetable';
import './App.css';

function App() {
  const [selectedTimetableId, setSelectedTimetableId] = useState<string | undefined>();
  const { timetable, loading, error } = useTimetable(selectedTimetableId);

  const handleTimetableSelect = (timetable: TimetableDoc) => {
    setSelectedTimetableId(timetable._id);
  };

  return (
    <div className="app">
      <TimetableSelector
        onSelect={handleTimetableSelect}
        selectedId={selectedTimetableId}
      />
      
      {selectedTimetableId && (
        <div className="timetable-view">
          {loading && <LoadingSpinner />}
          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => setSelectedTimetableId(selectedTimetableId)}
            />
          )}
          {timetable && !loading && !error && (
            <TimetableGrid timetable={timetable} />
          )}
        </div>
      )}

      {!selectedTimetableId && (
        <div className="welcome-message">
          <h2>Welcome to LearningYogi Timetable</h2>
          <p>Select a timetable from the list above to view it</p>
        </div>
      )}
    </div>
  );
}

export default App;

