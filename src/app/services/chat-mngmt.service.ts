import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatMngmtService {

    constructor(private http: HttpClient) { }

    public getChats() {
        return this.http.get<any>(`${environment.apiUrlClient}/chat`);
    }
}
