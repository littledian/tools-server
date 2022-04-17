import { Body, Controller, Post } from '@nestjs/common';

import { EncryptionService } from './encryption.service';
import { HttpService } from './http.service';

@Controller('/utils')
export class UtilsController {
  constructor(
    private httpService: HttpService,
    private encryptionService: EncryptionService
  ) {}

  @Post('/decrypt')
  async decrypt(@Body('data') data) {
    if (typeof data !== 'string')
      return this.httpService.error('请求参数不正确');
    try {
      return this.httpService.success(
        await this.encryptionService.decrypt(data)
      );
    } catch (e) {
      return this.httpService.error(e);
    }
  }

  @Post('/encrypt')
  async encrypt(@Body('data') data) {
    if (typeof data !== 'string')
      return this.httpService.error('请求参数不正确');
    try {
      return this.httpService.success(
        await this.encryptionService.encrypt(data)
      );
    } catch (e) {
      return this.httpService.error(e);
    }
  }
}
