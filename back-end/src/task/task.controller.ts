import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDTO } from 'src/model/TaskDTO';
import { Task } from 'src/schemas/task.schema';
import { TaskService } from 'src/task/task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Post()
  async createTask(@Body() task: TaskDTO): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }

  @Delete()
  async deleteDoneTasks(): Promise<void> {
    return this.taskService.deleteDoneTasks();
  }

  @Put('/:id')
  async doneTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.doneTask(id);
  }
}
