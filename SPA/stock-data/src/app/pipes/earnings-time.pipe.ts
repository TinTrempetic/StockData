import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'earningsTime',
})
export class EarningsTimePipe implements PipeTransform {
  transform(value: string, args?: any): string {
    switch (value) {
      case 'bmo':
        return 'Before market open';
      case 'amc':
        return 'After market close';
      case 'dmh':
        return 'During market hours';
      default:
        return 'Unknown';
    }
  }
}
