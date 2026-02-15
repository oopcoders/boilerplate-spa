import { AbstractControl, ValidatorFn } from '@angular/forms';

export const passwordsMatchValidator = (
    passwordKey = 'password',
    confirmPasswordKey = 'confirmPassword'
): ValidatorFn => {
    return (group: AbstractControl) => {
        const passwordCtrl = group.get(passwordKey);
        const confirmCtrl = group.get(confirmPasswordKey);

        if (!passwordCtrl || !confirmCtrl) return null;

        const password = passwordCtrl.value ?? '';
        const confirm = confirmCtrl.value ?? '';

        // don't show mismatch until confirm has a value
        if (!confirm) {
            // remove mismatch error if it exists
            if (confirmCtrl.errors?.['passwordsMismatch']) {
                const { passwordsMismatch, ...rest } = confirmCtrl.errors;
                confirmCtrl.setErrors(Object.keys(rest).length ? rest : null);
            }
            return null;
        }

        if (password !== confirm) {
            const existing = confirmCtrl.errors ?? {};
            if (!existing['passwordsMismatch']) {
                confirmCtrl.setErrors({ ...existing, passwordsMismatch: true });
            }
        } else {
            if (confirmCtrl.errors?.['passwordsMismatch']) {
                const { passwordsMismatch, ...rest } = confirmCtrl.errors;
                confirmCtrl.setErrors(Object.keys(rest).length ? rest : null);
            }
        }

        return null; // keep group error-free; control holds the mismatch
    };
};
