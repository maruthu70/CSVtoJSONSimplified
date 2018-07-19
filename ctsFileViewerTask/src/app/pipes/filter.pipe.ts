import { PipeTransform, Pipe } from '@angular/core';
@Pipe({ name: 'filterMinimulIssuePipe' })
export class filterPipe implements PipeTransform {
    transform(currentValue, value, minIssueCount): any {
        console.log('FilterPipeCalled' + currentValue, value, minIssueCount);
        return value['Issue count'] == minIssueCount;

    }
}