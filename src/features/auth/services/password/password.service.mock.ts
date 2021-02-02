export class PasswordServiceMock {
  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  hashPassword(password: string): Promise<string> {
    return Promise.resolve('hashed');
  }
}
