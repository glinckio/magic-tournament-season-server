import { HttpResponse } from "../../presentation/protocols/http";
import { DataNotFound } from "../errors/data-not-found";
import { DuplicatedCardError } from "../errors/duplicated-card-data";
import { DuplicatedPlayerError } from "../errors/duplicated-player-data";
import { DuplicatedTournamentError } from "../errors/duplicated-tournament-data";

export const duplicatedPlayer = (field: string): HttpResponse => ({
  statusCode: 409,
  body: new DuplicatedPlayerError(field),
});

export const duplicatedCard = (): HttpResponse => ({
  statusCode: 409,
  body: new DuplicatedCardError(),
});

export const duplicatedTournament = (): HttpResponse => ({
  statusCode: 409,
  body: new DuplicatedTournamentError(),
});

export const dataNotFound = (field: string): HttpResponse => ({
  statusCode: 409,
  body: new DataNotFound(field),
});
