import { Component } from '@angular/core';
import { BlockUITemplateComponent } from './shared/loader/blockUITemplate';
import { Router, Event as NavigationEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crudDemo';
  blockTemplate: BlockUITemplateComponent = BlockUITemplateComponent;
  // defaultRouter = true;

  constructor(private router: Router) {
    // this.router.events.subscribe((event: NavigationEvent) => {
    //   // console.log(event);
      
    //   if (event instanceof NavigationEnd) {
    //     if((event.urlAfterRedirects.includes('/auth/login')) || (event.urlAfterRedirects.includes('/auth/signup')) || (event.urlAfterRedirects.includes('/auth/forgot-password'))){
    //       this.defaultRouter = false;
    //     }else{
    //       this.defaultRouter = true;
    //     }
    //     console.log(event.url);
    //   }
    // });
  }
}

