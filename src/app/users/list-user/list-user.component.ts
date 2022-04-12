import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationPopupComponent } from 'src/app/shared/confirmation-popup/confirmation-popup.component';
import { User } from '../model/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { callAPIConstants } from 'src/app/shared/apiConstant';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUserComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'id',
    'name',
    'username',
    'email',
    'street',
    'suite',
    'city',
    'zipcode',
    'phone',
    'website',
    'companyName',
    'actions',
  ];
  userRecords: User[] = [];
  closeResult: string;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public callAPIConstants = callAPIConstants;
  
  constructor(
    private commonService: CommonService,
    private route: Router,
    private cdr: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsersData(){
    this.blockUI.start();
    this.commonService.callApi(this.callAPIConstants.UsersURL, {}, 'get').then((response) => {
      this.blockUI.stop();
      this.userRecords = response;
      this.dataSource.data = response;
      this.cdr.detectChanges();
    }, (reason) => {
      this.blockUI.stop();
      this.commonService.showSnackBar(reason.message, "Done");
    });
    this.cdr.detectChanges();
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: {
        message: 'Are you sure to delete this?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel',
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.blockUI.start();
        this.commonService.callApi(`${this.callAPIConstants.UsersURL}/${id}`, {}, 'delete').then(
          (response) => {
            this.blockUI.stop();
            this.commonService.showSnackBar("User Deleted Successfully", "Done");
            this.dataSource.data = this.userRecords.filter(
              (item: any) => item.id !== id
            );
            this.cdr.detectChanges();
          },
          (reason) => {
            this.commonService.showSnackBar(reason.message, "Done");
            this.blockUI.stop();
          });
          this.cdr.detectChanges();
      }
    });
  }

  trackUser(index: number, userRecords: User) {
    return userRecords.id;
  }

  editUser(id: number) {
    this.route.navigateByUrl(`/users/edit/${id}`);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  addNew() {
    this.router.navigateByUrl(`users/new`);
  }

  navigateLogout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth/login']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


