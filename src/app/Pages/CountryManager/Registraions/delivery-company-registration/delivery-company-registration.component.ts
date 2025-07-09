import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/countrymanager/countrylabels.json';

@Component({
  selector: 'app-delivery-company-registration',
  templateUrl: './delivery-company-registration.component.html',
  styleUrls: ['./delivery-company-registration.component.css']
})
export class DeliveryCompanyRegistrationComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService,
    private ActivatedRoute:ActivatedRoute) { }

  languageID: any;
  countryList: any;
  loader: boolean | undefined;
  countrydd: any;
  countryID: any;
  regionList: any;
  regiondd: any;
  search: any;
  regionID: any;
  cityList: any;
  citydd: any;
  cityID: any;
  areaList: any;
  areadd: any;
  areaID: any;
  pinCode: any;
  attachmentUrl: any = [];
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  citssid: any;
  multiplecityid: any;
  multipincode: any;
  companyname: any;
  contactname: any;
  phno: any;
  email: any;
  address: any;
  deliverytypeid: any;
  region: any;
  public cityidss = [];
  multipincodes = [];
  id: any;
  details: any;
  labels:any;
  showedit:any;
  province:any;
  city:any;




  ngOnInit(): void {
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.region=this.labels.selectRegion,
    this.province=this.labels.selectProvince,
    this.city=this.labels.selectCity,
    this.search=this.labels.search,
    this.countryID = "";
    this.getCountryMaster();
    this.deliverytypeid = "";

    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == undefined) {
        this.showedit = 0;      
      }
      else {
        this.id=atob(this.id);
        this.showedit = 1;
        this.GetDelivarycompany();
      }
    }
    )

  }




  public GetDelivarycompany() {
    this.CommonService.GetDeliveryCompanyByIDAndLanguageID(this.id, this.languageID).subscribe(data => {
      this.details = data[0];
      this.companyname = this.details.companyName,
        this.contactname = this.details.contactPerson,
        this.phno = this.details.phoneNo,
        this.email = this.details.emailID,
        this.address = this.details.address,
        this.countryID = this.details.countryID,
        this.cityID = this.details.cityID,
        this.areaID = this.details.areaID,
        this.pinCode = this.details.pincode,

        this.getCountryMaster();
      // this.getareamaster()
      this.getareamasterbyid();

    }, error => {

    })
  }


  // getCountry 

  public getCountryMaster() {
    this.CommonService.GetCountryMasterByLanguageID(this.languageID).subscribe(
      data => {
        this.countryList = data;
        this.loader = false;
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
          

        };
      }, error => {
        // this.SharedService.insertexceptions(this.currentUrl, "GetCountryMasterByLanguageID", error);
      }
    )
  }

  //getRegion

  public getCountryID(even: any) {

    this.countryID = even.target.value;
    this.CommonService.GetRegionMasterWeb(this.countryID).subscribe(
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
          searchPlaceholderText: this.search

        };
      }, error => {
        this.loader = false;

      }
    )

  }





  //GetProvince

  GetRegionID(item: any) {
    this.regionID = item.id

    this.CommonService.GetCityMasterBYIDandLanguageID(this.regionID, this.languageID).subscribe(
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
          searchPlaceholderText: this.search

        };
      }, error => {
        this.loader = false;

      }
    )
  }


  //GetAreaMaster

  public GetCityID(item1: any) {

    this.cityID = item1.id;
    this.getareamasterbyid();
  }


  public getareamasterbyid() {

    this.CommonService.GetAreaMasterByCityIDAndLanguageID(this.cityID, this.languageID).subscribe(
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
          searchPlaceholderText: this.search

        };
      }, error => {
        this.loader = false;

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

  // Add CompanyImages
  files: File[] = [];

  onSelect(event: any) {
    this.loader = true;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadattachments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.attachmentUrl.splice(this.files.indexOf(event), 1);

  }
  public uploadattachments() {
    this.CommonService.pharmacyphoto(this.files).subscribe((res: any) => {
      this.loader = false;
      this.attachmentUrl.push(res);
    }, error => {
      console.log("Error with PrescriptionPhoto", error);
      this.loader = false;
      // this.SharedService.insertexceptions(this.currentUrl, "Prescription", error);
    })
  }






  public GetDeliveryTypeID(even: any) {

    this.deliverytypeid = even.target.value;
  }

  public insertdeliverycompany() {
    this.showPopup=0;
    if (this.countryID == undefined || this.countryID.length == 0) {
      this.showPopup = 1;
      this.messageID = 5;
      this.typeofPopUp = 2;

    }
    else if (this.cityID == undefined || this.cityID.length == 0) {
      this.showPopup = 1;
      this.messageID = 6;
      this.typeofPopUp = 2;
    }
    else if (this.areaID == undefined || this.areaID.length == 0) {
      this.showPopup = 1;
      this.messageID = 7;
      this.typeofPopUp = 2;
    }
    else {
      
      this.citssid = this.cityidss;
      this.multiplecityid = this.citssid.join(',');

      var mulpin = this.multipincodes;
      this.multipincode = mulpin.join(',');
      
      var entity = {
        'CompanyName': this.companyname,
        'ContactPerson': this.contactname,
        'PhoneNo': this.phno,
        'EmailID': this.email,
        'Address': this.address,
        'CountryID': this.countryID,
        'CityID': this.cityID,
        'AreaID': this.areaID,
        'PhotoURL': this.attachmentUrl[0],
        'Pincode': this.pinCode,
        'DeliveryType': this.deliverytypeid,
        'CityIDs': this.multiplecityid,
        'CityPincodes': this.multipincode
      }
      this.CommonService.InsertDeliveryCompany(entity).subscribe(data => {

        this.showPopup = 1;
        this.messageID = 11;
        this.typeofPopUp = 1;
        location.href = '#/countrymanager/deliverydash';
      }, error => {

      })
    }
  }



  public updatedetails() {
    this.showPopup=0;
    var entity = {
      'LanguageID': this.languageID,
      'ID': this.id,
      'CompanyName': this.companyname,
      'ContactPerson': this.contactname,
      'PhoneNo': this.phno,
      'EmailID': this.email,
      'Address': this.address,
      'CountryID': this.countryID,
      'CityID': this.cityID,
      'AreaID': this.areaID,
      'Pincode': this.pinCode
    }
    this.CommonService.UpdateDeliveryCompany(entity).subscribe(data => {
      let res=data;
      this.showPopup=1;
      this.messageID=34;
      this.typeofPopUp=1;
      location.href = "#/countrymanager/deliverydash/"
    })

  }



}
