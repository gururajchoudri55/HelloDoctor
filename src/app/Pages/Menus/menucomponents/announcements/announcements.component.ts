import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Report/reportlabels.json';


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  languageid:any;
  currentUrl:any;
  loader:boolean | undefined;
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  annousments:any;
  p:any;
  showPopup:any;
  messageID:any;
  typeofPopUp:any;
  search:any;
  count:any;
  labels:any;
  
  constructor(private MenuService:MenuService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
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
    this.bsRangeValue = [start, end];
    this.getannounsements();
   
  }

    //To Select Date
        selectDate(data: any) {
          this.loader = true;
          this.startdate = this.MenuService.GetDates(data[0]);
          this.enddate = this.MenuService.GetDates(data[1]);
          this.getannounsements();
        }


   //Get Announcements
   public getannounsements() {
    this.MenuService.GetAnnouncements(this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       this.loader=false;
        this.annousments = data;
        this.count=this.annousments.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetAnnouncements",error);
      }
    )
  }

  //Pagination
  public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }


  //To Disable Announcements
  public DisableAnnouncements(docid: any) {
    this.showPopup = 0;
    this.MenuService.DisableAnnouncements(docid).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
         this.getannounsements();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"DisableAnnouncements",error);
      }
    )
  }

//TO Enable Announcements

  public EnableAnnouncements(id: any) {
    this.showPopup = 0;
    this.MenuService.EnableAnnouncements(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.getannounsements();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"EnableAnnouncements",error);
      }
    )
  }


  //Delete Patient
  public DeleteAnnouncements(id: any) {
    this.showPopup=0;
    
    Swal.fire({
      title:this.labels.title,
      text:this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText:this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.MenuService.DeleteAnnouncements(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
         this.showPopup=1;
         this.messageID=75;
         this.typeofPopUp=1;
      }
    })
  }


  edit(id:any){
    location.href="#/menus/Announcementdetails/" + btoa(id);
  }
 



}
