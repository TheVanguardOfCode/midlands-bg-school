// global.d.ts
import { FetchMock } from 'jest-fetch-mock';

declare global {
  namespace NodeJS {
    interface Global {
      fetch: FetchMock;
    }
  }
}

export {};
