import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.clientsService.create(req.user.userId, body);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.clientsService.findAll(req.user.userId);
  }
}