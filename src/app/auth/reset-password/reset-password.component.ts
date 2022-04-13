import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  emailValue: string;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.blockUI.start();
    setTimeout(() => {
      this.blockUI.stop();
    }, 2000);
   this.commonService.resetPasswordUser$.subscribe(data => {
      this.emailValue = data.value;
    })
  }

}
