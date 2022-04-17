import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService {
  success<T = any>(data: T) {
    return { c: 0, m: '', d: data };
  }
  error(msg: string | Error, code = -1) {
    if (typeof msg === 'string') return { c: code, m: msg, d: null };
    return { c: code, m: msg.message, d: null };
  }
}
