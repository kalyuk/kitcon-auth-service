import { Controller, endpoint, value } from '@kitcon/node/annotations';
import { resolve } from '../../../kitcon-core/src/annotations';
import { SignInDTO } from '../dto/sign-in.dto';
import { AccountService } from '../services/account.service';


@Controller()
export class AuthController {

    @resolve
    private readonly accountService: AccountService;

    @endpoint("POST /api/auth")
    async auth(@value('body') signInDTO: SignInDTO) {
        return await this.accountService.auth(signInDTO);
    }
}