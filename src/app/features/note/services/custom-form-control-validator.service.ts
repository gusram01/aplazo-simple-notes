import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class CustomFormControlValidatorService {
  private notIncludesAtSymbolRegex = new RegExp(
    /^[\w\s\d-_¿?¡!.*{}=&%$·]*[^@][\w\d\s-_¿?¡!.*{}=&%$·]*$/g
  );

  titleIncludesAtValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      if (!value) {
        return null;
      }

      return value.match(this.notIncludesAtSymbolRegex)
        ? null
        : { includesAt: true };
    };
  }
}
