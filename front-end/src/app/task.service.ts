import { jsDocComment } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Task } from 'src/model/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly url = 'http://localhost:3000/tasks';

  async getTasks(): Promise<Task[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  addTask(title: string, comment: string) {
    var parse_obj = JSON.parse(this.url);
    parse_obj['tasks'].push({ title: 'Task1', comment: 'task1comment' });
  }

  submitTask(title: string, comment: string) {
    /*var parse_obj = JSON.parse(this.url);
    parse_obj['tasks'].push({ title: 'teszt', comment: 'tesztcomm' });
    parse_obj = JSON.stringify(parse_obj);*/

    console.log(title + ', ' + comment);
  }
  constructor() {}
}
