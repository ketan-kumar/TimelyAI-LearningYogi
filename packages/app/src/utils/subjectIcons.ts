export const SUBJECT_ICONS: Record<string, { icon: string; color: string }> = {
  'RWI': { icon: '✏️', color: '#FF9500' },
  'Maths': { icon: '#', color: '#9B59B6' },
  'English': { icon: '📖', color: '#FF9500' },
  'Science': { icon: '⚛️', color: '#FFD700' },
  'PE': { icon: '🏃', color: '#2ECC71' },
  'Music': { icon: '🎵', color: '#2ECC71' },
  'Art': { icon: '🎨', color: '#2ECC71' },
  'Computing': { icon: '⚙️', color: '#FFD700' },
  'History': { icon: '🏛️', color: '#8B4513' },
  'RE': { icon: '❤️', color: '#2ECC71' },
  'PHSE': { icon: '🌿', color: '#2ECC71' },
  'Assembly': { icon: '📢', color: '#3498DB' },
  'Class Assembly': { icon: '📢', color: '#3498DB' },
  'Singing Assembly': { icon: '📢', color: '#3498DB' },
  'Celebration Assembly': { icon: '🏆', color: '#3498DB' },
  'Handwriting': { icon: '✍️', color: '#95A5A6' },
  'Lunch': { icon: '🍽️', color: '#E67E22' },
  'Tea Break': { icon: '☕', color: '#E67E22' },
  'Registration and Early Morning Work': { icon: '📝', color: '#95A5A6' },
  'Catch Up': { icon: '⏰', color: '#3498DB' },
  'Times Tables Rockstar': { icon: '#', color: '#9B59B6' },
  'Maths Meet': { icon: '#', color: '#9B59B6' },
  'RWI & Comp': { icon: '✏️', color: '#FF9500' },
  'English Comprehension': { icon: '📖', color: '#FF9500' },
};

export function getSubjectIcon(subject: string): { icon: string; color: string } {
  return SUBJECT_ICONS[subject] || { icon: '📚', color: '#7F8C8D' };
}

