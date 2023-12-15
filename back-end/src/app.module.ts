import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskModule } from './task/task.module';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    /*MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configSecret: ConfigService) => ({
        db_host: configSecret.get('db_host'),
        db_port: configSecret.get('db_port'),
        db_name: configSecret.get('db_name')

      })
    }),*/
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'todo',
    }),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    TaskModule,
  ],
  controllers: [],
  providers: [TaskService],
})
export class AppModule {}
