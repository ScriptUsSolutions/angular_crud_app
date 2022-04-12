import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  user_name: any;

  fillerNav = Array(5)
    .fill(0)
    .map((_, i) => `Nav Item ${i + 1}`);



  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  navigateLogout(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('login_user');
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
    const login_data = localStorage.getItem('login_user');
    if(login_data){
      this.user_name = JSON.parse(login_data);
    }
  }

  shouldRun = window.location.host;
}
