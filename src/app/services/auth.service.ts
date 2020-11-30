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
        get('user').then((userObj) => {
            this.currentUserSubject = new BehaviorSubject<User>(userObj);
            this.currentUser = this.currentUserSubject.asObservable();
        });
    }

    public get currentUserValue(): User {
        if(this.currentUserSubject) {
            console.log(this.currentUserSubject.value);
            return this.currentUserSubject.value;
        }
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, {username: username, password: password})
            .pipe(map(access_obj => {
                let userObject = JSON.parse(atob(access_obj.access_token.split('.')[1]));
                userObject.access_token = access_obj.access_token;
                set('user', userObject).then(() => {
                    this.currentUserSubject.next(userObject);
                    return userObject;
                });
            }));
    }

    registerDevice(deviceId: string): void {
        this.http.put<any>(`${environment.apiUrl}/device/${deviceId}`, {});
    }

    logout() {
        remove('token').then(() => this.currentUserSubject.next(null));
    }
}
