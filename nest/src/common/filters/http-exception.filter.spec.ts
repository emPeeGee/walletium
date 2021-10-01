import { HttpExceptionFilter } from './http-exception.filter';

describe('ExceptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});
