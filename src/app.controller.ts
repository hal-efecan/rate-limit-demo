import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @SkipThrottle()
  @Get('no-limit')
  getNoLimit(): string {
    return 'No rate limit here!';
  }

  @Throttle({ default: { limit: 1, ttl: 10000 } })
  @Get('custom-limit')
  customLimit(): string {
    return 'This has a custom limit applied!';
  }
}
