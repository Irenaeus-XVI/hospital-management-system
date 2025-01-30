import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { message } from '../constants';

@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (ObjectId.isValid(value)) {
      if (String(new ObjectId(value)) === value) return value;
      throw new BadRequestException(message.MONGO_ID_VALIDATION_PIPE(metadata.data));
    }
    throw new BadRequestException(message.MONGO_ID_VALIDATION_PIPE(metadata.data));
  }
}
