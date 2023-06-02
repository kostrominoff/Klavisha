import { ICreateStudentDto } from '@klavisha/types';

export class CreateStudentDto implements ICreateStudentDto {
  userId: number;
  groupId: number;
  subgroup?: string;
}
