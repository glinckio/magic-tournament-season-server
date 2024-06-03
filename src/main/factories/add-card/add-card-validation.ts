import { RequiredFieldsValidation } from "../../../presentation/helpers/validators/required-fields-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import { Validation } from "../../../presentation/protocols/validation";

export const makeAddCardValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["cardId", "name", "image", "colors", "deck"]) {
    validations.push(new RequiredFieldsValidation(field));
  }

  return new ValidationComposite(validations);
};
