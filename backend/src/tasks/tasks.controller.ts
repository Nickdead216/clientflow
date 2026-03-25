import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.tasksService.create(req.user.userId, body);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.tasksService.findAll(req.user.userId);
  }
} 