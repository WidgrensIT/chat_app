export class Message {
    id?: string;
    sender?: string;
    timestamp?: string;
    payload?: any;
    chat_id: string;
    type?: string;
    action?: string;
    attachment?: File;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
