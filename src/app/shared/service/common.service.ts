import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  resetPasswordUser$ = new BehaviorSubject<any>(null);
  apiURL: string = `${environment.apiUrl}`;
  
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  callApi(url:string, data:any, method:string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (method === 'post') {
        this.http.post(this.apiURL + url, data).subscribe((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
      } else if (method === 'get') {
        this.http.get(this.apiURL + url, data.hasOwnProperty('params') ? data : { params: data }).subscribe((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
      } else if (method === 'put') {
        this.http.put(this.apiURL + url, data).subscribe((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
      } else if (method === 'delete') {
        this.http.delete(this.apiURL + url).subscribe((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
      }
    });
  }

  isLogin(){
    return !!localStorage.getItem('authToken');
  }

  showSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: "bottom",
      horizontalPosition: "right"
    });
  }

}
