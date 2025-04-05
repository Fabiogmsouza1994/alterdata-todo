import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BooleanToTextPipe } from '../../../../pipes/boolean-to-text.pipe';
import { FieldDropdownDefinitionModel } from '../../dropdown-field.model';

@Component({
  selector: 'app-generic-dropdown-field',
  templateUrl: './generic-dropdown-field.component.html',
  imports: [CommonModule, FormsModule, BooleanToTextPipe],
})
export class GenericDropdownFieldComponent<T> {
  @Input() id!: string;
  @Input() label!: string;
  @Input() dropdownItens!: FieldDropdownDefinitionModel<T>;
  @Input() dropdownValue!: T;
  @Output() dropdownValueChange: EventEmitter<T> = new EventEmitter<T>();

  onOptionSelected(): void {
    this.dropdownValueChange.emit(this.dropdownValue);
  }

  allValuesAreBoolean(): boolean {
    return (
      this.dropdownItens?.dropdownList.every(
        (item) => (item as { label: keyof T; value: boolean }).value === true
      ) ?? false
    );
  }
}
