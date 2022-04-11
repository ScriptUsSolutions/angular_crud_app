import { Component } from '@angular/core';

@Component({
  selector: 'block-temp',
  styles: [`
    .loader-div .loader{
        height:15em;
        width:15em;
    }
    .loader-div img{
        position: absolute;
        width: 55px;
        height: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%
    }
  `],
  template: `
    <div class="block-ui-template loader-div">    
        <div class="loader"></div>
        <img src="../../../assets/img/Logo.png" alt="Logo">
    </div>
  `
})
export class BlockUITemplateComponent { }
