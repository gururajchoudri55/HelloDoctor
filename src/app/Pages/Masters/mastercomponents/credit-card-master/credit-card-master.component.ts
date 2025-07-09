import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-credit-card-master',
  templateUrl: './credit-card-master.component.html',
  styleUrls: ['./credit-card-master.component.css']
})
export class CreditCardMasterComponent implements OnInit {
  languageid:any;
  currentUrl:any;
  creditChargesList:any;
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

  constructor(private MasterService:MasterService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.getCreditCardChargesMaster();
  }

 //Get CreditCardCharges
 getCreditCardChargesMaster() {
   this.loader=false;
  this.MasterService.GetCreditCardChargesMaster(this.languageid).subscribe(data => {
    this.creditChargesList = data;
    this.count=this.creditChargesList.length;
  },error =>{
      this.SharedService.insertexceptions(this.currentUrl,"GetCreditCardChargesMaster",error);
  }
  )
}



   public update() {
  this.MasterService.UpdateCreditCardChargesMaster(this.id, this.charges).subscribe(data => {
     
    this.getCreditCardChargesMaster();
  },error=>{
    this.SharedService.insertexceptions(this.currentUrl,"UpdateCreditCardChargesMaster",error);
  })
}

   //Pagination
   public pageChanged(even:any) {
    let fgdgfgd = even;
    this.p = even;
  }

  getid(id:any) {
    this.id = id;
  }

}
