import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('account')
export class AccountModel {

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    salt: Buffer;

    @Column({ type: 'binary' })
    verifier: Buffer;

    @Column({ type: 'binary' })
    session_key_auth: Buffer;

    @Column({ type: 'binary' })
    totp_secret: Buffer;


    @Column()
    email: string;

    @Column()
    reg_mail: string;

    @Column()
    joindate: string;
    last_ip: string;
    last_attempt_ip: string;
    failed_logins: string;
    locked: string;
    lock_country: string;
    last_login: string;
    online: string;
    expansion: string;
    mutetime: string;
    mutereason: string;
    muteby: string;
    locale: string;
    os: string;
    recruiter: string;
}