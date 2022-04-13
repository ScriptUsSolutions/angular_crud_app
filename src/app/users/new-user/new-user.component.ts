import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationPopupComponent } from 'src/app/shared/confirmation-popup/confirmation-popup.component';
import { User } from '../model/user';
import { MatDialog } from '@angular/material/dialog';
import { callAPIConstants } from 'src/app/shared/apiConstant';
import { CommonService } from 'src/app/shared/service/common.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserComponent implements OnInit {
  userDataForm: FormGroup;
  userId: number;
  userRecords: User;
  editButton = false;
  submitted = false;
  cityname = [
    'Surat',
    'Mumbai',
    'Chennai',
    'Ahmedabad',
    'Tamil Nadu',
    'Bangalore',
    'Hyderabad',
    'Delhi',
  ];
  cn = this.cityname;

  @BlockUI() blockUI: NgBlockUI;

  public callAPIConstants = callAPIConstants;
  asyncData: any;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.cityname.sort((a, b) => (a < b ? -1 : 1));
  }

  ngOnInit(): void {
    this.asyncData = this.route.data;
    console.log("this.asyncData",this.asyncData);
    this.userDataForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ]),
      ],
      address: this.fb.group({
        street: ['', Validators.required],
        suite: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('[0-9]{6}'),
          ]),
        ],
      }),
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}'),]],
      website: ['', Validators.required],
      companyName: ['', Validators.required],
    });
    this.editUserRecord();
  }

  get form() {
    return this.userDataForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const formValue = this.userDataForm.value;
    if (this.userDataForm.invalid) {
      return;
    }
    if (!this.userId) {
      this.blockUI.start();
      this.commonService.callApi(this.callAPIConstants.UsersURL, formValue, 'post').then((response) => {
          this.blockUI.stop();
          this.commonService.showSnackBar("User created SuccessFully", "OK");
          this.router.navigateByUrl(`users/list`);
          this.cdr.detectChanges();
        },
        (reason) => {
          this.commonService.showSnackBar(reason.message, "OK");
          this.blockUI.stop();
        }
      );
    } else {
      const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
        data: {
          message: 'Are you sure to edit this?',
          buttonText: {
            ok: 'Save',
            cancel: 'Cancel'
          }
        }
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if(confirmed) {
            this.blockUI.start();
            this.commonService.callApi(`${this.callAPIConstants.UsersURL}/${this.userId}`, formValue, 'put').then((response)=> {
                this.blockUI.stop();
                this.commonService.showSnackBar('User edited successfully', 'OK');
                this.router.navigateByUrl(`users/list`);
                this.cdr.detectChanges();
              },
              (error) => {
                this.commonService.showSnackBar(error.message, 'OK');
                this.blockUI.stop();
              }
            );
        }
      })
    }
  }
  editUserRecord() {
   this.route.data.subscribe((data) => {
      if(data && data['user']) {
        this.userId = data['user']['id'];
        this.editButton = true;
        this.userRecords = data['user'];
        this.userDataForm.patchValue({
          name: this.userRecords.name,
          username: this.userRecords.username,
          email: this.userRecords.email,
          address: {
            street: this.userRecords.address.street,
            suite: this.userRecords.address.suite,
            city: this.userRecords.address.city,
            zipcode: this.userRecords.address.zipcode,
          },
          phone: this.userRecords.phone,
          website: this.userRecords.website,
          companyName: this.userRecords.companyName,
        });
      }
    },
    (error)=> {
      console.log(error)
    });
  }

  keyCode(event: any) {
    if (event.which === 32) {
      event.preventDefault();
      return;
    }
  }

  keyNumber(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

}
