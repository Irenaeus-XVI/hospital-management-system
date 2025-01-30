import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  getHello2(){
    return {
      message: 'Hello World!',
      date: new Date(),

    }
  }

  @Post('hello')
  postHello(@Body() body){
    return {
      body,

    }
  }
}
