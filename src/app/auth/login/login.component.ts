import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { callAPIConstants } from 'src/app/shared/apiConstant';
import { CommonService } from 'src/app/shared/service/common.service';
import { AdminRegister} from 'src/app/users/model/admin-register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  AdminLogin: FormGroup;
  collectAdminData: Array<AdminRegister>;
  hide = true;
  googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
  public callAPIConstants = callAPIConstants;
  @BlockUI() blockUI: NgBlockUI;

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
    this.blockUI.start();
    setTimeout(() => {
      this.blockUI.stop();
    }, 2000);
    this.AdminLogin = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ],
      ],
      password: ['', Validators.required],
    });
    this.commonService.callApi(this.callAPIConstants.AdminURL, {}, 'get').then((response) => {
        this.collectAdminData = response;
      },
      (error) => {
        this.commonService.showSnackBar(error.message, 'OK');
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    const formValue = this.AdminLogin.value;
    const matchEmailAndPassword = this.collectAdminData.find(
      (item: any) =>
        formValue.email === item.email && formValue.password === item.password
    );
    if (matchEmailAndPassword) {
      this.blockUI.start();
      setTimeout(() => {        
        const authToken: string = this.generateToken();
        const login_user: any = matchEmailAndPassword;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('login_user', JSON.stringify(login_user));
        this.route.navigateByUrl(`/users/list`);
        this.blockUI.stop();
        this.commonService.showSnackBar('Login successfully', 'OK');
      }, 2000);
    } else {
      this.blockUI.start();
      setTimeout(() => {
        this.commonService.showSnackBar('email or password is incorrect', 'OK');
        this.blockUI.stop( );
      }, 2000);
    }
  }

  get form() {
    return this.AdminLogin.controls;
  }

  forgotPassword() {
    this.route.navigateByUrl(`/auth/verify-email`);
  }

  generateToken() {
    return Math.random().toString(36).substr(2);
  }

}
