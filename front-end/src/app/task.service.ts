import { Injectable } from '@angular/core';
import { Task } from 'src/model/Task';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly url = 'http://127.0.0.1:3000/tasks';
  db: Task[] = [];

  constructor(private http: HttpClient) {}

  async getTasks(): Promise<any> {
    const data = this.http.get(this.url);
    const lastData = await lastValueFrom(data);
    return lastData;
  }

  submitTask(newTask: Task) {
    /*this.http.post(this.url, {
      id: newTask.id,
      title: newTask.title,
      comment: newTask.comment,
    });*/
    this.db.push({
      id: newTask.id,
      title: newTask.title,
      comment: newTask.comment,
    });
  }
}
