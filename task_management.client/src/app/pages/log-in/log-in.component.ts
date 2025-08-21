import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from '../../reusables/components/validation-error/validation-error.component';
import { Router, RouterModule } from '@angular/router';
import { hasInvalidTouched, markAllAsTouched, resetForm } from '../../shared/utils/formsUtil';
import { AuthService } from '../../services/core/auth.service';
import { alertError } from '../../shared/utils/alert';

@Component({
  selector: 'app-log-in',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule,

    ValidationErrorComponent,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  loginForm!: FormGroup;
  isSubmitting = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    this.declareForm();
  }

  declareForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if(hasInvalidTouched(this.loginForm)) {
      markAllAsTouched(this.loginForm);
      return;
    }

    this.isSubmitting = true;
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        console.log(res);
        resetForm(this.loginForm);
        this.isSubmitting = false;
      }, 
      error: (err: any) => {
        alertError('Login failed', err.error?.message || 'An error occurred during login.');
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
        this.router.navigate(['/']);
      }
    })

  }

}
