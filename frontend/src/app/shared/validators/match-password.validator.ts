import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchPasswords = (fieldOne: string, fieldTwo: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(fieldOne);
    const confirmPassword = control.get(fieldTwo);

    if (password?.value !== confirmPassword?.value) {
      return { isDifferent: true };
    }

    return null;
  };
};
