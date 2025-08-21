import { AbstractControl, FormGroup, FormArray, ValidationErrors } from '@angular/forms';

/**
 * Marks all controls in a form group or form array as touched
 */
export function markAllAsTouched(control: AbstractControl): void {
    if (control instanceof FormGroup || control instanceof FormArray) {
        Object.values(control.controls).forEach(ctrl => markAllAsTouched(ctrl));
    }
    control.markAsTouched({ onlySelf: true });
}

/**
 * Checks if the form or any nested control is invalid and touched
 */
export function hasInvalidTouched(control: AbstractControl): boolean {
    if (control.invalid && control.touched) {
        return true;
    }
    if (control instanceof FormGroup || control instanceof FormArray) {
        return Object.values(control.controls).some(ctrl => hasInvalidTouched(ctrl));
    }
    return false;
}

/**
 * Gets all validation errors in a form group or form array
 */
export function getFormValidationErrors(
    control: AbstractControl,
    path: string = ''
): { path: string, errors: ValidationErrors }[] {
    let errors: { path: string, errors: ValidationErrors }[] = [];
    if (control.errors) {
        errors.push({ path, errors: control.errors });
    }
    if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(key => {
            errors = errors.concat(getFormValidationErrors(control.controls[key], path ? `${path}.${key}` : key));
        });
    } else if (control instanceof FormArray) {
        control.controls.forEach((ctrl, idx) => {
            errors = errors.concat(getFormValidationErrors(ctrl, `${path}[${idx}]`));
        });
    }
    return errors;
}

/**
 * Resets all controls in a form group or form array
 */
export function resetForm(control: AbstractControl): void {
    control.reset();
    if (control instanceof FormGroup || control instanceof FormArray) {
        Object.values(control.controls).forEach(ctrl => resetForm(ctrl));
    }
}