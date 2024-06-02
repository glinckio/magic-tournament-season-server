import { InvalidParamError } from "../../errors/invalid-param-error";
import { CpfValidator } from "../../protocols/cpf-validator";
import { Validation } from "../../protocols/validation";

export class CpfValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly cpfValidator: CpfValidator
  ) {}

  validate(input: any): Error {
    const isValid = this.cpfValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError("cpf");
    }
  }
}
