import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule, 
    EmployeesModule, 
    AuthModule, 
    CompanyModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
