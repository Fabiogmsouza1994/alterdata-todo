import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BooleanToTextPipe } from '../../../../pipes/boolean-to-text.pipe';
import { FieldDropdownDefinitionModel } from '../../dropdown-field.model';

@Component({
  selector: 'app-form-dropdown-field',
  templateUrl: './form-dropdown-field.component.html',
  styleUrls: ['./form-dropdown-field.component.scss'],
  imports: [
    BooleanToTextPipe,
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class FormDropdownFieldComponent<T> implements OnInit {
  @Input() id!: string;
  @Input() label!: string;
  @Input() disabled!: boolean;
  @Input() dropdownItens!: FieldDropdownDefinitionModel<T>;
  @Input() fieldName!: string;
  @Output() selectedValue: EventEmitter<T> = new EventEmitter<T>();

  formControl!: FormControl;
  isFormControlValueInvalid!: boolean;
  validationText!: string;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.manageFormControl();
  }

  manageFormControl(): void {
    if (
      this.controlContainer &&
      this.fieldName &&
      this.dropdownItens?.dropdownList.length
    ) {
      const formGroup: FormGroup = this.controlContainer.control as FormGroup;
      this.formControl = formGroup.get(this.fieldName) as FormControl;
    }

    const value: T = this.formControl.value;

    this.isFormControlValueInvalid =
      value === null || value === undefined || value === '';
  }

  defineValidationMsg(): boolean {
    const value: T = this.formControl.value;

    if (
      this.formControl.errors?.['required'] && this.isFormControlValueInvalid
    ) {
      this.validationText = 'Campo obrigatório.';
      return true;
    }

    return false;
  }
}
