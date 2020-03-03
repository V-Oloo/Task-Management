import { JwtPayload } from './jwt-payload.interface';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './employee.entity';


@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
      constructor(
        @InjectRepository(EmployeeRepository)
        private employeeRepository: EmployeeRepository,
      ) {
          super({
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
              secretOrKey: 'topSecret#51',
          });
      }

      async validate(payload: JwtPayload): Promise<Employee> {
           const { email } = payload;
           const user = await this.employeeRepository.findOne({ email });

           if (!user) {
               throw new UnauthorizedException();
           }

           return user;
      }
}
