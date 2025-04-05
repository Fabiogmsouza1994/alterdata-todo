import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToText'
})
export class BooleanToTextPipe implements PipeTransform {
  transform(value: boolean, trueText: string = 'Sim', falseText: string = 'Não'): string {
    return value ? trueText : falseText;
  }
}