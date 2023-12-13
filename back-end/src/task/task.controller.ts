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
import { TaskDTO } from 'src/model/TaskDTO';
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
  async createTask(@Body() task: TaskDTO) {
    const newTask = await this.taskService.createTask(task);
    console.log(newTask);
    return newTask;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const deleteTask = await this.taskService.deleteTask(id);
  }
}
