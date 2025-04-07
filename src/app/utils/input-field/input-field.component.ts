import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormInputFieldComponent } from './form-input-field/form-input-field.component';
import { GenericInputFieldComponent } from './generic-input-field/generic-input-field.component';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    GenericInputFieldComponent,
    FormInputFieldComponent,
  ],
})
export class InputFieldComponent {
  @Input() id: string = '';
  @Input() type: 'text' | 'number' = 'text';
  @Input() fieldName!: string;
  @Input() label!: string;
  @Input() maxLength!: string;
  @Input() inputValue!: string | number;
  @Input() disabled: boolean = false;
  @Output() isEmpty: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() inputValueChange: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();

  onTextTyped(text: string | number): void {
    this.inputValueChange.emit(text);
  }
}
