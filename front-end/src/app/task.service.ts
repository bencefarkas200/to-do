import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/model/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly url = 'http://127.0.0.1:3000/tasks';
  db: Task[] = [];

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    const data = this.http.get(this.url);
    //const lastData = lastValueFrom(data);
    return data;
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
