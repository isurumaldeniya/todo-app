class CustomErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const customErrorHandler = (message, statusCode) => {
  return new CustomErrorHandler(message, statusCode);
};

module.exports = { customErrorHandler, CustomErrorHandler };
