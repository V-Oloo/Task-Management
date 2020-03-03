import { Controller, Post, Body, UsePipes, ValidationPipe, Get, ParseIntPipe, Param, Put, Delete, Patch } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
// import { GetCompanyId } from "./get-companyId.decorator";
// import { AuthGuard } from '@nestjs/passport';
import { Employee } from './employee.entity';
import { CreatePasswordDTO } from './dto/create-password.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';

@Controller('employees')
export class EmployeesController {
    constructor(private employeeService: EmployeesService) {}

    @Post('/addEmployee')
    // @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    addEmployee(
        @Body() createEmployeeDTO: CreateEmployeeDTO,
        // @GetCompanyId('companyId', ParseIntPipe) companyId: number
        ): Promise<void> {
        return this.employeeService.addEmployee(createEmployeeDTO)

    }

    @Patch('/:id/createPassword')
    @UsePipes(ValidationPipe)
    createPassword(@Param('id',  ParseIntPipe) id, @Body() createPasswordDTO: CreatePasswordDTO) {
       return this.employeeService.createPassword(id, createPasswordDTO)
    }

    @Get()
    // @UseGuards(AuthGuard())
    getEmployees(): Promise<Employee[]> {
        return this.employeeService.getEmployees()
    }

    @Get('/:id')
    getEmployee(@Param('id', ParseIntPipe) employeeId: number): Promise<Employee> {
        return this.employeeService.getEmployeeById(employeeId);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() createEmployeeDTO: CreateEmployeeDTO): Promise<any> {
        return this.employeeService.updateEmployee(id, createEmployeeDTO);
    }  


    @Post('/login')
    login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        return this.employeeService.login(authCredentialsDto)
    }

    @Patch('/:userId/changePassword')
    changePassword(@Param('userId',  ParseIntPipe) id, @Body() changePasswordDTO: ChangePasswordDTO) {
        return this.employeeService.changePassword(id, changePasswordDTO);
    }

    // @Patch('/:id/changePassword')
    // @UsePipes(ValidationPipe)
    // createPassword(@Param('id',  ParseIntPipe) id, @Body() createPasswordDTO: CreatePasswordDTO) {
    //    return this.employeeService.createPassword(id, createPasswordDTO)
    // }

    @Delete(':id/delete')
    async delete(@Param('id') id: number): Promise<any> {
      return this.employeeService.delete(id);
    }  

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetCompanyId('companyId', ParseIntPipe) companyId: number) {
    //    console.log(companyId);
    // }
}
