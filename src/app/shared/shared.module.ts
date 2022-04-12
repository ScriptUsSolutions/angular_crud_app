import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { BlockUITemplateComponent } from './loader/blockUITemplate';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material-module/material-module.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    ConfirmationPopupComponent,
    BlockUITemplateComponent,
    FooterComponent,
    SidenavComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    ConfirmationPopupComponent,
    BlockUITemplateComponent,
    FooterComponent,
    MaterialModule,
    SidenavComponent
  ]
})
export class SharedModule { }
