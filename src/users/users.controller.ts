import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { CreateStudentDto, ReturnedStudentDto } from 'src/users/dto/students.dto';
import { Student } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('students')
  @ApiOperation({
    summary: 'Get all students',
    description: 'Returns a list of all students in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of students retrieved successfully.',
    type: [ReturnedStudentDto],
  })
  async findAllStudents(): Promise<Student[]> {
    return await this.usersService.findAllStudents();
  }

  @Get('students/find')
  @ApiOperation({
    summary: 'Finds students by ID',
    description: 'Returns a student that matches the provided ID.',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'The unique identifier of the student to find.',
    example: 'STUDENT_1',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Student found successfully.',
    type: ReturnedStudentDto,
  })
  @ApiNotFoundResponse({
    description: 'Student not found.',
  })
  async findStudentById(
    @Query('id') id: Student['studentId'],
  ): Promise<Student> {
    return await this.usersService.findStudentById({
      id: id,
    });
  }

  @Post('students')
  @ApiOperation({
    summary: 'Creates a new student',
    description: 'Creates a new student in the system.',
  })
  @ApiResponse({
    status: 201,
    description: 'Student created successfully.',
    type: ReturnedStudentDto,
  })
  @ApiConflictResponse({
    description: 'Student with this ID or email already exists.',
  })
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    return await this.usersService.createStudent(createStudentDto);
}
}
