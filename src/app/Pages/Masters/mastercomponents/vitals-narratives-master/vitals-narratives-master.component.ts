import { Component, OnInit } from '@angular/core';
import Labels from '../../../Lables/Masters/Masterlabels.json';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-vitals-narratives-master',
  templateUrl: './vitals-narratives-master.component.html',
  styleUrls: ['./vitals-narratives-master.component.css']
})
export class VitalsNarrativesMasterComponent implements OnInit {
  typeid: any;
  charges: any;
  dummChargesList: any;
  languageid: any;
  currentUrl: any;
  p: any;
  count: any;
  search: any;
  loader: boolean | undefined;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  id: any;
  deliverycharges: any;
  meridionalcommission: any;
  deliveryPatnerFees: any;
  labels: any;
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  currentURl:any;

  constructor(private MasterService: MasterService, private SharedService: SharedService, private MenuService: MenuService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
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

    this.GetVitalsNarratives();
    this.bsRangeValue = [start, end];
  }

  GetVitalsNarratives() {
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

    this.MasterService.GetVitalsNarratives(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.charges = data;
        this.count = this.charges.length;
        this.dummChargesList = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetVitalsPromoCode", error);
      }
    )
  }
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  GetDetails(id: any) {
    location.href = "#/Masters/VitalsNarratives/" + btoa(id);
  }
  //To Select Date
  //  selectDate(data: any) {
  //   
  //   this.loader = true;
  //   this.startdate = this.MenuService.GetDates(data[0]);
  //   this.enddate = this.MenuService.GetDates(data[1]);
  //   this.getPackage();

  // }
  disablevital(id:any) {
    
    this.showPopup=0;
    this.MasterService.DisableVitalNarrative(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
          this.GetVitalsNarratives();
      }, error => {
        this.SharedService.insertexceptions(this.currentURl,"disable",error);
      }
    )
  }
  enablevital(id:any) {
    this.showPopup=0;
    this.MasterService.EnableVitalNarrative(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.GetVitalsNarratives();
      }, error => {
        this.SharedService.insertexceptions(this.currentURl,"disable",error);
      }
    )
  }

}
