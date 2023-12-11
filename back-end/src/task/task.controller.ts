import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Task } from 'src/schemas/task.schema';
import { TaskService } from 'src/task/task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll() {
    const tasks = await this.taskService.getAll();
    return tasks;
  }

  @Post()
  async createTask(@Body() task: Task) {
    const newTask = await this.taskService.createTask(task);
    return newTask;
  }
}
