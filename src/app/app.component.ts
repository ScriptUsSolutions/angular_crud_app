import { Component } from '@angular/core';
import { BlockUITemplateComponent } from './shared/loader/blockUITemplate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crudDemo';
  blockTemplate: BlockUITemplateComponent = BlockUITemplateComponent;

  constructor() {}

}

