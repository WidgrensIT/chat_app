export class Message {
    id?: string;
    sender?: string;
    timestamp?: string;
    payload?: any;
    chatId: string;
    msgType?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
