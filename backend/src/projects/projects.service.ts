import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: any) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: data.clientId,
        userId,
      },
    });

    if (!client) {
      throw new ForbiddenException('No puedes crear proyectos para este cliente');
    }

    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        status: data.status ?? 'active',
        clientId: data.clientId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.project.findMany({
      where: {
        client: {
          userId,
        },
      },
      include: {
        client: true,
      },
    });
  }
}