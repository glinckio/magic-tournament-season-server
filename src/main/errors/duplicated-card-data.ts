export class DuplicatedCardError extends Error {
  constructor() {
    super("Card already exists in current deck");
    this.name = "DuplicatedCardError";
  }
}
