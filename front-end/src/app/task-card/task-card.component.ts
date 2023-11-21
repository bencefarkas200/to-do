import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../task.service';
import { Task } from 'src/model/Task';

@Component({
  selector: 'app-task-card',
  template: `<mat-card style="margin-block: 30px;">
    <mat-card-header>
      <mat-card-title>{{ task.title }}</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <p>
        {{ task.comment }}
      </p>
    </mat-card-content>
    <mat-card-actions *ngIf="isDone">
      <button mat-raised-button color="primary" (click)="doneTask(task.id)">
        Done
      </button>
      <button mat-button (click)="deleteTask(task.id)" class="btn">
        Delete
      </button>
    </mat-card-actions>
  </mat-card>`,
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() isDone!: boolean;
  @Output() doneEvent = new EventEmitter<number>();
  @Output() deleteEvent = new EventEmitter<number>();

  doneTask(taskId: number) {
    this.doneEvent.emit(taskId);
    this.isDone = true;
  }

  deleteTask(taskId: number) {
    this.deleteEvent.emit(taskId);
  }
}
