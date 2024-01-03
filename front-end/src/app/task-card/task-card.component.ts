import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/model/Task';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
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
      <button
        mat-raised-button
        color="primary"
        (click)="doneTask(task._id ?? '')"
      >
        Done
      </button>
      <button mat-button (click)="deleteTask(task._id ?? '')" class="btn">
        Delete
      </button>
    </mat-card-actions>
  </mat-card>`,
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() isDone!: boolean;
  @Output() doneEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  doneTask(taskId: string) {
    this.doneEvent.emit(taskId);
  }

  deleteTask(taskId: string) {
    this.deleteEvent.emit(taskId);
  }
}
