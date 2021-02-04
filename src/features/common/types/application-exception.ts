export class ApplicationException extends Error {
  constructor(public readonly code, message: string) {
    super(message);
  }
}
