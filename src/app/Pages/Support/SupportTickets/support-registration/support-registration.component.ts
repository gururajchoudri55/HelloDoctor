import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/Pages/services/support.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Support/Supportlabels.json';

@Component({
  selector: 'app-support-registration',
  templateUrl: './support-registration.component.html',
  styleUrls: ['./support-registration.component.css']
})
export class SupportRegistrationComponent implements OnInit {
  languageid:any;
  pinno:any;
  labels1:any;
  localdoclist:any;
  dummlist:any;
  count:any;
  countrylist:any;
  countryid:any;
  citylist:any;
  cityid:any;
  areaid:any;
  arealist:any;
  password:any;
  mypinno:any;
  Showpassword:any;
  Enteredpinno:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  p:any;
  search:any;
  labels:any;
  currentUrl:any;
  loader:boolean | undefined;

  constructor(private SupportService:SupportService,private SharedService:SharedService,
    private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pinno = sessionStorage.getItem('Pinno');
    this.GetSupport();
    this.GetCountryMaster();
    this.countryid = 0;
    this.cityid = 0
  }

  public GetSupport() {
    this.SupportService.GetSupportRegistration(this.languageid).subscribe(
      data => {
        this.localdoclist = data;
        this.dummlist = this.localdoclist;
        this.count = this.localdoclist.length;
        this.loader=false;
      }, error => {
         this.SharedService.insertexceptions(this.currentUrl,"GetSupportRegistration",error);
         this.loader=false;
      }
    )
  }

  

  public GetCountryMaster() {
    this.SupportService.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.countrylist = data;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCountryMasterByLanguageID",error);
        this.loader=false;
      }
    )
  }



  public GetCountryID(even:any) {
    if (even.target.value != 0) {
      this.countryid = even.target.value;
      this.localdoclist = this.dummlist.filter((x: { countryID: any; }) => x.countryID == this.countryid)
      this.count = this.localdoclist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.GetSupport()
      this.countryid = 0

    }
  }
  public getcity() {
    this.SupportService.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
        this.citylist = data;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCityMasterBYIDandLanguageID",error);
        this.loader=false;
      }
    )
  }


  public GetCityID(even:any) {
    if (even.target.value != 0) {

      this.cityid = even.target.value;
      this.getareamasterbyid()
      this.localdoclist = this.dummlist.filter((x: { cityID: any; }) => x.cityID == this.cityid)
      this.count = this.localdoclist.length
    }
    else if (even.target.value == 0) {
      this.getcity();
      this.areaid = 0;
      this.cityid = 0
    }
  }



  public getareamasterbyid() {

    this.SupportService.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {

        this.arealist = data;
       this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetAreaMasterByCityIDAndLanguageID",error);
        this.loader=false;
      }
    )
  }


  public GetAreaID(even:any) {
    if (even.target.value != 0) {

      this.areaid = even.target.value;
      this.localdoclist = this.dummlist.filter((x: { areaID: any; }) => x.areaID == this.areaid)
      this.count = this.localdoclist.length
    }
    else if (even.target.value == 0) {
      this.GetSupport()
    }
  }


  // public getpassword(details:any) {
  //   this.password = details.password,
  //   this.mypinno = details.pinno
  //   this.Showpassword = 0;
  // }




  // public CheckPasswordvalidate() {
  //   if (this.Enteredpinno == "" ) {
  //     this.showPopup = 1;
  //     this.messageID = 26;
  //     this.typeofPopUp = 2;
  //   }
  //   else {
  //     if (this.pinno == this.Enteredpinno) {
  //       this.Showpassword = 1;
  //       this.Enteredpinno = ""
  //     }
  //     else{     
  //       this.Enteredpinno=""; 
  //       this.showPopup = 1;
  //       this.messageID = 27;
  //       this.typeofPopUp = 2;
  //     }
  //   }
  // }


   // Pagination

   public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


         public DeleteSupportRegistration(id: any) {
          
          Swal.fire({
            title:this.labels.title,
            text:this.labels.text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText:this.labels.yes,
            cancelButtonText:this.labels.no
          }).then((result) => {
            if (result.isConfirmed) {
              this.SupportService.DeleteSupportRegistration(id).subscribe(res => {
                let test = res;
                this.ngOnInit();
              })
               this.showPopup=1;
               this.messageID=75;
               this.typeofPopUp=1;
            }
          },error=>{this.SharedService.insertexceptions(this.currentUrl,"DeleteSupportRegistration",error);
             this.loader=false;
           
          })     
      
        }






}
