export class User {
    id?: string;
    username: string;
    phone_number?: string;
    email?: string;
    avatar?: string;
    password: string;
    access_token?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
