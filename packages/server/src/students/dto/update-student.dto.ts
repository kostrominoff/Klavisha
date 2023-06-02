import { IUpdateStudentDto } from '@klavisha/types';

export class UpdateStudentDto implements IUpdateStudentDto {
  groupId?: number;
  subgroup?: string;
}
