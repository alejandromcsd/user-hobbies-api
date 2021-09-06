import { DynamicModule, Module } from '@nestjs/common';
import { KnexModule, KnexModuleOptions } from 'nest-knexjs';
import knexfile from '../../knexfile';

@Module({})
export class DbModule {
  private static getConnectionOptions(): KnexModuleOptions {
    console.log(process.env.NODE_ENV);
    return {
      name: process.env.NODE_ENV || 'local',
      config: knexfile[process.env.NODE_ENV || 'local'],
      retryAttempts: 4,
      retryDelay: 20000,
    };
  }

  public static forRoot(): DynamicModule {
    return {
      module: DbModule,
      imports: [
        KnexModule.forRootAsync({
          useFactory: () => DbModule.getConnectionOptions(),
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
