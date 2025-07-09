import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Masters/Masterlabels.json'

@Component({
  selector: 'app-provincemaster',
  templateUrl: './provincemaster.component.html',
  styleUrls: ['./provincemaster.component.css']
})
export class ProvincemasterComponent implements OnInit {
  languageid:any;
  loader:boolean | undefined;
  countryList:any;
  countryid:any;
  provinceList:any;
  dummlist:any;
  count:any;
  citylist:any;
  cityid:any;
  currentUrl:any;
  search:any;
  p:any;
  labels:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;


  constructor(private SharedService:SharedService,private  MasterService:MasterService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.getprobincelist();
    this.GetCountryMaster();
  }
 
//Country List 
  public GetCountryMaster() {
    this.MasterService.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
         this.loader=false;
        this.countryList = data;

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCountryMasterByLanguageID",error);
      }
    )
  }

  //Country ID
  public GetCountryID(even:any) {
    if (even.target.value != 0) {
      this.countryid = even.target.value;
      this.provinceList = this.dummlist.filter((x: { countryID: any; }) => x.countryID == this.countryid)
      this.count= this.provinceList.length;
      
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getprobincelist();
    }
  }

  //City List
  public getcity() {
   
    this.MasterService.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
       
        this.citylist = data;
      }, error => {
         this.SharedService.insertexceptions(this.currentUrl,"GetCityMasterBYIDandLanguageID",error);
      }
    )
  }


  //Get City ID
  public GetCityID(even:any) {
    if (even.target.value != 0) {
     
      this.cityid = even.target.value;

      this.provinceList = this.dummlist.filter((x: { cityID: any; }) => x.cityID == this.cityid)
      this.count= this.provinceList.length;
    }
    else if (even.target.value == 0) {
      this.getcity()
    }
  }

   //Get Province List
  public getprobincelist() {
    this.MasterService.GetCityMasterByLangID(this.languageid).subscribe(
      data => {
       
        this.provinceList = data;
        this.dummlist=this.provinceList;
        this.count= this.provinceList.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCityMasterByLangID",error)
      }
    )
  }

  
   //Pagination
   public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }


  //Delete Province
  public DeleteCityMaster(id: any) {
    this.showPopup=0;
    
    Swal.fire({
      title:this.labels. title,
      text:this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:this.labels.confirmButtonText,
      cancelButtonText:this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.MasterService.DeleteCityMaster(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
         this.showPopup=1;
         this.messageID=75;
         this.typeofPopUp=1;
      }
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"DeleteCityMaster",error);
    })
  }

  //To edit 
  edit(id:any){
    location.href="#/Masters/ProvinceMasterDetails/" +btoa(id);
  }



}
