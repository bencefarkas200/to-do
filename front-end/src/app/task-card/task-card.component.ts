import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../task.service';
import { Task } from 'src/model/Task';

@Component({
  selector: 'app-task-card',
  template: `<mat-card style="margin-block: 30px">
    <mat-card-header>
      <mat-card-title>{{ task.title }}</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <p>
        {{ task.comment }}
      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-raised-button color="primary">Done</button>
      <button mat-button>Delete</button>
    </mat-card-actions>
  </mat-card>`,
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task!: Task;
}
