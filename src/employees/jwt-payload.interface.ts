export interface JwtPayload {
    email: string;
    mobileNo: string,
    firstname: string,
    lastname: string,
    role: string[],
    companyId: number
}