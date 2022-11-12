export class UrlDomainInvalidException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UrlDomainInvalidException';
  }
}

export class UuidInvalidException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UuidInvalidException';
  }
}

export class CardInvalidException extends Error {
  constructor(message) {
    super(message);
    this.name = 'CardInvalidException';
  }
}

export class CardAlreadyExistsException extends Error {
  constructor(message) {
    super(message);
    this.name = 'CardAlreadyExistsException';
  }
}
