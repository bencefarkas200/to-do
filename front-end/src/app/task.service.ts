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

  submitTask(newTask: Task) {
    this.db.push({
      id: newTask.id,
      title: newTask.title,
      comment: newTask.comment,
    });
  }
  constructor() {}
}
