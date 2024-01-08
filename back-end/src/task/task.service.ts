import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDTO } from 'src/model/TaskDTO';
import { Task, TaskDocument } from 'src/schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async createTask(task: TaskDTO): Promise<Task> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async deleteTask(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }

  async doneTask(id: string): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, { isDone: true });
  }

  async deleteDone(): Promise<void> {
    this.taskModel.deleteMany({ isDone: true }).exec();
  }
}
