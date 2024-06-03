import { Validation } from "../../../presentation/protocols/validation";
import { CpfValidatorAdapter } from "../../../utils/cpf-validator-adapter";
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter";
import { CpfValidation } from "../../../presentation/helpers/validators/cpf-validation";
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation";
import { RequiredFieldsValidation } from "../../../presentation/helpers/validators/required-fields-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";

export const makeUpdatePlayerValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["id", "name", "cpf", "email"]) {
    validations.push(new RequiredFieldsValidation(field));
  }
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  validations.push(new CpfValidation("cpf", new CpfValidatorAdapter()));

  return new ValidationComposite(validations);
};
