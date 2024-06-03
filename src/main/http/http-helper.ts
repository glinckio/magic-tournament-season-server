import { HttpResponse } from "../../presentation/protocols/http";
import { DuplicatedCardError } from "../errors/duplicated-card-data";
import { DuplicatedPlayerError } from "../errors/duplicated-player-data copy";

export const duplicatedData = (field: string): HttpResponse => ({
  statusCode: 409,
  body: new DuplicatedPlayerError(field),
});

export const duplicatedCard = (): HttpResponse => ({
  statusCode: 409,
  body: new DuplicatedCardError(),
});
