export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string; // e.g., 'todo', 'in-progress', 'done'
  assignee?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate?: string;
  labels?: string[];
  subtasks?: Task[];
  attachments?: string[];
  comments?: Comment[];
  storyPoints?: number;
  createdAt?: string;
  updatedAt?: string;
} 