import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/Pages/services/support.service';
import Labels from '../../../Lables/Support/Supportlabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';  


@Component({
  selector: 'app-support-profile',
  templateUrl: './support-profile.component.html',
  styleUrls: ['./support-profile.component.css']
})
export class SupportProfileComponent implements OnInit {
  languageid: any;
  suportid: any;
  details: any;
  doctorname: any;
  phoneno: any;
  email: any;
  address: any;
  description: any;
  gender: any;
  countryid: any;
  cityid: any;
  areaid: any;
  pincode: any;
  username: any;
  password: any;
  countryList: any;
  countrydd: any;
  search: any;
  countryID: any;
  regionList: any;
  regiondd: any;
  regionID: any;
  cityList: any;
  citydd: any;
  cityID: any;
  areaList: any;
  areadd: any;
  areaID: any;
  pinCode: any;
  citylist: any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  loader:boolean | undefined;
  labels:any;
  selectregion:any;
  selectcountry:any;
  selectcity:any;
  selectprovince:any;
  currenturl:any;




  constructor(private SupportService: SupportService,private SharedService:SharedService) { }

  ngOnInit(): void {
    ;
    this.loader=true;
   this.currenturl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.suportid = sessionStorage.getItem('supportid');
    this.selectregion=this.labels.selectRegion;
    this.selectcountry=this.labels.selectCountry;
    this.selectcity=this.labels.selectCity;
    this.selectprovince=this.labels.selectProvince;
    this.search=this.labels.search;
    this.getCountryMaster();
    this.getdocdetails();
  }


  public getdocdetails() {
    this.SupportService.GetSupportRegistrationByID(this.languageid, this.suportid).subscribe(
      data => {
        this.details = data[0];
        this.doctorname = this.details.name,
          this.phoneno = this.details.mobileNumber,
          this.email = this.details.emailID,
          this.address = this.details.address,
          this.description = this.details.description,
          this.gender = this.details.genderID,
          this.description = this.details.description,
          this.countryID = this.details.countryID,
          this.cityID = this.details.cityID,
          this.areaID = this.details.areaID,
          this.pincode = this.details.pincode,
          this.username = this.details.userName,
          this.password = this.details.password
         this.loader=false;
          
        this.getCountryMaster();
        this.getareamasterbyid();
        this.getcitymaster();
      }, error => {
        this.SharedService.insertexceptions(this.currenturl,"GetSupportRegistrationByID",error);
      }
    )
  }




  // getCountry 

  public getCountryMaster() {
    this.SupportService.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.countryList = data;
        console.log("CountryList", this.countryList)
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true

        };
      }, error => {
        this.SharedService.insertexceptions(this.currenturl,"GetCountryMasterByLanguageID",error);
      }
    )
  }


  //getRegion

  public getCountryID(even: any) {
    this.countryID = even.target.value;
    this.SupportService.GetRegionMasterWeb(this.countryID).subscribe(
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
          searchPlaceholderText: this.search,
          noResultsFound: "no data",
          closeDropDownOnSelection: true,

        };
      }, error => {
        this.SharedService.insertexceptions(this.currenturl,"GetRegionMasterWeb",error);
      }
    )
  }

  //GetProvince

  GetRegionID(item: any) {
    this.regionID = item.id
    this.SupportService.GetCityMasterBYIDandLanguageID(this.regionID, this.languageid).subscribe(
      data => {
        this.cityList = data;
        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          noDataAvailablePlaceholderText: 'Nod data available',
          closeDropDownOnSelection: true,
        };
      }, error => {
        this.SharedService.insertexceptions(this.currenturl,"GetCityMasterBYIDandLanguageID",error);
      }
    )
  }


  //GetAreaMaster

  public GetCityID(item1: any) {
    this.cityID = item1.id;
    this.getareamasterbyid();
  }


  public getareamasterbyid() {

    this.SupportService.GetAreaMasterByCityIDAndLanguageID(this.cityID, this.languageid).subscribe(
      data => {

        this.areaList = data;
        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,

        };
      }, error => {
        this.SharedService.insertexceptions(this.currenturl,"GetAreaMasterByCityIDAndLanguageID",error);
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

  public GetCountryID(even: any) {

    this.countryid = even.target.value

    this.getcitymaster();
  }

  public getcitymaster() {
    this.SupportService.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {

        this.citylist = data;

      }, error => {
        this.SharedService.insertexceptions(this.currenturl,"GetCityMasterBYIDandLanguageID",error);
      }
    )
  }

  public updatedeilas() {
    var entity = {
      'ID': this.suportid,
      'Name': this.doctorname,
      'MobileNumber': this.phoneno,
      'EmailID': this.email,
      'GenderID': Number(this.gender),
      'Description': this.description,
      'CityID': this.cityID,
      'AreaID': this.areaID,
      'Pincode': this.pincode,
      'CountryID': this.countryID,
      'UserName': this.username,
      'Password': this.password,
      'Address': this.address
    }
    this.SupportService.UpdateSupportRegistration(entity).subscribe(data => {
      let res = data;
    
      this.getdocdetails();
    },error=>{
      this.SharedService.insertexceptions(this.currenturl,"UpdateSupportRegistration",error);
    })

  }




}
