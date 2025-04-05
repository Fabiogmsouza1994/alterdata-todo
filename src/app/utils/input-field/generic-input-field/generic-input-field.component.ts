import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-input-field',
  templateUrl: './generic-input-field.component.html',
  imports: [FormsModule]
})
export class GenericInputFieldComponent {

  @Input() id!: string;
  @Input() label!: string;
  @Input() type!: string;
  @Input() inputValue!: string | number;
  @Input() disabled!: boolean;
  @Output() inputValueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

  onTextTyped(text: string): void {
    this.inputValue = text;
    this.inputValueChange.emit(this.inputValue);
  }


}
