import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { callAPIConstants } from 'src/app/shared/apiConstant';
import { CommonService } from 'src/app/shared/service/common.service';
import { SignupUser } from 'src/app/users/model/sign-up-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginUserForm: FormGroup;
  collectSignupData: Array<SignupUser>;
  hide = true;
  googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
  public callAPIConstants = callAPIConstants;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private commonService: CommonService
  ) {
    this.matIconRegistry.addSvgIcon("logo",
    this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL));
  }

  ngOnInit(): void {
    this.loginUserForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ],
      ],
      password: ['', Validators.required],
    });
    this.commonService.callApi(this.callAPIConstants.signUpURL, {}, 'get').then((response) => {
        this.collectSignupData = response;
      },
      (error) => {
        this.commonService.showSnackBar(error.message, 'OK');
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    const formValue = this.loginUserForm.value;
    const matchEmailAndPassword = this.collectSignupData.find(
      (item: any) =>
        formValue.email === item.email && formValue.password === item.password
    );
    if (matchEmailAndPassword) {
      const authToken: string = this.generateToken();
      const login_user: any = matchEmailAndPassword;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('login_user', JSON.stringify(login_user));
      this.route.navigateByUrl(`/users/list`);
      this.commonService.showSnackBar('Login successfully', 'OK');
    } else {
      this.commonService.showSnackBar('email or password is incorrect', 'OK');
    }
  }

  get form() {
    return this.loginUserForm.controls;
  }

  forgotPassword() {
    const formValue = this.loginUserForm.value;
    if (!formValue.email) {
      this.commonService.showSnackBar('Please enter email', 'OK');
    } else {
      const matchEmail = this.collectSignupData.find(
        (item: any) => formValue.email === item.email
      );
      if (matchEmail) {
        this.commonService.resetPasswordUser$.next(matchEmail as SignupUser);
        this.route.navigateByUrl(`/auth/forgot-password`);
      } else {
        this.commonService.showSnackBar('Enter valid Email', 'OK');
      }
    }
  }

  generateToken() {
    return Math.random().toString(36).substr(2);
  }

}
