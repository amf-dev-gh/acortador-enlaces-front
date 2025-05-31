import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const urlValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) return null;

  const pattern = /^(http:\/\/|https:\/\/)[^\s$.?#].[^\s]*$/;
  return pattern.test(value) ? null : { invalidUrl: true };
};