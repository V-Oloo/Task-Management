import { Repository, EntityRepository, UpdateResult} from "typeorm";
import * as bcrypt from 'bcrypt';
import { Employee } from "./employee.entity";
import { CreateEmployeeDTO } from "./dto/create-employee.dto";
import { ConflictException, InternalServerErrorException, HttpException, HttpStatus } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { CreatePasswordDTO } from "./dto/create-password.dto";
import { ChangePasswordDTO } from "./dto/change-password.dto";


@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {

    async getEmployees(): Promise<Employee[]> {
        const query = this.createQueryBuilder('employee');

        const employee = await query.getMany();
        return employee;
    }

    async addEmployee(createEmployeeDTO: CreateEmployeeDTO): Promise<void> {
        const {phone, email, firstname, lastname, jobTitle, department, address } = createEmployeeDTO; 

            const employee = new Employee();
            employee.phone = phone;
            employee.email = email;
            employee.firstname = firstname;
            employee.lastname = lastname;
            employee.jobTitle = jobTitle;
            employee.department = department;
            employee.address = address;
            employee.createdBy = "Admin";
           

            try {
                await employee.save();
            } catch (error) {
                if (error.code === '23505'){
                    throw new ConflictException('email address already exist');
                }else {
                     throw new InternalServerErrorException();
                }
                
            }
        
    }

    async updateEmployee( id: number, createEmployeeDTO: CreateEmployeeDTO): Promise<UpdateResult> {
        return await this.update(id, createEmployeeDTO);
    }

    async getCompanyEmployees(companyId: number): Promise<Employee[]> {

        const employees = this.createQueryBuilder('employees')
              .where('employees.companyId = :companyId', { companyId : companyId })
              .getMany();
        return employees;      
    }



    async updateUserPassword (id: number, createPasswordDTO: CreatePasswordDTO): Promise<any> {
        const { password } = createPasswordDTO;

        const salt = await bcrypt.genSalt();
        const pass = await this.hashPassword(password,salt);

        const result = this.createQueryBuilder()
                           .update(Employee)
                           .set({password: pass, salt: salt, status: "ACTIVE"})
                           .where("id = :id", {id: id}).execute();
        
        return result;                   

    }

    async changePassword(id: number, changePasswordDTO: ChangePasswordDTO) {
        const { oldPassword, newPassword } = changePasswordDTO;

        const user = await this.findOne(id);

        if (user) {

            const oldSalt = user.salt;
            const inputPass = await this.hashPassword(oldPassword,oldSalt);

            const oldPass = user.password;

            if (inputPass === oldPass ){

                const salt = await bcrypt.genSalt();
                const pass = await this.hashPassword(newPassword,salt);

                const result = this.createQueryBuilder()
                               .update(Employee)
                               .set({password: pass, salt: salt})
                               .where("id = :id", {id: id}).execute();
    
                return result; 
            }

            throw new HttpException('old password do not match', HttpStatus.NOT_FOUND)
            

        } else {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        }
    }


    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const {email, password} = authCredentialsDto;

        const user = await this.findOne({email});


        if (user && await user.validatePassword(password)) {

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
        } else {
            return null;
        }

    }

    async delete(id: number): Promise<any> {
        const query = this.createQueryBuilder()
                      .delete().from(Employee)
                      .where("id = :id", { id: id })
                      .execute();
                     
        return query
    }


    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password,salt);
    }

}