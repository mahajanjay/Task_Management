import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getValidatorErrorMessage } from '../../../shared/utils/validator';

@Component({
  selector: 'app-validation-error',
  imports: [CommonModule],
  templateUrl: './validation-error.component.html',
  styleUrl: './validation-error.component.scss'
})
export class ValidationErrorComponent {

  @Input() control!: AbstractControl;

  get errorMessages() {
    for(const validatorName in this.control?.errors) {
      if(this.control?.touched)
        return getValidatorErrorMessage(validatorName, this.control.errors[validatorName]);
    }
    return null;
  }

}
