export class NdefRecordsEmpty extends Error {
  constructor(message) {
    super(message);
    this.name = 'NdefRecordsEmpty';
  }
}

export class NdefRecordIsNotAnURL extends Error {
  constructor(message) {
    super(message);
    this.name = 'NdefRecordIsNotAnURL';
  }
}
