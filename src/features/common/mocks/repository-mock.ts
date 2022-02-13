import { Repository } from 'typeorm';

export function repositoryMockFactory<T>(): Repository<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return {
    update: jest.fn(),
    save: jest.fn(),
  };
}
