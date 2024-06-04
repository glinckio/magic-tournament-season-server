export class DuplicatedTournamentError extends Error {
  constructor() {
    super(`Tournament already exists`);
    this.name = "DuplicatedTournamentError";
  }
}
