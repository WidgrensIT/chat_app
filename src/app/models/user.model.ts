export class User {
    id?: string;
    username: string;
    phone_number?: string;
    email?: string;
    avatar?: string;
    password: string;
    token?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
