export class DataNotFound extends Error {
  constructor(data: string) {
    super(`${data} not found`);
    this.name = "DataNotFound";
  }
}
