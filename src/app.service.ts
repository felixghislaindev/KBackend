import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  hello(): string {
    return 'Hello World!';
  }
  gello(): string {
    return 'gello World!';
  }
}
