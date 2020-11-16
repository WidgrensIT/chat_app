export class User {
    username: string;
    password: string;
    avatar: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
