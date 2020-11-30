import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

    private currentObject: any;

    constructor() { }


    set(object: any): void {
        this.currentObject = object;
    }

    get(): any {
        let tmp = this.currentObject;
        this.currentObject = undefined;
        return tmp;
    }
}
