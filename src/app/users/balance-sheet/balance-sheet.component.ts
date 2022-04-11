import { Component, OnInit } from '@angular/core';
import { callAPIConstants } from 'src/app/shared/apiConstant';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit {
  
  public callAPIConstants = callAPIConstants;
  balance_sheet_data: any;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.callApi(this.callAPIConstants.balanceSheet, {}, 'get').then((response) => {
      this.balance_sheet_data = response;
      console.log("balance_response",response);
    })
  }

}
