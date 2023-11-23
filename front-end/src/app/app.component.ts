import { Component, inject } from '@angular/core';
import { Task } from 'src/model/Task';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
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
          (click)="task_title.value = ''"
          (click)="task_comment.value = ''"
          color="primary"
          class="add_btn"
          style="display: block; padding: 10px"
          type="submit"
        >
          Add Task
        </button>
      </form>
      <div class="row">
        <div class="col-sm-5 task-container" *ngIf="gotTaskArray">
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
        <div class="col-sm-5 done-container" *ngIf="!doneArrayEmpty">
          <h3 style="color: #3f51b5; text-decoration: underline">Done:</h3>
          <app-task-card
            *ngFor="let task of doneArray"
            [task]="task"
            [isDone]="false"
          ></app-task-card>
          <button
            mat-raised-button
            color="primary"
            (click)="doneClear()"
            id="clear"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  taskArray: Task[] = [];
  doneArray: Task[] = [];
  doneArrayEmpty = true;
  gotTaskArray = false;
  id = -1;

  applyForm = new FormGroup({
    title: new FormControl(''),
    comment: new FormControl(''),
  });

  submitTask() {
    let newTask = new Task(
      this.id++,
      this.applyForm.value.title ?? '',
      this.applyForm.value.comment ?? ''
    );
    this.taskService.submitTask(newTask);

    this.applyForm.reset();
  }

  doneTask(id: number) {
    this.doneArrayEmpty = false;

    this.taskArray.forEach((e) => {
      if (e.id === id) {
        this.doneArray.push(e);
        this.taskArray.splice(this.taskArray.indexOf(e), 1);
      }
    });
  }

  deleteTask(id: number) {
    this.taskArray.forEach((e) => {
      if (e.id === id) {
        this.taskArray.splice(this.taskArray.indexOf(e), 1);
      }
    });
  }

  constructor(private readonly taskService: TaskService) {
    this.taskService.getTasks().then((taskArrayList: Task[]) => {
      this.taskArray = taskArrayList;
      this.gotTaskArray = true;
    });
  }

  doneClear() {
    this.doneArray = [];
    this.doneArrayEmpty = true;
  }
}
