import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of} from 'rxjs';
import { SignupUser } from '../users/model/sign-up-user';
import { User } from '../users/model/user';
import { callAPIConstants } from './apiConstant';
import { CommonService } from './service/common.service';

@Injectable({ 
    providedIn: 'root' 
})

export class forgotPassword implements Resolve<User> {
    public callAPIConstants = callAPIConstants;
    collectSignupData: Array<SignupUser>;
    constructor(private commonService: CommonService) {}
    resolve(): Observable<User> | Promise<User> | User{
        return this.commonService.callApi(this.callAPIConstants.signUpURL, {}, 'get').then().catch((error => {
            return of('No data found');
        }))  
    }
}
