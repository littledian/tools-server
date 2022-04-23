import {
  createHash,
  scryptSync,
  randomUUID,
  randomFillSync,
  createCipheriv,
  createDecipheriv
} from 'crypto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {
  private algorithm = 'aes-192-cbc';
  private key: Buffer;
  private iv: Uint8Array;
  private lastTimestamp = Date.now();

  async encrypt(s: string): Promise<string> {
    this.updateKeyAndIv();
    return new Promise((resolve, reject) => {
      const cipher = createCipheriv(this.algorithm, this.key, this.iv);
      let encrypted = '';
      cipher.setEncoding('hex');
      cipher.on('data', (chunk) => {
        encrypted += chunk;
      });
      cipher.on('end', () => {
        resolve(encrypted);
      });
      cipher.on('error', (e) => reject(e));

      cipher.write(s);
      cipher.end();
    });
  }

  async decrypt(s: string): Promise<string> {
    if (!this.verifyCipherText(s))
      return Promise.reject(new Error('格式不正确'));
    this.updateKeyAndIv();
    return new Promise((resolve, reject) => {
      const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
      decipher.setAutoPadding(false);
      let decrypted = '';
      decipher.on('readable', () => {
        let chunk = decipher.read();
        while (null !== chunk) {
          decrypted += chunk.toString('utf8');
          chunk = decipher.read();
        }
      });
      decipher.on('end', () => resolve(decrypted));
      decipher.on('error', (e) => reject(e));

      decipher.write(s, 'hex');
      decipher.end();
    });
  }

  md5(s: string) {
    const md5 = createHash('md5');
    md5.update(s);
    return md5.digest('hex').toUpperCase();
  }

  private updateKeyAndIv() {
    if (Date.now() - this.lastTimestamp < 24 * 60 * 60 * 1000 && this.key)
      return;
    const password = randomUUID();
    const salt = randomUUID();
    this.key = scryptSync(password, salt, 24);
    this.iv = randomFillSync(new Uint8Array(16));
    this.lastTimestamp = Date.now();
  }

  private verifyCipherText(s: string): boolean {
    return /^[0-9a-f]+/.test(s) && s.length % 32 === 0;
  }
}
