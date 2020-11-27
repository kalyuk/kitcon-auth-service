import { Length } from 'class-validator';

export class SignInDTO {
    @Length(3, 120)
    username: string;

    @Length(3, 120)
    password: string;
}