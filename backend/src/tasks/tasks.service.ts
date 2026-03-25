import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: any) {
    // validar que el proyecto pertenece al usuario
    const project = await this.prisma.project.findFirst({
      where: {
        id: data.projectId,
        client: {
          userId,
        },
      },
    });

    if (!project) {
      throw new ForbiddenException('No puedes crear tareas en este proyecto');
    }

    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status ?? 'pending',
        dueDate: data.dueDate,
        projectId: data.projectId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        project: {
          client: {
            userId,
          },
        },
      },
      include: {
        project: true,
      },
    });
  }
}