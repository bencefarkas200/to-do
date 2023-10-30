import { Component } from '@angular/core';

class Task {
  title = '';
  comment = '';

  constructor(titl: string, comm: string) {
    this.title = titl;
    this.comment = comm;
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  taskArray: Task[] = [];
  doneArray: Task[] = [];

  addTask(title: string, comment: string) {
    if (title != '') {
      var temp = new Task(title, comment);
      this.taskArray.push(temp);
    } else alert("Task can't be empty!");
  }

  taskDone(i: number) {
    this.doneArray.push(this.taskArray[i]);
    this.taskArray.splice(i, 1);
  }

  taskDelete(i: number) {
    this.taskArray.splice(i, 1);
  }

  doneClear() {
    this.doneArray = [];
  }
}
