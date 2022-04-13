import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { forgotPassword } from '../shared/forgot-password-resolver';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, resolve: { signUser: forgotPassword }},
  { path: 'signup', component: SignUpComponent },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    resolve: { signUser: forgotPassword },
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AuthRoutingModule { }
