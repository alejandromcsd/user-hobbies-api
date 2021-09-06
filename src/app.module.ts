import { Module } from '@nestjs/common';
import { DomainModule } from './app/module/entity.module';

@Module({
  imports: [DomainModule],
})
export class AppModule {}
