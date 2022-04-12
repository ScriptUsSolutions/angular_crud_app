import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from '../shared/user.resolver';
import { ListUserComponent } from './list-user/list-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '', 
    component: UsersComponent,
    children: [
      {
        path: 'list',
        component: ListUserComponent
      },
      {
        path: 'new',
        component: NewUserComponent
      },
      {
        path: 'edit/:id',
        component: NewUserComponent,
        resolve: { user: UserResolver} 
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
     },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
