import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {Student} from '@prisma/client'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
/**
 * retrieves all students from the db
 * @returns A promise that resolves to an array of student objects.
 */
    async findAllStudents(): Promise<Student[]> {
        return this.prisma.student.findMany()
    }
}
