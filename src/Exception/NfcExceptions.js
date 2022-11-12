export class NfcDisabledException extends Error {
  constructor(message) {
    super(message);
    this.name = 'NfcDisabledException';
  }
}

export class NfcNotSupportedException extends Error {
  constructor(message) {
    super(message);
    this.name = 'NfcNotSupportedException';
  }
}
