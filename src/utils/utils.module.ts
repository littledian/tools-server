import { Module } from '@nestjs/common';

import { UtilsController } from './utils.controller';
import { HttpService } from './http.service';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [],
  controllers: [UtilsController],
  providers: [HttpService, EncryptionService]
})
export class UtilsModule {}
