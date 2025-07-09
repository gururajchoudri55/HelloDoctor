import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import Labels from '../../../Lables/Masters/Masterlabels.json';



@Component({
  selector: 'app-home-delivery-fees-details',
  templateUrl: './home-delivery-fees-details.component.html',
  styleUrls: ['./home-delivery-fees-details.component.css']
})
export class HomeDeliveryFeesDetailsComponent implements OnInit {
  languageid:any;
  pharmacylist:any;
  pharmacydd:any;
  search:any;
  currentUrl:any;
  diagnosticlist:any;
  diadd:any;
  pharmacyid:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  deliverycharges:any;
  meridionalcommission:any;
  deliverypatnerfees:any;
  typeid:any;
  labels:any;
  

  constructor(private MasterService:MasterService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.MasterService.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {
        this.pharmacylist = data;
        this.pharmacydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'pharmacyName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPharmacyForAdminByLanguageID",error);
      }
    )

    this.MasterService.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticCenterListByLanguageID",error);
      }
    )
  }

  public GetPharmacyID(item2: any) {

    this.pharmacyid = item2.id;
  }

  public GetDiagnosticID(item1: any) {

    this.pharmacyid = item1.id;
  }
 

  
  public insertdetails() {
    var entity = {
      'DeliveryCharges': this.deliverycharges,
      'MeridionalCommision': this.meridionalcommission,
      'DeliveryPatnerFees': this.deliverypatnerfees,
      'TypeID': this.typeid,
      'ProviderID': this.pharmacyid
    }
    this.MasterService.InsertHomeVisitDeliveryChargesMaster(entity).subscribe(data => {
      if (data != 0) {
      this.showPopup=1;
      this.messageID=11;
      this.typeofPopUp=1;
        location.href = "#/Masters/HomeDeliveryFees";
      }

    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertHomeVisitDeliveryChargesMaster",error);
    })
  }

  getMastersetup(even:any) {
    
    if (even == 1) {
      this.MasterService.GetHomeCountryVisitDeliveryChargesMaster(this.languageid).subscribe(data => {
        var list = data.filter(x => x.typeID == this.typeid)
        this.deliverycharges = list[0].deliveryCharges,
          this.meridionalcommission = list[0].meridionalCommision,
          this.deliverypatnerfees = list[0].deliveryPatnerFees
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"GetHomeCountryVisitDeliveryChargesMaster",error);
      })
    }
    else {
      this.deliverycharges = "";
      this.meridionalcommission = "";
      this.deliverypatnerfees = "";
    }
  }








}
