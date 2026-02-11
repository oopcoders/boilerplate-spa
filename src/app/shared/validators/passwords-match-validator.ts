import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordsMatchValidator = (
    passwordKey = 'password',
    confirmPasswordKey = 'confirmPassword'
): ValidatorFn => {
    return (group: AbstractControl): ValidationErrors | null => {
        const password = group.get(passwordKey)?.value ?? '';
        const confirmPassword = group.get(confirmPasswordKey)?.value ?? '';

        // Don’t show mismatch until both have a value
        if (!password || !confirmPassword) return null;

        return password === confirmPassword ? null : { passwordsMismatch: true };
    };
};
