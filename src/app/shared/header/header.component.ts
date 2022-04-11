import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authenticatedUser = false;
  welcome_user: any;
  selectedFile: File

  constructor(private router: Router, private commonService: CommonService, private http: HttpClient) { }

  ngOnInit(): void {
    const login_data = localStorage.getItem('login_user');
    if(login_data){
      this.welcome_user = JSON.parse(login_data);
    } else {
      console.log('No any login user found!');
    }
    const authUser = this.commonService.isLogin();
    console.log("authUser",authUser);
    if(authUser){
      this.authenticatedUser = true;
    }
  }
  
  navigateLogout(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('login_user');
    this.router.navigate(['/auth/login']);
  }


  // onFileChanged(event: any){
  //   this.selectedFile = event.target.files[0];
  //   console.log("this.selectedFile",this.selectedFile);
  //   this.onUpload();
  // }

  // onUpload() {
  //   const uploadData = new FormData();
  //   uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  //   this.http.post('http://localhost:3000/Login', uploadData).subscribe(data => {
  //     console.log("Upload Image data",data);
  //   })
  // }

}
