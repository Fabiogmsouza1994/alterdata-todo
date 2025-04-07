import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-input-field',
  templateUrl: './form-input-field.component.html',
  styleUrls: ['./form-input-field.component.scss'],
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class FormInputFieldComponent implements OnInit {
  @Input() id!: string;
  @Input() type!: 'text' | 'number';
  @Input() fieldName!: string;
  @Input() label!: string;
  @Input() maxLength!: string;

  formControl!: FormControl;
  isFocused!: boolean;
  validationText!: string;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    if (this.controlContainer && this.fieldName) {
      const formGroup: FormGroup = this.controlContainer.control as FormGroup;
      this.formControl = formGroup.get(this.fieldName) as FormControl;
    }
  }

  defineValidationMsg(): boolean {
    if (this.formControl.errors?.['required'] && !this.isFocused) {
      this.validationText = 'Campo obrigatório.';
      return true;
    } else if (this.formControl?.hasError('minlength')) {
      this.validationText = `Insira ao menos ${this.formControl.errors?.['minlength'].requiredLength} caracteres.`;
      return true;
    }
    return false;
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}

