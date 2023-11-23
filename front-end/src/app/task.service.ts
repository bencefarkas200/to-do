import { Injectable } from '@angular/core';
import { Task } from 'src/model/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly url = 'http://localhost:3000/tasks';
  db: Task[] = [];

  async getTasks(): Promise<Task[]> {
    /*const data = await fetch(this.url);
    return (await data.json()) ?? []; TODO: HA LESZ BACKEND AKKOR EZT HASZNÁLJUK!*/
    return new Promise((resolve, reject) => {
      resolve(this.db);
    });
  }

  submitTask(id: number, title: string, comment: string) {
    if (title != '') {
      this.db.push({ id: id, title: title, comment: comment });
    } else alert("Title can't be empty!");
  }
  constructor() {}
}
