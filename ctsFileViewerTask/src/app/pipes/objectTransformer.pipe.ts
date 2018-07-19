import { PipeTransform, Pipe } from '@angular/core';
@Pipe({name: 'objectToArray'})
export class objectToArrayPipe implements PipeTransform {
  transform(currentValue, args:string[]) : any {
    let position = [];
    for (let latst in currentValue) {
        position.push(latst);
    }
    return position;
  }
}