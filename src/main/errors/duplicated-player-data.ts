export class DuplicatedPlayerError extends Error {
  constructor(field: string) {
    super(`Player already exists with current ${field}`);
    this.name = "DuplicatedPlayerError";
  }
}
