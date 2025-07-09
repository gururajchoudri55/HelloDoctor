import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import Swal from 'sweetalert2';
import Labels from '../../Lables/sponsred/sponsered.json';

@Component({
  selector: 'app-sp-home-page-sponsership',
  templateUrl: './sp-home-page-sponsership.component.html',
  styleUrls: ['./sp-home-page-sponsership.component.css']
})
export class SpHomePageSponsershipComponent implements OnInit {
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  p:any;
  languageid:any;
  HomepageSponsrships:any;
  loader:boolean | undefined;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  PhotoUrl:any;
  search:any;
  count:any;
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
    this.Getsponrshipofhomepage();
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
    

    public Getsponrshipofhomepage() {
      this.CommonService.GetSponcered_AddsMobile(this.languageid).subscribe(
        data => {
          let temp: any = data;
          this.HomepageSponsrships = temp;
          this.count=this.HomepageSponsrships.length;
        }, error => {
        }
      )
    }
   
    public GetPhotoUrl(id:any) {

      this.CommonService.GetSponcered_AddsMobile(this.languageid).subscribe(
        data => {
  
          let temp: any = data;
          let temp1: any = temp.filter((x: { id: any; }) => x.id == id);
          this.PhotoUrl = temp1[0].photoURL;
        }, error => {
        }
      )
    }

   //delete doctor

   public DeleteServiceMaster(id: any) {
    
    Swal.fire({
      title:this.labels.title,
      text:this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:this.labels.confirmButtonText,
      cancelButtonText:this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.CommonService.DeleteSponcered_Adds(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
        this.showPopup = 1;
        this.messageID = 75,
        this.typeofPopUp = 1;

      }
    })
  }


  edit(id:any){
    location.href="#/Sponsered/SpHomepageDetails/" + btoa(id);
  }




}
