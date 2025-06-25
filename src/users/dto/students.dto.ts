import { ApiProperty } from '@nestjs/swagger';
import { Student, $Enums } from '@prisma/client';

export class ReturnedStudentDto implements Partial<Student> {
  @ApiProperty({
    description: 'Unique identifier for the student',
    example: '12345',
  })
  studentId: string;

  @ApiProperty({
    description: 'Department the student belongs to',
    example: 'Computer Science',
  })
  department: string;

  @ApiProperty({
    description: 'Student email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Student first name',
    example: 'John',
  })
  name: string;

  @ApiProperty({
    description: 'Role of the student',
    enum: $Enums.Role,
    example: $Enums.Role.STUDENT,
  })
  role: $Enums.Role;
}

export class CreateStudentDto {
  @ApiProperty({
    description: 'Unique identifier for the student',
    example: 'AdDU2202',
  })
  studentId: string;

  @ApiProperty({
    description: 'Department the student belongs to',
    example: 'Criminology',
  })
  department: string;

  @ApiProperty({
    description: 'Student email address',
    example: 'abacus@addu.edu.ph',
  })
  email: string;

  @ApiProperty({
    description: 'Student\'s Full Name',
    example: 'Ainel Bacus'
  })
  name: string;
}
