import { Student } from "../student.type";

export interface ICreateStudentDto
  extends Omit<Student, "id" | "createdAt" | "updatedAt"> {
  userId: number;
  groupId: number;
}
