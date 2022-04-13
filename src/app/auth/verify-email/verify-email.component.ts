import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  verifyEmailForm: FormGroup;
  resetPasswordUser$ = new BehaviorSubject<any>(null);
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.blockUI.start();
    setTimeout(() => {
      this.blockUI.stop();
    }, 2000);
    this.verifyEmailForm = this.fb.group({
      emailVerify: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ]),
      ],
    });
  }

  get form() {
    return this.verifyEmailForm.controls;
  }

  verifyEmail() {
    if (this.verifyEmailForm.invalid) {
      return;
    }
    this.commonService.resetPasswordUser$.next(this.form['emailVerify']);
    this.route.navigateByUrl(`/auth/reset-password`);
  }
  
}
