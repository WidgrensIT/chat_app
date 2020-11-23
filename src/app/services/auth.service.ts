import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { get, set, remove } from './storage.service';

import { User } from '../models/user.model';



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        let userObj = await get('currentUser');
        this.currentUserSubject = new BehaviorSubject<User>(userObj);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, {username: username, password: password})
            .pipe(map(user => {
                await set('currentUser', user);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    registerDevice(deviceId: string): void {
        this.http.put<any>(`${environment.apiUrl}/device/${deviceId}`, {});
    }

    logout() {
        await remove('currentUser');
        this.currentUserSubject.next(null);
    }
}
