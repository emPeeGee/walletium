import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchPasswords = (param: string, param2: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ isDifferent: true });
    } else {
      confirmPassword?.setErrors(null);
    }

    return null;
  };
};
