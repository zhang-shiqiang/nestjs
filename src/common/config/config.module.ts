import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import { utilities } from 'nest-winston';
import { format } from 'winston';
import * as Joi from 'joi';
import { Console } from 'winston/lib/winston/transports';

const envFilePath = [`.env.${process.env.NODE_ENV || 'development'}`];
const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().ip(),
});

export const consoleTransports = new Console({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.ms(),
    utilities.format.nestLike('NEST_DEMO'),
  ),
});

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: schema,
    }),
  ],
})
export class ConfigModule {}
