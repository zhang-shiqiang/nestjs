import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFillter } from './common/fillters/all-exception.fillter';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const cors = configService.get<boolean | string>('CORS', false);
  const prefix = configService.get<string>('PREFIX', 'api');
  const vesion = configService.get<string>('VERSION', '1');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [vesion],
  });
  app.setGlobalPrefix(prefix);

  if (cors === 'true') {
    app.enableCors();
  }

  // 设置全局日志
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // 设置全局错误日志
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFillter(httpAdapter));

  console.log('Application run port: ' + port);
  await app.listen(port);
}
bootstrap();
