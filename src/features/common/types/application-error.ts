export class ApplicationError extends Error {
  constructor(private readonly code, message: string) {
    super(message);
  }
}
