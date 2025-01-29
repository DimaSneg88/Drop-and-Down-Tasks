export enum Status {
  Block = "block",
  Todo = "todo",
  OnProgress = "onprogress",
  Done = "done",
}

export enum Priority {
  Low = "low",
  High = "high",
  Completed = "completed",
  InProgress = "inprogress",
}

export const statusTitle = {
  block: "Block",
  todo: "To Do",
  onprogress: "On Progress",
  done: "Done",
};

export const priorityTitle = {
  low: "Low",
  high: "High",
  completed: "Completed",
  inprogress: "In Progress",
};

export type Task = {
  id: number;
  name: string;
  discription: string;
  project: string;
  lead: string;
  deadline: string;
  status: Status;
  priority: Priority[];
};

export const dragTypes = {
  DEFAULT: "default",
};
