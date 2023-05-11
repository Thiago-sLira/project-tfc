class ErrorLaunch extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, ErrorLaunch.prototype);
  }
}

export default ErrorLaunch;
