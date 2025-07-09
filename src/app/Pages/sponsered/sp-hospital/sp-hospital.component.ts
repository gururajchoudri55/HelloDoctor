import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import Labels from '../../Lables/sponsred/sponsered.json';


@Component({
  selector: 'app-sp-hospital',
  templateUrl: './sp-hospital.component.html',
  styleUrls: ['./sp-hospital.component.css']
})
export class SpHospitalComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  p:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  diagnosticlist:any;
  languageid:any;
  search:any;
  loader:boolean | undefined;
  count:any;
  labels:any;




  constructor(private CommonService: CommonService) { }

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


    
    this.getsponserhospitalforadmin();
  }

  public getsponserhospitalforadmin() {

    this.CommonService.GetSponsoredHospitalsForAdmin().subscribe(
      data => {

        this.diagnosticlist = data;
        this.count=this.diagnosticlist.length;
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
  

  
  //To Disable ReceptionistLogin
  public disablehospital(id: any) {
    this.showPopup = 0;
    this.CommonService.DisableSponsoredHospitals(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.getsponserhospitalforadmin();  
      }, error => {
        
      }
    )
  }

//TO Enable ReceptionistLogin

  public enablehospital(id: any) {
    this.showPopup = 0;
    this.CommonService.EnableSponsoredHospitals(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.getsponserhospitalforadmin();   
      }, error => {
        
      }
    )
  }

  edit(id:any){
    location.href="#/Sponsered/SPHospitalDetails/" + btoa(id);

  }


}
