export class NdefRecordsEmptyException extends Error {
  constructor(message) {
    super(message);
    this.name = 'NdefRecordsEmptyException';
  }
}

export class NdefRecordIsNotAnURLException extends Error {
  constructor(message) {
    super(message);
    this.name = 'NdefRecordIsNotAnURLException';
  }
}
