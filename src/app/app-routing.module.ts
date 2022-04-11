import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/auth.guard';
import { ContactUsComponent } from './shared/contact-us/contact-us.component';
import { GuestGuard } from './shared/guest.guard';

const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard]},
  { path: 'auth',  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [GuestGuard]},
  { path: 'contact-us', component: ContactUsComponent},
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, GuestGuard]
})
export class AppRoutingModule { }
