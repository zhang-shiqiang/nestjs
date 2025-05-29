import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { consoleTransports } from '../config/config.module';
import { WinstonModule } from 'nest-winston';
import createDailyRotateTransport from './createTotateTransPort';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('configService', configService.get('LOG_ON'));
        const logOn = configService.get('LOG_ON') === 'true';
        return {
          transports: [
            consoleTransports,
            ...(logOn
              ? [
                  createDailyRotateTransport('info', 'application'),
                  createDailyRotateTransport('warn', 'error'),
                ]
              : []),
          ],
        };
      },
    }),
  ],
})
export class LogsModule {}
