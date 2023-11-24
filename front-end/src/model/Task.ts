export class Task {
  id: number;
  title: string;
  comment: string;

  constructor(id: number, title: string, comment: string) {
    this.title = title;
    this.comment = comment;
    this.id = id;
  }
}
