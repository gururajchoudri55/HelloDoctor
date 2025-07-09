import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-region-master-details',
  templateUrl: './region-master-details.component.html',
  styleUrls: ['./region-master-details.component.css']
})
export class RegionMasterDetailsComponent implements OnInit {
  languageid:any;
  countrylist:any;
  currentUrl:any;
  countryid:any;
  provincelist:any;
  cityname:any;
  id:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  showbit:any;
  loader:boolean | undefined;
  labels:any;

  constructor(private MasterService:MasterService,private SharedService:SharedService,private ActivatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.showbit = 0;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.ActivatedRoute.params.subscribe(params => {  
      this.getprobincelist();
      this.id =params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.id=atob(this.id);
        this.showbit = 1;
      }
    }
    )
    this.GetCountryMaster();
    this.countryid = 0;
  }

  public GetCountryMaster() {
    this.MasterService.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.loader=false;   
        this.countrylist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCountryMasterByLanguageID",error);
      }
    )
  }

  public GetCountryID(even:any) {
    this.countryid = even.target.value;
  }

  
  public getprobincelist() {
    this.MasterService.GetRegionMasterWebDash(this.languageid).subscribe(
      data => {
       
        this.provincelist = data;
        var list = this.provincelist.filter((x: { id: any; }) => x.id == this.id)
        this.countryid = list[0].countryID,
          this.cityname = list[0].regionName
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetRegionMasterWebDash",error);
      }
    )
  }

//Insert Details

  public insertdetails() {
    this.showPopup=0;
    if(this.countryid==0||this.countryid==undefined)
    {
      this.showPopup=1;
      this.typeofPopUp=2;
      this.messageID=5;
    }
    else{
      var entity = {
        'CountryID': this.countryid,
        'RegionName': this.cityname
      }
      this.MasterService.InsertRegionMaster(entity).subscribe(data => {
        this.showPopup=1;
        this.typeofPopUp=1;
        this.messageID=1;
          location.href = "#/Masters/RegionMaster";
      })
    }
  }

  //To Update Details
  public updatedetails() {
    this.showPopup=0;
    var entity = {
      'ID': this.id,
      'CountryID': this.countryid,
      'RegionName': this.cityname
    }
    this.MasterService.UpdateRegionMaster(entity).subscribe(data => {
    let res=data;
        this.showPopup=1;
        this.typeofPopUp=1;
        this.messageID=34;
        location.href = "#/Masters/RegionMaster";
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateRegionMaster",error);
    })
  }


  //Redirecting the page
  cancel(){
    location.href = "#/Masters/RegionMaster";
  }


}
