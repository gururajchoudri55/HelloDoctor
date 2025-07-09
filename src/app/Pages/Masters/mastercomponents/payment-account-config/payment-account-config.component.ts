import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';

import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-payment-account-config',
  templateUrl: './payment-account-config.component.html',
  styleUrls: ['./payment-account-config.component.css']
})
export class PaymentAccountConfigComponent implements OnInit {

  languageid:any;
  currentUrl:any;
  list:any;
  loader:boolean | undefined ;
  p:any;
  count:any;
  search:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  id:any; 
 charges:any;
 labels:any;
  AccountName: any;
  AccountNumber: any;

  constructor(private MasterService:MasterService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.GetPaymentAccounts();
  }

 //Get CreditCardCharges
 GetPaymentAccounts() {
   this.loader=false;
  this.MasterService.GetPaymentAccounts().subscribe(data => {
    this.list = data;
    this.count=this.list.length;
  },error =>{
      this.SharedService.insertexceptions(this.currentUrl,"GetCreditCardChargesMaster",error);
  }
  )
}


   public update() {
    var entity = {
      'ID': this.id,
      'AccountName': this.AccountName,
      'AccountNumber': this.AccountNumber

    }
  this.MasterService.UpdatePaymentAccounts(entity).subscribe(data => {
     
    this.GetPaymentAccounts();
  },error=>{
    this.SharedService.insertexceptions(this.currentUrl,"UpdatePaymentAccounts",error);
  })
}

   //Pagination
   public pageChanged(even:any) {
    let fgdgfgd = even;
    this.p = even;
  }

  getid(list:any) {
    this.id = list.id;
    this.AccountName=list.accountName
    this.AccountNumber=list.accountNumber
    
  }

}
