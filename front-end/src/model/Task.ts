export class Task {
  id = 0;
  title = '';
  comment = '';

  constructor(title: string, comment: string) {
    this.title = title;
    this.comment = comment;
    this.id = 0;
  }
}
