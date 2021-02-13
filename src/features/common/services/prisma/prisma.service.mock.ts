export class PrismaServiceMock {
  user = {
    create: () => Promise.resolve(),
    update: () => Promise.resolve(),
  };

  node = {
    create: () => Promise.resolve(),
    update: () => Promise.resolve(),
  };
}
