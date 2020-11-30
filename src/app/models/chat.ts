import { Participant } from './participant';

export class Chat {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
    participants?: Participant[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
