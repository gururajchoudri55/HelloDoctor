import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-province-master-details',
  templateUrl: './province-master-details.component.html',
  styleUrls: ['./province-master-details.component.css']
})
export class ProvinceMasterDetailsComponent implements OnInit {
  languageid:any;
  regionlist:any;
  regionID:any;
  provincelist:any;
  countryid:any;
  cityname:any;
  id:any;
  countrylist:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  currentUrl:any;
  showbit:any;
  loader:boolean | undefined;
  labels:any;
  

  constructor(private MasterService:MasterService,private SharedService:SharedService,
    private ActivatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {   
      this.getprobincelist();
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.id=atob(this.id);
        this.showbit = 1;
      }
    }
    )
    this.countryid = 0;
    this.regionID=0;
    this.GetCountryMaster();
    this.getRegionMaster();
  }

  //To get Region Master

  public getRegionMaster() {
    this.MasterService.GetRegionMasterWebDash(this.languageid).subscribe(
      data => {
       
        this.regionlist = data;
       
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetRegionMasterWebDash",error);
      }
    )
  }

  //To Get Region iD

  GetRegionID(even:any)
  {
    this.regionID=even.target.value;
  }

//To Get Province List
  
  public getprobincelist() {
    this.MasterService.GetCityMasterByLangID(this.languageid).subscribe(
      data => {
        this.loader=false;   
        this.provincelist = data;
        var list = this.provincelist.filter((x: { id: any; }) => x.id == this.id)
        this.countryid = list[0].countryID,
          this.cityname = list[0].short,
          this.regionID=list[0].regionMasterID
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCityMasterByLangID",error);
      }
    )
  }

//To Get Country Master 
  public GetCountryMaster() {
    this.MasterService.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {    
        this.countrylist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCountryMasterByLanguageID",error);
      }
    )
  }

  //to get Country Id
  public GetCountryID(even:any) {
    this.countryid = even.target.value;
  }

//Insert details 
  public insertdetails() {
    if(this.countryid==0||this.countryid==undefined)
    {
      this.showPopup=1;
      this.typeofPopUp=2;
      this.messageID=5;
    }
    else{
      var entity = {
        'CountryID': this.countryid,
        'Short': this.cityname,
        'LanguageID': 1,
        'RegionMasterID':this.regionID
      }
      this.MasterService.InsertCityMaster(entity).subscribe(data => {
        this.showPopup=1;
        this.typeofPopUp=1;
        this.messageID=1;
        location.href = "#/Masters/Provincemaster";       
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertCityMaster",error);
      })
    }
  }


  // To Update Details 
  
  public updatedetails() {
    var entity = {
      'ID': this.id,
      'CountryID': this.countryid,
      'Short': this.cityname,
      'LanguageID':this.languageid
    }
    this.MasterService.UpdateCityMaster_Web(entity).subscribe(data => {
    let res=data;
      this.showPopup=1;
      this.messageID=34;
      this.typeofPopUp=1;
        location.href = "#/Masters/Provincemaster"; 
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateCityMaster_Web",error);
    })
  }

}
