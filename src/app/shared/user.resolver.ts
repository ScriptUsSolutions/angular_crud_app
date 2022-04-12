import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of} from 'rxjs';
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
