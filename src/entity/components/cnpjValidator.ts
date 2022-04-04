import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { CompanyInvoiceComponent as cic } from "./cnpjChecker";

@ValidatorConstraint({ name: "customValidatorCNPJ", async: false })
export class CustomCNPJchecker implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    const cnpj = new cic(text)
    return cnpj.testCNPJ();
  }

  defaultMessage(args: ValidationArguments) {
    return 'CNPJ deve ser válido e estar no formato XX.XXX.XXX/XXXX-XX';
  }
}