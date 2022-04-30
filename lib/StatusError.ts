export default class StatusError extends Error {
  status!: number;

  constructor(message: string, public statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}
