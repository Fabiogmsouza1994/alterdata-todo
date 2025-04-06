import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormDropdownFieldComponent } from './components/form-dropdown-field/form-dropdown-field.component';
import { GenericDropdownFieldComponent } from './components/generic-dropdown-field/generic-dropdown-field.component';
import { FieldDropdownDefinitionModel } from './dropdown-field.model';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    GenericDropdownFieldComponent,
    FormDropdownFieldComponent,
  ],
})
export class DropdownFieldComponent<T> {
  @Input() id!: string;
  @Input() label!: string;
  @Input() dropdownItens!: FieldDropdownDefinitionModel<T>;
  @Input() fieldName!: string;
  @Input() dropdownValue!: T;
  @Input() disabled = false;
  @Output() dropdownValueChange: EventEmitter<T> = new EventEmitter<T>();

  formControlProp!: FormControl;
  validationText!: string;

  onDropdownChange(dropdownValue: T): void {
    this.dropdownValueChange.emit(dropdownValue);
  }

  defineValidationMsg(): boolean {
    if (
      this.formControlProp.errors?.['required'] &&
      !this.formControlProp.value
    ) {
      this.validationText = 'Campo obrigatório.';
      return true;
    }

    return false;
  }
}
