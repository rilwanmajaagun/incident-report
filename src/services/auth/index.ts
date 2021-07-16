/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */

import DB from 'src/db';
import { ClientDto } from '@src/dto/auth.dto';

class AuthService {
  registerClient(data: ClientDto, password: string): Promise<any[]> {
    const payloads = [data.first_name, data.last_name, data.email, password];
    return DB.transact('register', payloads, 'clientQuery');
  }

  getClient(data: ClientDto): Promise<any[]> {
    return DB.transact('getClientByEmail', [data.email], 'clientQuery');
  }
}
export default AuthService;
