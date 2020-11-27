import { Injectable, resolve } from '@kitcon/core/annotations';
import { AccountModel } from '../models/account.model';
import { getRepository } from "typeorm";
import { DatabusService } from '@kitcon/node/services/abstract/databus.service';
import { JwtService } from '@kitcon/node/services/jwt.service';
import { SignInDTO } from '../dto/sign-in.dto';
import { Exception } from '@kitcon/core/exception';

@Injectable
export class AccountService {

    @resolve
    private readonly databusService: DatabusService;

    @resolve
    private readonly jwtService: JwtService;

    get accountRepository() {
        return getRepository(AccountModel);
    }

    async auth(signInDTO: SignInDTO) {

        const account = await this.accountRepository.findOne({ where: { username: signInDTO.username } });

        if (!account) {
            throw new Exception('Username or password inccorect', 403);
        }

        const response = await this.databusService.send('PHP-HELPER-SERVICE', 'auth', {
            username: account.username,
            password: signInDTO.password,
            salt: account.salt.toString('hex'),
            verifier: account.verifier.toString('hex'),
        });

        if (response.status !== 200) {
            throw new Exception('Username or password inccorect', 403);
        }

        return {
            accessToken: this.jwtService.createToken({ userId: account.id }, 30 * 60),
            refreshToken: this.jwtService.createToken({ userId: account.id, type: 'refresh' }, '1h')
        }




    }
}