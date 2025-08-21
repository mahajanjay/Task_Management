import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from '../../reusables/components/validation-error/validation-error.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/core/auth.service';
import { Register } from '../../shared/models/core/Register';
import { hasInvalidTouched, markAllAsTouched, resetForm } from '../../shared/utils/formsUtil';
import { alertError, alertSuccess } from '../../shared/utils/alert';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule,

    ValidationErrorComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;

  private authService = inject(AuthService); 
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword && confirmPassword.errors) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  onSubmit() {
    if(hasInvalidTouched(this.registerForm)) {
      markAllAsTouched(this.registerForm);
      return;
    }
    
    this.isSubmitting = true;
    
    const data: Register = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    this.authService.register(data).subscribe({
      next: (res: any) => {
        this.router.navigate(['/login']);
        resetForm(this.registerForm);
        this.isSubmitting = false;
      },
      error: (err: any) => {
        alertError('Registration Failed', err.error?.message || 'An error occurred during registration.');
        this.isSubmitting = false;
        // Handle error, show message to user
      },
      complete: () => {
        this.isSubmitting = false;
      }
    })
  }
}
