import { Component } from '@angular/core';
import { Task } from 'src/model/Task';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskService } from './task.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskCardComponent } from './task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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
            (click)="doneClear()"
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
  id = 0;

  applyForm = new FormGroup({
    title: new FormControl(''),
    comment: new FormControl(''),
  });

  constructor(
    private readonly taskService: TaskService,
    private snackBar: MatSnackBar
  ) {
    this.taskService.getTasks().then((taskArrayList: Task[]) => {
      /*taskArrayList.forEach((task)=>{
        if(task.isDone) this.
      })*/
      this.shouldShowTaskArray = true;
    });
  }

  submitTask() {
    if (this.applyForm.value.title != '') {
      let newTask: Task = {
        title: this.applyForm.value.title ?? '',
        comment: this.applyForm.value.comment ?? '',
        isDone: false,
      };

      this.taskService
        .submitTask(newTask)
        .subscribe((task) => this.taskArray.push(task));

      this.applyForm.reset();
      this.applyForm.value.title = '';
      this.applyForm.value.comment = '';
    } else {
      this.snackBar.open("Task title can't be empty!", '', {
        duration: 2500,
      });
    }
  }

  doneTask(id: string) {
    this.isDoneArrayEmpty = false;

    this.taskArray.forEach((e) => {
      if (e._id === id) {
        e.isDone = true;
        this.doneArray.push(e);
        this.taskArray.splice(this.taskArray.indexOf(e), 1);
      }
    });
  }

  deleteTask(id: string) {
    console.log(this.taskArray);
    console.log(id);
    this.taskArray.forEach((e) => {
      if (e._id === id) {
        this.taskArray.splice(this.taskArray.indexOf(e), 1);
        this.taskService.deleteTask(e._id).subscribe();
      }
    });
  }

  doneClear() {
    this.doneArray = [];
    this.isDoneArrayEmpty = true;
  }
}
