export interface Task {
  _id?: string;
  title: string;
  comment?: string | null;
  isDone: boolean;
}
