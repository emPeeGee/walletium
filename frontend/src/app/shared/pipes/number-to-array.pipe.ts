import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {
  transform(value: number): number[] {
    return new Array<number>(value);
  }
}
