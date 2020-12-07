import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    userObj: User;
    submitForm: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;
    returnUrl: string;
    error = '';

    constructor(private userService: UserService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
        this.submitForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        let returnUrl = '/';
        console.log(returnUrl);
    }

    onSubmit() {
        this.submitted = true;
        if(this.submitForm.invalid) {
            return;
        }

        this.loading = true;
        let f = this.submitForm.controls;
        this.userService.signup(f.username.value, f.password.value, f.email.value, f.phoneNumber.value)
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


}
