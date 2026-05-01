export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ElectionStep {
  title: string;
  description: string;
  status: 'upcoming' | 'current' | 'completed';
  icon: string;
}
