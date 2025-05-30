import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFillter } from './common/fillters/all-exception.fillter';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // 设置全局路由前缀
  const prefix = configService.get<string>('PREFIX', 'api');
  app.setGlobalPrefix(prefix);
  // 设置当前接口版本，如果设置1 那么访问时就是 prefix/v1/xxx
  const vesion = configService.get<string>('VERSION', '1');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [vesion],
  });
  // 设置跨域
  const cors = configService.get<boolean | string>('CORS', false);
  if (cors === 'true') {
    app.enableCors();
  }

  // 设置全局日志
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // 设置全局错误日志
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFillter(httpAdapter));
  // 设置端口
  const port = configService.get<number>('PORT', 3000);
  console.log('Application run port: ' + port);
  await app.listen(port);
}
bootstrap();
