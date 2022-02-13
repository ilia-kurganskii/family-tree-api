import { MongoError } from 'typeorm';

export function isMongoErrorWithCode(e: Error, code: number): boolean {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isCodeEqual = e.code === code;
  return isCodeEqual;
}
