import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/model/Task';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    TaskCardComponent,
    CommonModule,
  ],
  template: `
    <div class="container dashboard">
      <form [formGroup]="applyForm" (submit)="submitTask()">
        <mat-form-field class="task-form-field">
          <mat-label>New Task</mat-label>
          <input matInput type="text" #task_title formControlName="title" />
        </mat-form-field>
        <mat-form-field class="task-form-field">
          <mat-label>Comment</mat-label>
          <textarea
            matInput
            type="text"
            #task_comment
            formControlName="comment"
          ></textarea>
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          class="add_btn"
          style="display: block; padding: 10px"
          type="submit"
        >
          Add Task
        </button>
      </form>
      <div class="row">
        <div class="col-sm-5 task-container" *ngIf="shouldShowTaskArray">
          <h3 style="color: #3f51b5; text-decoration: underline">Tasks:</h3>
          <app-task-card
            *ngFor="let task of taskArray"
            [task]="task"
            [isDone]="true"
            (doneEvent)="doneTask($event)"
            (deleteEvent)="deleteTask($event)"
          ></app-task-card>
        </div>
        <div class="col-1"></div>
        <div class="col-sm-5 done-container" *ngIf="!isDoneArrayEmpty">
          <h3 style="color: #3f51b5; text-decoration: underline">Done:</h3>
          <button
            mat-raised-button
            color="primary"
            (click)="clearDoneArray()"
            id="clear"
          >
            Clear
          </button>
          <app-task-card
            *ngFor="let task of doneArray"
            [task]="task"
            [isDone]="false"
          ></app-task-card>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  taskArray: Task[] = [];
  doneArray: Task[] = [];
  isDoneArrayEmpty = true;
  shouldShowTaskArray = false;

  applyForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    comment: new FormControl('', { nonNullable: true }),
  });

  constructor(
    private readonly taskService: TaskService,
    private snackBar: MatSnackBar
  ) {
    this.taskService.getTasks().subscribe((taskArrayList: Task[]) => {
      taskArrayList.forEach((task) => {
        if (task.isDone) {
          this.doneArray.push(task);
          this.isDoneArrayEmpty = false;
        } else this.taskArray.push(task);
      });
      this.shouldShowTaskArray = true;
    });
  }

  submitTask() {
    if (this.applyForm.value.title) {
      let newTask: Task = {
        title: this.applyForm.value.title,
        comment: this.applyForm.value.comment,
        isDone: false,
      };

      this.taskService.submitTask(newTask).subscribe((task) => {
        this.taskArray.push(task);
        this.applyForm.reset();
      });
    } else {
      this.snackBar.open("Task title can't be empty!", '', {
        duration: 2500,
      });
    }
  }

  doneTask(id: string) {
    this.isDoneArrayEmpty = false;
    this.taskArray.forEach((task) => {
      if (task._id === id) {
        this.taskService.doneTask(task._id).subscribe(() => {
          task.isDone = true;
          this.doneArray.push(task);
          this.taskArray.splice(this.taskArray.indexOf(task), 1);
        });
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      const deleteIndex = this.taskArray.findIndex((task) => task._id === id);
      if (deleteIndex !== -1) {
        this.taskArray.splice(deleteIndex, 1);
      }
    });
  }

  clearDoneArray() {
    this.taskService.deleteDoneTasks().subscribe(() => {
      this.doneArray = [];
      this.isDoneArrayEmpty = true;
    });
  }
}
