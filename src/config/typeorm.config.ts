import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'admin',
   password: 'admin@123',
   database: 'taskmanagement',
   entities: ['dist/**/*.entity{.ts,.js}'],
   migrationsTableName: 'migrations',
   migrations: ['migration/*.js'],
   cli: {
       'migrationsDir': 'migrations'
   },
   synchronize: true,
   logging: true,
}