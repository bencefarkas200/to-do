import { Component } from '@angular/core';

class Task{
  title = '';
  comment = '';

  constructor(titl:string, comm:string){
    this.title = titl;
    this.comment = comm;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  taskArray:Task[] = [];
  
  addTask(title:string, comment:string){
    var temp = new Task(title, comment);
    this.taskArray.push(temp);
  }
}
