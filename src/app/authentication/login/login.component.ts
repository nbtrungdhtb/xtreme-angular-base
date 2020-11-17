import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/control-message/validation.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        .login-container {
            background:url(../../../assets/images/background/bg-login.jpg) no-repeat center center;
            background-size: cover;
        }
        .btn-login {
            background: -webkit-linear-gradient(right, #00dbde, #fc00ff);
            border: none;
            border-radius: 30px;
            transition: all 0.4s;
        }
        .btn-login:hover {
            -webkit-box-shadow: 0 5px 30px 0 rgba(3, 216, 222, 0.2);
        }
    `]
})
export class LoginComponent {
    errorMessage: string = null;
    isLoading = false;

    loginForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService
    ) {
        this.route.queryParams
            .subscribe(params => {
                if (params.code && params.code !== '') {
                    this.authenticationService.setJwtToken(params.code);
                    window.location.href = window.location.pathname;
                } else {
                    if (this.authenticationService.getAuthorizationToken()) {
                        this.router.navigate(['/']).then();
                    }
                }
            });
        this.createForm();
    }

    createForm(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, ValidationService.passwordValidator]],
            remember: [true, Validators.required]
        });
    }

    login = () => {
        if (!this.isLoading) {
            if (this.loginForm.dirty && this.loginForm.valid) {
                this.isLoading = true;
                const payload = {
                    username: this.loginForm.value.username,
                    password: this.loginForm.value.password
                };
                this.authenticationService.login(payload).subscribe(
                    (response) => {
                    this.isLoading = false;
                    if (response.success) {
                        this.authenticationService.setJwtToken(response.token);
                        window.location.reload();
                    } else {
                        this.errorMessage = 'Thông tin tài khoản hoặc mật khẩu không chính xác';
                    }
                },
                    () => {
                        this.isLoading = false;
                        alert('Có lỗi bất ngờ xảy ra');
                    }
                );
            } else {
                this.errorMessage = 'Bạn cần điền đầy đủ thông tin';
            }
        }
    }
}
