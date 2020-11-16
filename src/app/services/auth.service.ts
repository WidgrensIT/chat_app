import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    async setObject(key: string, value: Object): Promise<void> {
        return await Storage.set({
            'key': key,
            'value': JSON.stringify(value)
        });
    }

    async getObject(key: string): Promise<Object | null> {
        const ret = await Storage.get({ 'key': key });
        if(ret == null) return null;
        return JSON.parse(ret.value);
    }


    async removeObject(key: string): Promise<void> {
        return await Storage.remove({ 'key': key });
    }

    async keys(): Promise< {'keys': string[]} > {
        return await Storage.keys();
    }

    async clear(): Promise<void> {
        await Storage.clear();
    }
}
