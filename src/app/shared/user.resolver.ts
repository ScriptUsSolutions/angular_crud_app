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

export class UserResolver implements Resolve<User> {
    userID: number;
    public callAPIConstants = callAPIConstants;
    constructor(private commonService: CommonService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<User> | Promise<User> | User{
        return this.commonService.callApi(`${this.callAPIConstants.UsersURL}/${route.params['id']}`,{},'get').then().catch((error => {
            return of({})
        }))
      
    }
}

// export class passwordResolver implements Resolve<SignupUser> {
//     public callAPIConstants = callAPIConstants;
//     collectSignupData: Array<SignupUser>;
//     constructor(private commonService: CommonService) {}
//     resolve(): Observable<SignupUser> | Promise<SignupUser> | SignupUser{
//         return this.commonService.callApi(this.callAPIConstants.signUpURL, {}, 'get').then().catch((error => {
//             return of({})
//         }))  
//     }
// }

// return this.commonService.callApi(`${this.callAPIConstants.UsersURL}/${route.params['id']}`,{},'get').pipe(
//     catchError(() => {
//         return of({});
// })
// ).then() as Observable<any>