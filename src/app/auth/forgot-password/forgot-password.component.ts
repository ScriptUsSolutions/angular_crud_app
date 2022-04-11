import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/mustMatch.validator';
import { SignupUser } from 'src/app/users/model/sign-up-user';
import { CommonService } from 'src/app/shared/service/common.service';
import { callAPIConstants } from 'src/app/shared/apiConstant';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  submitted = false;
  userResetPassword: SignupUser;
  hide = true;
  secrete = true;
  public callAPIConstants = callAPIConstants;

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router) {}

  ngOnInit(): void {
    this.commonService.resetPasswordUser$.subscribe(value => {
      if(value === null){
        this.router.navigate(['/auth/login']);
      }
      this.userResetPassword = value;
    });
    this.resetPasswordForm = this.fb.group({
      password: ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['',Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get form() {
    return this.resetPasswordForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const formValue = this.resetPasswordForm.value;
    const password:string = formValue.password;
    const confirmPassword:string = formValue.confirmPassword;
    if(this.userResetPassword.password === password){
      this.commonService.showSnackBar('Entered password is same as old password', 'OK');
      return;
    } 
    const updatedFormValue = {
      ...this.userResetPassword,
      password,
      confirmPassword
    }
    const UpdatePasswordId = this.userResetPassword.id;
    this.commonService.callApi(`${this.callAPIConstants.signUpURL}/${UpdatePasswordId}`, updatedFormValue, 'put').then((response) => {
      this.commonService.showSnackBar('Password reset successfully', 'OK'); 
    }, (error) => {
      this.commonService.showSnackBar(error.message, 'OK');
    })
  }

}
