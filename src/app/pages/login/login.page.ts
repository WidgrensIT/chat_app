import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';



@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;
    returnUrl: string;
    error = '';

    loggedInBefore: boolean = false;


    user: User = new User({'username': 'burbas',
                           'password': 'test123',
                           'avatar': 'https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg'});

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        let returnUrl = this.route.snapshot.queryParams['returnUrlz'] || '/';
        this.returnUrl = returnUrl.split("?")[0];
        console.log(this.returnUrl);
    }

    onSubmit() {
        this.submitted = true;

        if(this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        let f = this.loginForm.controls;
        this.authService.login(f.username.value, f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }


    clearUser() {
        // Clear user
    }

    async presentToast(title, text, position) {

    }
}
