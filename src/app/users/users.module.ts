import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUserComponent } from './new-user/new-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';


@NgModule({
  declarations: [
    UsersComponent,
    ListUserComponent,
    NewUserComponent,
    BalanceSheetComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    ListUserComponent
  ]
})
export class UsersModule { }
