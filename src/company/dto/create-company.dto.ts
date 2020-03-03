import {IsNotEmpty} from 'class-validator'
export class CreateCompanyDTO {

    @IsNotEmpty()
    companyName: string;

    @IsNotEmpty()
    mobileNo: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    password: string;

}