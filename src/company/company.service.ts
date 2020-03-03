import { Injectable } from '@nestjs/common';
// import { CreateCompanyDTO } from './dto/create-company.dto';
import { CompanyRepository } from './company.repository';
import { InjectRepository } from '@nestjs/typeorm';
//import { Company } from './company.entity';

@Injectable()
export class CompanyService {

    constructor( @InjectRepository(CompanyRepository) private companyRepository: CompanyRepository) {}

    // async getCompanies(): Promise<Company[]> {
    //    return this.companyRepository.getCompanies();
    // }

    // async createCompany(createCompanyDto: CreateCompanyDTO): Promise<Company> {
    //   return this.companyRepository.createCompany(createCompanyDto);
    // }

    // async getCompanyById(id: number): Promise<Company> {
    //   const found = await this.companyRepository.findOne(id);

    //   if (!found) {
    //           throw new NotFoundException('Company not found');
    //       }
    
    //       return found
    // }



    // deleteCompany(id: number): void{
    //    const found = this.getCompanyById(id)
    //    this.companies = this.companies.filter(company => company.id !== found.id);
    // }
}
