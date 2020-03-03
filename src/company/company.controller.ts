import { Controller } from '@nestjs/common';
import { CompanyService } from './company.service';
// import { CreateCompanyDTO } from './dto/create-company.dto';
// import { Company } from './company.entity';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    // @Get()
    // getAllCompanies() {
    //   return this.companyService.getCompanies();
    // }

    // @Get('/:id')
    // getCompanyById(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    //   return this.companyService.getCompanyById(id);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createCompany(@Body() body: CreateCompanyDTO ): Promise<Company> {
    //   return this.companyService.createCompany(body);
    // }



    // @Delete('/:id')
    // deleteCompany(@Param('id') id: number): void {
    //   return this.deleteCompany(id);
    // }

}
