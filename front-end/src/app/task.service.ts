import { Injectable } from '@angular/core';
import { Task } from 'src/model/Task';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

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

  submitTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.url, newTask);
  }

  deleteTask(id: string): Observable<unknown> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

  doneTask(id: string): Observable<unknown> {
    const url = `${this.url}/${id}`;
    return this.http.put(url, '');
  }
}
