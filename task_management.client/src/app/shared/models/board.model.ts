import { Task } from './task.model';

export interface BoardColumn {
  id: string;
  name: string;
  wipLimit?: number;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  columns: BoardColumn[];
  createdAt?: string;
  updatedAt?: string;
}

export type BoardList = Board[]; 