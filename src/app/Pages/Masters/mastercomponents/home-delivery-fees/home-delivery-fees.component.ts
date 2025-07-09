import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-home-delivery-fees',
  templateUrl: './home-delivery-fees.component.html',
  styleUrls: ['./home-delivery-fees.component.css']
})
export class HomeDeliveryFeesComponent implements OnInit {
  typeid:any;
  charges:any;
  dummChargesList:any;
  languageid:any;
  currentUrl:any;
  p:any;
  count:any;
  search:any;
  loader:boolean | undefined;
  showPopup:any;
  messageID:any;
  typeofPopUp:any;
  id:any;
  deliverycharges:any;
  meridionalcommission:any;
  deliveryPatnerFees:any;
  labels:any;
  
  constructor(private MasterService:MasterService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.gethomedeliveycharges();
  }

//To Get Details of Charges
  public GetDetails(list:any) {
    
    this.deliverycharges = list.deliveryCharges,
      this.meridionalcommission = list.meridionalCommision,
      this.deliveryPatnerFees = list.deliveryPatnerFees,
      this.id = list.id
      this.typeid=list.typeID;
  }

  //Get Type ID 
  getTypeID(even:any) {
    this.typeid = even.target.value;
    if (even.target.value != 0) {
      this.charges = this.dummChargesList.filter((x: { typeID: any; }) => x.typeID == this.typeid);
    }
    else {
      this.gethomedeliveycharges();
    }
  }

  //Get Home Delivery Charges
  public gethomedeliveycharges() {
    this.MasterService.GetHomeVisitDeliveryChargesMaster(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.charges = data;
        this.count=this.charges.length;
        this.dummChargesList = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetHomeVisitDeliveryChargesMaster",error);
      }
    )
  }

  
   //Pagination
   public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }


  //TO  EnableFess

  public EnableFess(id: any) {
    this.showPopup = 0;
    this.MasterService.UpdateEnableDisableHomeVisitDeliveryChargesMaster(id, 2).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
      this.gethomedeliveycharges();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"UpdateEnableDisableHomeVisitDeliveryChargesMaster",error);
      }
    )
  }

   
  //GetDisableFess

  public GetDisableFess(id:any) {
    this.showPopup = 0;
    this.MasterService.UpdateEnableDisableHomeVisitDeliveryChargesMaster(id,1).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.gethomedeliveycharges();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"UpdateEnableDisableHomeVisitDeliveryChargesMaster",error);
      }
    )
  }

  //Update Details

  public updatedetails() {
    var entity = {
      'ID': this.id,
      'DeliveryCharges': this.deliverycharges,
      'MeridionalCommision': this.meridionalcommission,
      'DeliveryPatnerFees': this.deliveryPatnerFees
    }
    this.MasterService.UpdateHomeVisitDeliveryChargesMaster(entity).subscribe(data => {    
      this.showPopup=1;
      this.messageID=34;
      this.typeofPopUp=1;
      this.gethomedeliveycharges();

    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateHomeVisitDeliveryChargesMaster",error);
    })
  }


  //To Get Commission Details
  public GetCommission(even:any) {
    if (even > this.deliverycharges) {

      this.meridionalcommission = 0;
      this.deliveryPatnerFees = 0
    }
    else {
      this.deliveryPatnerFees = Number(this.deliverycharges) - Number(this.meridionalcommission);
    }
  }



}
