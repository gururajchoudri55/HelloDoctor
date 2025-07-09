import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-citymaster',
  templateUrl: './citymaster.component.html',
  styleUrls: ['./citymaster.component.css']
})
export class CitymasterComponent implements OnInit {
  languageid:any;
  provincelist:any;
  cityslist:any;
  id:any;
  cityid:any;
  areaname:any;
  pincode:any;
  messageID:any;
  showbit:any;
  currentUrl:any;
  loader:boolean | undefined;
  labels:any;

  constructor(private MasterService:MasterService,private SharedService:SharedService,
    private ActivatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.loader=true;
    this.showbit = 0;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {
      this.id =params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.id=atob(this.id);
        this.showbit = 1;
        this.getcitymasters();
      }
    }
    )
     this.cityid = 0;
    this.getprobincelist();
   
  }

  public getprobincelist() {
    this.MasterService.GetCityMasterByLangID(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.provincelist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCityMasterByLangID",error);
      }
    )
  }
   


  public getcitymasters() {
    this.MasterService.GetAreaMasterByLangID(this.languageid).subscribe(
      data => {
          this.cityslist = data;
          var list = this.cityslist.filter((x: { id: any; }) => x.id == this.id)
          this.cityid = list[0].cityID,
          this.areaname = list[0].areaName
          this.pincode = list[0].pincode
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetAreaMasterByLangID",error);
      }
    )
  }
  public GetProvinceID(even:any) {  
    this.cityid = even.target.value;
  }


  showPopup:any;
  typeofPopUp:any;

  public insertdetails() {
    if(this.cityid==0||this.cityid==undefined)
    {
      this.showPopup=1;
      this.typeofPopUp=2;
      this.messageID=5;
    }
    else{
      var entity = {
        'CityID': this.cityid,
        'AreaName': this.areaname,
        'Pincode': this.pincode,
        'LanguageID': 1
      }
      this.MasterService.InsertAreaMaster(entity).subscribe(data => {
        this.showPopup=1;
        this.typeofPopUp=1;
        this.messageID=1;
          location.href = "#/Masters/CityMasterDashboard";
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertAreaMaster",error);
      })
    }
  }


  //To Update Details 

  public updatedetails() {
    var entity = {
      'ID':this.id,
      'CityID': this.cityid,
      'AreaName': this.areaname,
      'Pincode': this.pincode,
      'LanguageID': this.languageid
    }
    this.MasterService.UpdateAreaMaster_Web(entity).subscribe(data => {
     let res=data;
        this.showPopup=1;
        this.messageID=34;
        this.typeofPopUp=1;
        location.href = "#/Masters/CityMasterDashboard";  
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateAreaMaster_Web",error);
    })
  }


  cancel(){
    location.href = "#/Masters/CityMasterDashboard";  
  }



}
