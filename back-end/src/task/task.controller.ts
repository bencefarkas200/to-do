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
import { response } from 'express';
import { Task } from 'src/schemas/task.schema';
import { TaskService } from 'src/task/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(@Res() response) {
    const tasks = await this.taskService.getAll();
    return response.status(HttpStatus.OK).json({ tasks });
  }
}
