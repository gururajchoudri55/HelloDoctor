import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.css']
})
export class CountryMasterComponent implements OnInit {
  languageid:any;
  countryList:any;
  currentUrl:any;
  loader:boolean | undefined;
  count:any;
  search:any;
  p:any;
  labels:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  
  constructor(private  MasterService: MasterService ,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.GetCountryMaster();
  }


  //Get Country List

  public GetCountryMaster() {
    this.MasterService.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.countryList = data;
        this.count=this.countryList.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCountryMasterByLanguageID",error);
      }
    )
  }

 
    
  //delete Country
  public DeleteCountryMaster(id: any) {
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
        this.MasterService.DeleteCountryMaster(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
            this.showPopup=1;
            this.messageID=75;
            this.typeofPopUp=1;
      }
    })
  }
  
     //Pagination
     public pageChanged(even:any) {

      let fgdgfgd = even;
      this.p = even;
    }

  //Edit 
    edit(id:any){
    location.href="#/Masters/CountryMasterDetails/" +btoa(id);
  }


}
