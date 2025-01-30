//swagger
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortOrder } from '../constants/sorting.constant';

export class FindAllQuery {
  @ApiPropertyOptional({
    description: 'Number of records to return',
    type: Number,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit = 10;

  @ApiPropertyOptional({
    description: 'Current page number',
    type: Number,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @ApiPropertyOptional({
    description: 'Number of records to skip',
    type: Number,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip = 0;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: ['createdAt', 'updatedAt'],
    default: 'createdAt',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sort = 'createdAt';

  @ApiPropertyOptional({
    description: 'Order of records to return',
    enum: SortOrder,
    default: SortOrder.DESCENDING,
    example: 'desc',
  })
  @IsOptional()
  @IsEnum(SortOrder)
  order = SortOrder.DESCENDING;

  @ApiPropertyOptional({
    description: 'Search string',
    type: String,
    example: 'search string',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Paginate results',
    type: Boolean,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  paginate = true;
}
