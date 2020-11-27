import 'reflect-metadata';
import './controllers';

import { confugure, resolve } from '@kitcon/core/annotations';
import { Bootstrap } from '@kitcon/node/annotations';
import { HttpService } from '@kitcon/node/services/http.service';
import { DatabusService } from '@kitcon/node/services/abstract/databus.service';
import { RedisDatabusService } from '@kitcon/node/services/redis-databus.service';
import { createConnection } from "typeorm";
import { AccountModel } from './models/account.model';


@Bootstrap
export class SeoBootstrap {

    @confugure
    private databusService(): DatabusService {
        return new RedisDatabusService('AUTH-SERVICE');
    }

    @resolve
    private readonly httpService: HttpService;

    async init() {
        this.databusService()
            .listen();
        this.httpService.listen();

        try {
            const connection = await createConnection({
                type: 'mysql',
                url: process.env.AUTH_DB_URL,
                entities: [AccountModel]
            });

        } catch (e) {
            console.log(e);
        }
    }
}
