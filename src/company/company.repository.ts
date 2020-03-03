import { Repository, EntityRepository } from "typeorm";
import * as bycript from 'bcrypt';
import { Company } from "./company.entity";
// import { CreateCompanyDTO } from "./dto/create-company.dto";
// import { Employee } from "src/employees/employee.entity";
// import { EmployeeRoles } from "src/employees/employee-roles.enum";
// import { ConflictException } from "@nestjs/common";

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {

    // async getCompanies(): Promise<Company[]> {
    //     const query = this.createQueryBuilder('company');

    //     const companies = await query.getMany();
    //     return companies;
    // }

    

    // async createCompany(createCompanyDTO: CreateCompanyDTO): Promise<Company> {
    //     const {companyName, mobileNo, email, firstname, lastname, password  } = createCompanyDTO;

    //     const employeeRepository = getRepository(Employee);
    //     const user = await employeeRepository.findOne({phone, email});

    //     if(!user){

    //         const company = new Company();
    //     company.companyName = companyName;
    //     await company.save()
  
        
    //      const cId = company.Id;
  
    //     const employee = new Employee()
    //     employee.firstname = firstname;
    //     employee.lastname = lastname;
    //     employee.email = email;
    //     employee.mobileNo = mobileNo;
    //     employee.salt = await bycript.genSalt();
    //     employee.password = await this.hashPassword(password,employee.salt);
    //     employee.role = [EmployeeRoles.ADMIN,];
    //     employee.companyId = cId;
    //     await employee.save();

    //     return company;

    //     }else {
    //         throw new ConflictException('email address already exist');
    //     }
  
    // }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bycript.hash(password,salt);
    }


}