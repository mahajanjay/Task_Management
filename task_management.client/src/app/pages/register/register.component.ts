import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from '../../reusables/components/validation-error/validation-error.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/core/auth.service';
import { Register } from '../../shared/models/core/Register';

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
    if(this.registerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }
    
    this.isSubmitting = true;
    console.log('Register form submitted:', this.registerForm.value);
    
    const data: Register = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    this.authService.register(data).subscribe({
      next: (res: any) => {
        console.log('Registration successful:', res);
        // Navigate to login or home page after successful registration
      },
      error: (err: any) => {
        console.error('Registration failed:', err);
        this.isSubmitting = false;
        // Handle error, show message to user
      },
      complete: () => {
        this.isSubmitting = false;
      }
    })
  }

  markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      if (field.errors?.['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors?.['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors?.['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${requiredLength} characters`;
      }
      if (field.errors?.['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }
    return '';
  }
}
