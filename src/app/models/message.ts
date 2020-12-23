import { User } from './user.model';

export class Message {
    id?: string;
    sender?: string;
    from_user?: User;
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
