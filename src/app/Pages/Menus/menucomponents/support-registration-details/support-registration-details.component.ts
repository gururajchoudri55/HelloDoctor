import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-support-registration-details',
  templateUrl: './support-registration-details.component.html',
  styleUrls: ['./support-registration-details.component.css']
})
export class SupportRegistrationDetailsComponent implements OnInit {
  languageID:any;
  countryList:any;
  countrydd:any;
  countryID:any;
  regionList:any;
  regiondd:any;
  regionID:any;
  cityList:any;
  citydd:any;
  cityID:any;
  areaList:any;
  areadd:any;
  areaID:any;
  pinCode:any;
  attachmentsurl1:any=[];
  name:any;
  phonenumber:any;
  email:any;
  gender:any;
  address:any;
  description:any;
  username:any;
  password:any;
  pinno:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  loader:boolean | undefined;
  currentUrl:any;
  labels:any;
  province:any;
  city:any;
  



  constructor(private MenuService:MenuService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.province=this.labels.selectProvince;
    this.city=this.labels.selectCity
    this.getCountryMaster();

  }

  // getCountry 

  public getCountryMaster() {
    this.MenuService.GetCountryMasterByLanguageID(this.languageID).subscribe(
      data => {
        this.loader=false;
        this.countryList = data;
        console.log("CountryList", this.countryList)
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCountryMasterByLanguageID", error);
      }
    )
  }


  //getRegion

  public getCountryID(even: any) {
    this.countryID = even.target.value;
    this.MenuService.GetRegionMasterWeb(this.countryID).subscribe(
      data => {

        this.regionList = data;

        this.regiondd = {
          singleSelection: true,
          idField: 'id',
          textField: 'regionName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetRegionMasterWeb", error);
      }
    )






  }

  //GetProvince

  GetRegionID(item: any) {
    this.regionID = item.id
    this.MenuService.GetCityMasterBYIDandLanguageID(this.regionID, this.languageID).subscribe(
      data => {

        this.cityList = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCityMasterBYIDandLanguageID", error);
      }
    )
  }


  //GetAreaMaster

  public GetCityID(item1: any) {

    this.cityID = item1.id;
    this.getareamasterbyid();
  }


  public getareamasterbyid() {

    this.MenuService.GetAreaMasterByCityIDAndLanguageID(this.cityID, this.languageID).subscribe(
      data => {

        this.areaList = data;
        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true,

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetAreaMasterByCityIDAndLanguageID", error);
      }
    )
  }
  public GetAreaID(item3: any) {

    this.areaID = item3.id;
    for (let i = 0; i < this.areaList.length; i++) {

      if (this.areaList[i].id == this.areaID) {

        this.pinCode = this.areaList[i].pincode
      }
    }
  }

  public insertdetails() {
    
    this.showPopup=0;
    if (this.countryID == undefined || this.countryID.length == 0) {
      this.showPopup=1;
      this.messageID=5;
      this.typeofPopUp=2;   
    }
    else if (this.cityID == undefined || this.cityID.length == 0) {
      this.showPopup=1;
      this.messageID=7;
      this.typeofPopUp=2;
    }
    else if (this.areaID == undefined || this.areaID.length == 0) {
      this.showPopup=1;
      this.messageID=7;
      this.typeofPopUp=2;
    }
    else {
      if (this.attachmentsurl1.length == 0) {
        this.attachmentsurl1[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
      }
      
      var entity = {
        'Name': this.name,
        'MobileNumber': this.phonenumber,
        'EmailID': this.email,
        'Address': this.address,
        'PhotoUrl': this.attachmentsurl1[0],
        'Description': this.description,
        'GenderID': Number(this.gender),
        'CityID': this.cityID,
        'AreaID': this.areaID,
        'Pincode': this.pinCode,
        'CountryID': this.countryID,
        'UserName': this.username,
        'Password': this.password
      }
      this.MenuService.InsertSupportRegistration(entity).subscribe(data => {
        
        if (data != 0) {
          this.pinno = data;
          this.showPopup=1;
          this.messageID=1;
          this.typeofPopUp=1;    
          location.href = "#/menus/SupportRegistration";
        }
        // else {
        //   Swal.fire('Error', 'Doctor Already Exist In This City');
        //   location.href = "#/SupportRegDash"
        // }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertSupportRegistration",error);
      })
    }
  }


  alert(){
    alert("save")
  }



}
