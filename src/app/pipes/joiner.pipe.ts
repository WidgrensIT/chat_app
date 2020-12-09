import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
    name: 'joiner'
})
export class JoinerPipe implements PipeTransform {

    transform(value: any[], sep = ', '): string {
        if(!value) return '';
        let partition = value.slice(0, 3).map((user: User) => {
            return user.username;
        });

        let others = (value.length - 3);

        if(others > 0) {
            let part_str = partition.join(sep);
            if(part_str.length > 20) {
                part_str = part_str.substr(0, 18) + '...';
            }
            return (part_str + ' and ' + (value.length - 3).toString() + ' others');
        } else if (value.length > 1) {
            return partition.join(sep);
        } else {
            return '';
        }
    }

}
