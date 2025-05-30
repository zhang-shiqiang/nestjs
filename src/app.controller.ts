import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(name: string): string {
    return `hello ${name}`;
  }
}
