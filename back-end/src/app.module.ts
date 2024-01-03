import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskModule } from './task/task.module';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    ),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    TaskModule,
  ],
  controllers: [],
  providers: [TaskService],
})
export class AppModule {}
