import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export const requiredIfValidator = (predicate: () => boolean): ValidationErrors | null => {
  return (target: AbstractControl | null) => {
    // I don't understand at all how it works, why target is getting right object

    if (!target?.parent) {
      return null;
    }

    if (predicate()) {
      return Validators.required(target);
    }

    return null;
  };
};
