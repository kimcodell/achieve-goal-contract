export class ErrorWithCode extends Error {
  constructor(
    public code: string,
    public message: string,
    public options?: {
      status?: number;
      payload?: any;
    }
  ) {
    super(message);
  }
}
