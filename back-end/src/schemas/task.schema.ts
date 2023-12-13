import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  ObjectExpressionOperatorReturningObject,
  ObjectId,
} from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  comment: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
