import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/Pages/services/finance.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/finance/finance.json';

@Component({
  selector: 'app-finance-paid-reports',
  templateUrl: './finance-paid-reports.component.html',
  styleUrls: ['./finance-paid-reports.component.css']
})
export class FinancePaidReportsComponent implements OnInit {
  month:any;
  year:any;
  type:any;
  show:any;
  paidlist:any;
 loader:boolean | undefined;
 search:any;
 p:any;


  constructor(public FinanceService:FinanceService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    var date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.type = 1;
    this.show=0;
    this.GetPaidPayments();
    
  }
  public GetPaidPayments() {
    
    this.FinanceService.GetProviderPaidPayments(this.type, this.year, this.month).subscribe(data => {
      this.paidlist = data;
      this.loader=false;
      
    })
  }

  public GetType(even:any) {
    this.loader=true;
    
    this.type = even.target.value;
    this.show=1;
    this.GetPaidPayments();
  }

  
  goToLink(transctionPhoto:any){
    location.href = "#/Shared/view/" + btoa(transctionPhoto)
 
}

public GetYear(even:any) {
  this.year = even.target.value;
  this.loader=true;
  this.GetPaidPayments()
}

public GetMonth(even:any) {
  this.loader=true;
  this.month = even.target.value;
  this.GetPaidPayments()
}

openwindow(transctionPhoto:any)
{
  location.href = "#/Shared/view/" + btoa(transctionPhoto)

}



  
  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


}
