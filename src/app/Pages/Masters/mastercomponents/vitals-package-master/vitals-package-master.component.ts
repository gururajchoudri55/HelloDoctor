import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Masters/Masterlabels.json';
import { formatDate } from '@angular/common';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
@Component({
  selector: 'app-vitals-package-master',
  templateUrl: './vitals-package-master.component.html',
  styleUrls: ['./vitals-package-master.component.css']
})
export class VitalsPackageMasterComponent implements OnInit {
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
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  constructor(private MasterService:MasterService,private SharedService:SharedService,private MenuService:MenuService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    
    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);

    this.getPackage();
    this.bsRangeValue = [start, end];
  }

  getPackage(){
    // this.MasterService.GetVitalsPackage().subscribe(
    //   data => {
    //     this.loader=false;
    //     this.charges = data;
    //     this.count=this.charges.length;
    //     this.dummChargesList = data;
    //   }, error => {
    //     this.SharedService.insertexceptions(this.currentUrl,"GetVitalsPromoCode",error);
    //   }
    // ) 

    this.MasterService.GetVitalsPackageByMobDate(this.startdate,this.enddate).subscribe(
      data => {
        this.loader=false;
        this.charges = data;
        this.count=this.charges.length;
        this.dummChargesList = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetVitalsPromoCode",error);
      }
    ) 
  }
  public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }
  EnableFess(id:any){
   ;
   this.loader = true;
    this.MasterService.UpdateEnabledPackage(id).subscribe(
      data => {
   
        this.getPackage();
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "UpdateEnabledPackage", error);
      }
    )
  }
  GetDisableFess(id:any){
    ;
    this.loader = true;
    this.MasterService.UpdateDisabledPackage(id).subscribe(
      data => {
   this.getPackage();
 
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "UpdateDisabledPackage", error);
      }
    )
  }
  GetDetails(id:any) {
    location.href="#/Masters/VitalsPackage/" +btoa(id);
  }
   //To Select Date
   selectDate(data: any) {
    
    this.loader = true;
    this.startdate = this.MenuService.GetDates(data[0]);
    this.enddate = this.MenuService.GetDates(data[1]);
    this.getPackage();
  
  }

  UpdateVitalsPackagePublish(id:any){
    ;
    this.loader = true;
    this.MasterService.UpdateVitalsPackagePublish(id).subscribe(
      data => {
   this.getPackage();
 
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "UpdateVitalsPackagePublish", error);
      }
    )
  }
}
