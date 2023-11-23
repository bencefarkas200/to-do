export class Task {
  id = -1;
  title = '';
  comment = '';

  constructor(id: number, title: string, comment: string) {
    this.title = title;
    this.comment = comment;
    this.id = id;
  }
}
