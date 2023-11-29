import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:3000'),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
