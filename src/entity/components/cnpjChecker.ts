export class CompanyInvoiceComponent {
  cnpj: any;
  strCNPJ: string;

  constructor(entry: string) {
    this.cnpj = entry
  }

  testCNPJ(): boolean {
    if (this.cnpj === undefined) {
      return false;
    }

    var strCNPJ = this.cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '');

    if (strCNPJ === '00000000000000' || strCNPJ === '11111111111111' || strCNPJ === '22222222222222' || strCNPJ === '33333333333333' ||
      strCNPJ === '44444444444444' || strCNPJ === '55555555555555' || strCNPJ === '66666666666666' || strCNPJ === '77777777777777' ||
      strCNPJ === '88888888888888' || strCNPJ === '99999999999999' || strCNPJ.length !== 14) {
      return false;
    }

    var size = strCNPJ.length - 2;
    var numbers = strCNPJ.substring(0, size);
    var digits = strCNPJ.substring(size);
    var sum = 0;
    var pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    var result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(0)) {
      return false;
    }

    size = size + 1;
    numbers = strCNPJ.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let k = size; k >= 1; k--) {
      sum += numbers.charAt(size - k) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (result != digits.charAt(1)) {
      return false;
    }
    return true;
  }
}