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
        get('token').then((userObj) => {
            this.currentUserSubject = new BehaviorSubject<User>(userObj);
            this.currentUser = this.currentUserSubject.asObservable();
        });
    }

    public get currentUserValue(): User {
        if(this.currentUserSubject)
            return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, {username: username, password: password})
            .pipe(map(access_obj => {
                set('token', access_obj.access_token).then(() => {
                    set('user', JSON.parse(atob(access_obj.access_token.split('.')[1]))).then(() => {
                        this.currentUserSubject.next(access_obj);
                        return access_obj;
                    });
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
