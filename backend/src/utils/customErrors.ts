class CustomError extends Error {
  statusCode: number;
}

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

class ItemOutOfStockError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "ItemOutOfStock";
    this.statusCode = 400;
  }
}

export { BadRequestError, ItemOutOfStockError, NotFoundError };
