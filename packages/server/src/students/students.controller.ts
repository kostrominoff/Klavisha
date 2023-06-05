import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Auth } from 'src/auth/guards/auth.guard';
import { GuardRoles, Roles } from '@klavisha/types';
import { NOT_FOUND } from 'src/errors/user.errors';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { InstitutionEntity } from 'src/institutions/entities/institution.entity';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { ApiCookieAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeacherEntity } from 'src/teachers/entities/teacher.entity';

@ApiCookieAuth()
@ApiTags('Студенты')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Пользователь не авторизован',
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Нет доступа',
})
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly institutionsService: InstitutionsService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'institutionId', example: 1, required: false })
  @ApiQuery({ name: 'groupId', example: 1, required: false })
  @Auth([GuardRoles.INSTITUTION_ADMIN, GuardRoles.ADMIN, GuardRoles.TEACHER])
  @Get()
  async findAll(
    @CurrentUser('role') role: Roles,
    @CurrentUser('institutions') institutions: InstitutionEntity[],
    @CurrentUser('id') userId: number,
    @CurrentUser('teacher') teacher: TeacherEntity,
    @Query('institutionId') institutionId?: number,
    @Query('groupId') groupId?: number,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ) {
    return await this.studentsService.findAll(
      { page, limit },
      {
        groupId,
        institutionId,
        institutionAdminId:
          role !== Roles.ADMIN && institutions.length && userId,
        teacherId: teacher.id,
      },
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN, GuardRoles.TEACHER])
  @Get(':id')
  async findOne(
    @CurrentUser('role') role: Roles,
    @CurrentUser('id') userId: number,
    @CurrentUser('institutions') institutions: InstitutionEntity[],
    @CurrentUser('teacher') teacher: TeacherEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    if (role !== Roles.ADMIN) {
      const student = await this.studentsService.findOne(id);
      if (!student) throw new NotFoundException(NOT_FOUND);

      // Institution admin
      if (institutions.length) {
        const institutionId = student.group.institution.id;
        await this.institutionsService.checkIsOwner(institutionId, userId);
      }

      // Teacher
      if (teacher) {
        const groupId = student.group.id;
        await this.studentsService.checkAccess(groupId, institutions);
      }
    }
    return await this.studentsService.findOne(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStudentDto,
    @CurrentUser('institutions') institutions: InstitutionEntity[],
    @CurrentUser('role') role: Roles,
  ) {
    if (role !== Roles.ADMIN) {
      const student = await this.studentsService.findOne(id);
      if (!student) throw new NotFoundException(NOT_FOUND);

      await this.studentsService.checkAccess(student.group.id, institutions);
    }

    return await this.studentsService.update(id, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('institutions') institutions: InstitutionEntity[],
    @CurrentUser('role') role: Roles,
  ) {
    if (role !== Roles.ADMIN) {
      const student = await this.studentsService.findOne(id);
      if (!student) throw new NotFoundException(NOT_FOUND);

      await this.studentsService.checkAccess(student.group.id, institutions);
    }
    return await this.studentsService.delete(id);
  }
}
