import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskModule } from './task/task.module';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (ConfigSecret: ConfigService) => ({
        uri: ConfigSecret.get('uri'),
      }),
    }),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    TaskModule,
  ],
  controllers: [],
  providers: [TaskService],
})
export class AppModule {}
