import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/model/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly url = 'http://127.0.0.1:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    const data = this.http.get<Task[]>(this.url);
    return data;
  }

  submitTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.url, newTask);
  }

  deleteTask(id: string): Observable<Task> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Task>(url);
  }

  doneTask(id: string): Observable<Task> {
    const url = `${this.url}/${id}`;
    return this.http.put<Task>(url, '');
  }

  deleteDoneTasks(): Observable<Task> {
    return this.http.delete<Task>(this.url);
  }
}
