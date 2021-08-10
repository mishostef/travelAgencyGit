import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, maxlen: number = 38): string {
    if (value.length > maxlen) {
      const words = value.split('-')
      const startPoint = words[0];
      const endpoint = words.slice(-1)[0];
      return `${startPoint}-${endpoint}`;
    }
    return value;
  }

}
