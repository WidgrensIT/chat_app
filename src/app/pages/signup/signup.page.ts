import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    userObj: User;

    constructor() { }

    ngOnInit() {
        this.userObj = new User();
    }

}
