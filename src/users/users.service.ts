import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Student } from '@prisma/client';
import { CreateStudentDto } from './dto/students.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllStudents(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }

  /**
   * Retrieves a student by their ID from the database.
   * @returns
   */
  async findStudentById({
    id,
  }: {
    id: Student['studentId'];
  }): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: {
        studentId: id,
      },
    });

    if (!student) {
      //use NotFoundException for proper HTT handling
      //@see @nest/common
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  /**
   * Creates a new student in the database.
   * @param createStudentDto - This will create Student Data.
   * @returns
   */

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const existingStudent = await this.prisma.student.findUnique({
      where: { studentId: createStudentDto.studentId },
    });

    if (existingStudent) {
      throw new ConflictException('Student with this ID already exists');
    }

    const existingEmail = await this.prisma.student.findFirst({
      where: { email: createStudentDto.email },
    });

    if (existingEmail) {
      throw new ConflictException('Student with this email already exists');
    }

    return this.prisma.student.create({
      data: createStudentDto,
    });
  }
}
