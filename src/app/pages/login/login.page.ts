import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loggedInBefore: boolean = false;
    user: User = new User({'username': 'burbas',
                           'password': 'test123',
                           'avatar': 'https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg'});

    constructor(private authService: AuthService) {

    }

    ngOnInit() {
        this.authService.getObject('user').then(Object => {
            if(Object != null) {
                this.loggedInBefore = false;
            }
        });
    }


    clearUser() {
        this.authService.clear().then(() => {
            this.loggedInBefore = false;
            this.user = new User();
        });
    }

    async presentToast(title, text, position) {

    }
}
