import { Injectable, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Employee } from './employee.entity';
import { UpdateResult } from 'typeorm';
import { CreatePasswordDTO } from './dto/create-password.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(EmployeeRepository)
        private employeeRepository: EmployeeRepository,
        private jwtService : JwtService
        ) {}

    async getEmployees(): Promise<Employee[]> {
        return this.employeeRepository.getEmployees();
        }

    async getEmployeeById(employeeId: number): Promise<any> {
        const user = await this.employeeRepository.findOne(employeeId);

        if (!user) {
            throw new HttpException('No employee with the given id was found', HttpStatus.NOT_FOUND);
        }

        const userData = {
            email: user.email,
            phone : user.phone,
            firstname : user.firstname,
            lastname: user.lastname,
            address :user.address,
            jobTitle :user.jobTitle,
            department :user.department,
         };

        return userData;

    }    
         

    async addEmployee(createEmployeeDTO: CreateEmployeeDTO): Promise<void> {
        return this.employeeRepository.addEmployee(createEmployeeDTO);
    }

    async updateEmployee(id: number, createEmployeeDTO: CreateEmployeeDTO): Promise<UpdateResult> {
        return await this.employeeRepository.updateEmployee(id, createEmployeeDTO);
    }

    async getCompanyEmployees(companyId: number): Promise<Employee[]> {
        return this.employeeRepository.getCompanyEmployees(companyId);
      }

    async createPassword(id: number, createPasswordDTO: CreatePasswordDTO): Promise<any> {
        const result = await this.employeeRepository.updateUserPassword(id, createPasswordDTO);
        //  if (result.affected === 0){
        //      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        //  }

        return result;
    }  

    async changePassword(id: number, changePasswordDTO: ChangePasswordDTO): Promise<any> {
         const result = await this.employeeRepository.changePassword(id, changePasswordDTO);
        //  if (result.affected === 0){
        //      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        //  }

        return result;
    }  

    async login(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
       const employee = await this.employeeRepository.validateUserPassword(authCredentialsDto);

       if (!employee) {
           throw new UnauthorizedException('Invalid user credentials')
       }

       const payload: JwtPayload = employee;
       const accessToken = await this.jwtService.sign(payload);

       return {accessToken};
       // console.log(result);
    }

    async delete(id: number): Promise<any> {
        const result = await this.employeeRepository.delete(id);
         if (result.affected === 0){
             throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
         }

        return result;
    }
}
