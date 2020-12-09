export class Chat {
    id: string;
    description: string;
    name: string;
    participants: any[] = [];
    type: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
