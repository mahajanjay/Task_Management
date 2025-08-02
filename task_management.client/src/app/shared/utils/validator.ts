import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const getValidatorErrorMessage = (validatorName: string, validatorErrors?: ValidationErrors): string | undefined => {
    let args = messages.get(validatorName)?.validtorErrorsKey?.map(name => validatorErrors?.[name]);
    return (args) ? stringFormat(messages.get(validatorName)?.message, ...args) : messages.get(validatorName)?.message;
}

const messages = new Map<string, { message: string, validtorErrorsKey?: string[] }>([
    ['required', { message: 'This field is required' }],
    ['email', { message: 'Email should be like example@domain.com' }],
    ['passwordMismatch', { message: 'Password should match.' }],
    ['minlength', { message: 'Field must be atleast {0} characters long', validtorErrorsKey: ['requiredLength'] }],
]);

function stringFormat(template: string | undefined, ...args: any[]) {
    if(template) {
        return template.replace(/{(\d+)}/g, (match, index) => {
            return typeof args[index] !== 'undefined'
            ? args[index]
            : match 
        });
    }
    return undefined;
}

/****************************Validator functions********************************/

export const REGEX = {
    ALLOW_ALPHA_NUMERIC: /^[a-zA-Z0-9_-]*$/
}

export function pattern(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valid = regex.test(control.value);
        return valid ? null : { invalidCharacter: { valid: control.value } };
    };
}