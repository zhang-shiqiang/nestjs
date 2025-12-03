import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  // 导出 UserService 以便它能在本模块外部使用
  exports: [UserService],
})
export class UserModule {}
