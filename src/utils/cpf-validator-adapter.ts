import { CpfValidator } from "../presentation/protocols/cpf-validator";
import { cpf } from "cpf-cnpj-validator";

export class CpfValidatorAdapter implements CpfValidator {
  isValid(value: string): boolean {
    return cpf.isValid(value);
  }
}
