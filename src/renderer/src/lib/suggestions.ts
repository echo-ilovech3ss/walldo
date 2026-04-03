export interface Suggestion {
  id: string
  text: string
  category: 'productivity' | 'wellness' | 'planning' | 'creative'
}

export const SUGGESTIONS: Suggestion[] = [
  // Productivity
  { id: '1', text: 'Review tomorrow\'s calendar', category: 'productivity' },
  { id: '2', text: 'Reply to pending emails', category: 'productivity' },
  { id: '3', text: 'Update project documentation', category: 'productivity' },
  { id: '4', text: 'Clean up desktop files', category: 'productivity' },
  { id: '5', text: 'Review and prioritize tasks', category: 'productivity' },

  // Wellness
  { id: '6', text: 'Take a 5-minute break', category: 'wellness' },
  { id: '7', text: 'Drink a glass of water', category: 'wellness' },
  { id: '8', text: 'Stretch for 2 minutes', category: 'wellness' },
  { id: '9', text: 'Step outside for fresh air', category: 'wellness' },

  // Planning
  { id: '10', text: 'Plan next week\'s goals', category: 'planning' },
  { id: '11', text: 'Review completed tasks', category: 'planning' },
  { id: '12', text: 'Update task priorities', category: 'planning' },

  // Creative
  { id: '13', text: 'Sketch a new idea', category: 'creative' },
  { id: '14', text: 'Read for 10 minutes', category: 'creative' },
  { id: '15', text: 'Brainstorm project ideas', category: 'creative' },
]

export const CATEGORY_LABELS: Record<Suggestion['category'], string> = {
  productivity: 'Productivity',
  wellness: 'Wellness',
  planning: 'Planning',
  creative: 'Creative',
}
