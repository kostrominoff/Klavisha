import { Student } from "../student.type";

export interface IUpdateStudentDto
  extends Omit<Student, "id" | "createdAt" | "updatedAt"> {
  groupId?: number;
}
