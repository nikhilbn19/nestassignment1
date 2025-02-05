import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';



@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('get-user')
  getHello(): string {
    return this.appService.getHello();
  }
}


