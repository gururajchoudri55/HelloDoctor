import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import Labels from '../../Lables/sponsred/sponsered.json';

@Component({
  selector: 'app-sp-pharmacy',
  templateUrl: './sp-pharmacy.component.html',
  styleUrls: ['./sp-pharmacy.component.css']
})
export class SpPharmacyComponent implements OnInit {
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  p:any;
  pharmacylist:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  search:any;
  loader:boolean | undefined;
  count:any;
  languageid:any;
  labels:any;
  

  constructor(private CommonService:CommonService) { }

  ngOnInit(): void {
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

    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);

    this.bsRangeValue = [start, end];
    this.getsponserpharmacyforadmin();

  }

  public getsponserpharmacyforadmin() {
   
    this.CommonService.GetSponsoredPharmacyForAdmin().subscribe(
      data => {
        this.pharmacylist = data;
        this.count=this.pharmacylist.length;
      }, error => {
      }
    )
  }



       // Pagination

       public pageChanged(even: any) {

        let fgdgfgd = even;
        this.p = even;
      }
     
      //To Select Date
      selectDate(data: any) {
        this.startdate = this.CommonService.GetDates(data[0]);
        this.enddate = this.CommonService.GetDates(data[1]);
        sessionStorage.setItem("startdate", this.startdate);
        sessionStorage.setItem("enddate", this.enddate);
      }


              
  //To Disable  Pharmacy
  public diasblePharmacy(id: any) {
    this.showPopup = 0;
    this.CommonService.DisableSponsoredPharmacy(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.getsponserpharmacyforadmin();
      }, error => {
        
      }
    )
  }

//TO Enable Pharmacy

  public enablePharmacy(id: any) {
    this.showPopup = 0;
    this.CommonService.EnableSponsoredPharmacy(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.getsponserpharmacyforadmin();
      }, error => {
        
      }
    )
  }

  edit(id:any){
    location.href="#/Sponsered/SpPharmacyDetails/" +btoa(id);
  }

  

}
