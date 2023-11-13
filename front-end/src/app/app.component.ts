import { Component, Input, inject } from '@angular/core';
import { Task } from 'src/model/Task';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './task-card/task-card.component';
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
        <div class="col-md-5 task-done-container">
          <h3 style="color: #3f51b5; text-decoration: underline">Tasks:</h3>
          <app-task-card *ngFor="let task of taskArray"></app-task-card>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-5 task-done-container">
          <h3 style="color: #3f51b5; text-decoration: underline">Done:</h3>
          <app-task-card></app-task-card>
          <button
            *ngIf="renderClearbtn"
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
  taskService = inject(TaskService);
  taskArray: Task[] = [];
  doneArray: Task[] = [];
  renderClearbtn = false;

  applyForm = new FormGroup({
    title: new FormControl(''),
    comment: new FormControl(''),
  });

  submitTask() {
    this.taskService.submitTask(
      this.applyForm.value.title ?? '',
      this.applyForm.value.comment ?? ''
    );
  }

  constructor() {
    this.taskService.getTasks().then((taskArrayList: Task[]) => {
      this.taskArray = taskArrayList;
    });
  }

  /* addTask(title: string, comment: string) {
    if (title != '') {
      this.taskService.addTask(title, comment);
    } else alert("Task can't be empty!");
  }

  taskDone(index: number) {
    this.doneArray.push(this.taskArray[index]);
    this.taskDelete(index);
    this.renderClearbtn = true;
  }

  taskDelete(index: number) {
    this.taskArray.splice(index, 1);
  }*/

  doneClear() {
    this.doneArray = [];
    this.renderClearbtn = false;
  }
}
