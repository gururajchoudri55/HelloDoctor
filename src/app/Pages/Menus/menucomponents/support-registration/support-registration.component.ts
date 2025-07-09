import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-support-registration',
  templateUrl: './support-registration.component.html',
  styleUrls: ['./support-registration.component.css']
})
export class SupportRegistrationComponent implements OnInit {
  languageid:any;
  loader:boolean | undefined ;
  p:any;
  localdocList:any;
  dummlist:any;
  count:any;
  currentUrl:any;
  search:any;
  password:any;
  mypinno:any;
  pinno:any;
  Enteredpinno: any;
  Showpassword: any;
  entercurrentpwd:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  currentpwd:any;
  labels:any;
  


  constructor(private MenuService:MenuService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pinno = sessionStorage.getItem('Pinno');
    this.GetSupport();
  }

  //Pagination

  public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }



  //GetSupport
  public GetSupport() {
    this.MenuService.GetSupportRegistration(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.localdocList = data;
        this.dummlist = this.localdocList
        this.count = this.localdocList.length
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "GetProvidersAuditReport", error);
      }
    )
  }

     // Support Registration
  public DeleteSupportRegistration(id: any) {
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
        this.MenuService.DeleteSupportRegistration(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
          this.showPopup=1;
          this.messageID=75;
          this.typeofPopUp=1;
      }
    },error=>{
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl,"DeleteSupportRegistration",error);
    })


  }

 
  //Get password

  public getpassword(details:any) {
    this.password = details.password,
    this.mypinno = details.pinno
    this.Showpassword = 0;
  }
  //Checkpassword
  
    public CheckPasswordvalidate() {
      
      this.showPopup=0;
    if (this.Enteredpinno == "") {
      this.Enteredpinno = "";
      this.showPopup = 1;
      this.messageID = 26;
      this.typeofPopUp = 2;
    }
    else {
      if (this.pinno == this.Enteredpinno) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
      }
      else{      
        this.showPopup = 1;
        this.messageID = 27;
        this.typeofPopUp = 2;
      }
    }
  }






}
