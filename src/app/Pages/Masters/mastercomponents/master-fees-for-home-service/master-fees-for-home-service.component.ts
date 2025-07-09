import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-master-fees-for-home-service',
  templateUrl: './master-fees-for-home-service.component.html',
  styleUrls: ['./master-fees-for-home-service.component.css']
})
export class MasterFeesForHomeServiceComponent implements OnInit {
  languageid:any;
  loader:boolean | undefined;
  homeChargesList:any;
  search:any;
  count:any;
  currentUrl:any;
  p:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  id:any;
  deliverycharges:any;
  meridionalcommission:any;
  deliveryPatnerFees:any;
  typeid:any;
  labels:any;
  
  constructor(private MasterService:MasterService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.loader=true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.getHomeChargesMaster();
  }


  //Get Home Charges Master
  getHomeChargesMaster() {
    this.MasterService.GetHomeCountryVisitDeliveryChargesMaster(this.languageid).subscribe(data => {
      this.loader=false;
      this.homeChargesList = data;
      this.count=this.homeChargesList.length;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"GetHomeCountryVisitDeliveryChargesMaster",error);
    })
  }

     //Pagination
     public pageChanged(even:any) {

      let fgdgfgd = even;
      this.p = even;
    }

//Upadte Details

    public update() {
      this.showPopup=0;
      
      var entity = {
        'ID': this.id,
        'DeliveryCharges': this.deliverycharges,
        'MeridionalCommision': this.meridionalcommission,
        'DeliveryPatnerFees': this.deliveryPatnerFees
      }
      this.MasterService.UpdateHomeCountryVisitDeliveryChargesMaster(entity).subscribe(data => {
        this.showPopup=1;
        this.typeofPopUp=1;
        this.messageID=34;
        this.getHomeChargesMaster();
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"UpdateHomeCountryVisitDeliveryChargesMaster",error);
      })
    }

//To get Commission Details
    
  public GetCommission(even:any) {
    
    if (even > this.deliverycharges) {

      this.meridionalcommission = 0;
      this.deliveryPatnerFees = 0
    }
    else {
      
      this.deliveryPatnerFees = Number(this.deliverycharges) - Number(this.meridionalcommission);
    }
  }

//To get Commission Charges

  getid(credit:any) {
    this.id = credit.id
    this.deliverycharges=credit.deliveryCharges;
    this.meridionalcommission=credit.meridionalCommision;
    this.deliveryPatnerFees=credit.deliveryPatnerFees
    this.typeid=credit.typeID
  }
}
