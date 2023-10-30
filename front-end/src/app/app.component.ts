import { Component, Input } from '@angular/core';

class Task {
  title = '';
  comment = '';

  constructor(title: string, comment: string) {
    this.title = title;
    this.comment = comment;
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
  renderClearbtn = false;

  addTask(title: string, comment: string) {
    if (title != '') {
      var temp = new Task(title, comment);
      this.taskArray.push(temp);
    } else alert("Task can't be empty!");
  }

  taskDone(index: number) {
    this.doneArray.push(this.taskArray[index]);
    this.taskDelete(index);
    this.renderClearbtn = true;
  }

  taskDelete(index: number) {
    this.taskArray.splice(index, 1);
  }

  doneClear() {
    this.doneArray = [];
    this.renderClearbtn = false;
  }
}
