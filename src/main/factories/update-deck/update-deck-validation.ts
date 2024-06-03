import { Validation } from "../../../presentation/protocols/validation";
import { RequiredFieldsValidation } from "../../../presentation/helpers/validators/required-fields-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";

export const makeUpdateDeckValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["id", "title", "player"]) {
    validations.push(new RequiredFieldsValidation(field));
  }
  return new ValidationComposite(validations);
};
