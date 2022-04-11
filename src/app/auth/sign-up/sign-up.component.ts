import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/mustMatch.validator';
import { SignupUser } from 'src/app/users/model/sign-up-user';
import { CommonService } from 'src/app/shared/service/common.service';
import { callAPIConstants } from 'src/app/shared/apiConstant';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupUserForm: FormGroup;
  signupData: SignupUser[];
  submitted = false;
  hide = true;
  secrete = true;
  public callAPIConstants = callAPIConstants;

  constructor(private fb: FormBuilder, private commonService: CommonService) {}

  ngOnInit(): void {
    this.signupUserForm = this.fb.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(4)]],
        lastname: ['', [Validators.required, Validators.minLength(4)]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  get form() {
    return this.signupUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupUserForm.invalid) {
      return;
    }
    const formValue = this.signupUserForm.value;
    this.commonService.callApi(this.callAPIConstants.signUpURL, {}, 'get').then((response) => {
      this.signupData = response;
      const matchEmail = this.signupData.find(
        (item: any) => item.email === formValue.email
      );
      if (matchEmail) {
        this.commonService.showSnackBar('Email already exist!', 'OK');
      } else {
        this.commonService.callApi(this.callAPIConstants.signUpURL, formValue, 'post').then((response) => {
          console.log("response",response)
          this.commonService.showSnackBar('Signup user successfully', 'OK');
        });
      }
    }, (error) => {
      this.commonService.showSnackBar(error.message, 'OK');
    });
  }



}
