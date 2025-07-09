import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json'


@Component({
  selector: 'app-prescriptionverifier',
  templateUrl: './prescriptionverifier.component.html',
  styleUrls: ['./prescriptionverifier.component.css']
})
export class PrescriptionverifierComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService,
    private ActivatedRoute:ActivatedRoute) { }

  languageID: any;
  countryList: any;
  loader: boolean | undefined;
  countrydd: any;
  currentUrl: any;
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
  attachmentUrl: any=[];
  region: any;
  province: any;
  city: any;
  password: any;
  doctorname: any;
  phoneno: any;
  email: any;
  address: any;
  description: any;
  gender: any;
  username: any;
  messageID:any;
  typeofPopUp:any;
  showPopup:any;
  id:any;
  showedit:any;
  country:any;
  localdoclist:any;
  cityid:any;
  areaid:any;
  pincode:any;
  countryid:any;
  labels:any;





  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.region=this.labels.selectRegion,
    this.province =this.labels.selectProvince,
    this.city=this.labels.selectCity,
    this.search=this.labels.search,
    this.getCountryMaster();
    this.countryID = "";
    this.ActivatedRoute.params.subscribe(params => {

      this.id = params['id'];

      if (this.id == undefined) {
        this.showedit = 0;
       
      }
      else {
        this.id=atob(this.id);
        this.showedit = 1;
        this.getlocaldoctors()
      }

    

    }
    )

  }




  public getlocaldoctors() {
    this.CommonService.GetLocalDoctorRegistration(this.languageID).subscribe(
      data => {
        this.loader=false;
        this.localdoclist = data;
        var list = this.localdoclist.filter((x: { id: any; }) => x.id == this.id)
        this.doctorname = list[0].doctorName,
          this.address = list[0].address,
          this.phoneno = list[0].mobileNumber,
          this.email = list[0].emailID,
          this.description = list[0].description,
          this.gender = list[0].genderID,
          this.cityID = list[0].cityID,
          this.areaID = list[0].areaID,
          this.pinCode = list[0].pincode,
          this.countryID = list[0].countryID,
          this.username = list[0].userName,
          this.password = list[0].password

        this.CommonService.GetCityMasterBYIDandLanguageID(this.countryID, this.languageID).subscribe(
          data => {

            this.cityList = data;
          }, error => {
            this.SharedService.insertexceptions(this.currentUrl,'GetCityMasterBYIDandLanguageID',error);
          }
        )

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
            this.SharedService.insertexceptions(this.currentUrl,'GetRegionMasterWeb',error);
    
          }
        )
        this.getareamasterbyid();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,'GetRegionMasterWeb',error);
      }
    )
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
          searchPlaceholderText: this.search
        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCountryMasterByLanguageID", error);
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
          searchPlaceholderText: this.search,

        };
      }, error => {
        this.loader = false;
       this.SharedService.insertexceptions(this.SharedService,'GetRegionMasterWeb',error);
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
        this.SharedService.insertexceptions(this.currentUrl,'GetCityMasterBYIDandLanguageID',error);
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
        this.SharedService.insertexceptions(this.currentUrl,'GetAreaMasterByCityIDAndLanguageID',error);
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


  // Add Prescriptions
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
    this.CommonService.DoctorPhotoUpload(this.files).subscribe((res: any) => {
      this.loader = false;
      this.attachmentUrl.push(res);
    }, error => {
      console.log("Error with PrescriptionPhoto", error);
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "Prescription", error);
    })
  }







  public insertdetails() {
    this.showPopup=0
    if (this.countryID == undefined || this.countryID.length == 0) {
      this.showPopup=1;
      this.messageID=5;
      this.typeofPopUp=2;
    
    }
    else if (this.cityID == undefined || this.cityID.length == 0) {
      this.showPopup=1;
      this.messageID=6;
      this.typeofPopUp=2;
    }
    else if (this.areaID == undefined || this.areaID.length == 0) {
      this.showPopup=1;
      this.messageID=7;
      this.typeofPopUp=2;
    }
    else {
      if (this.attachmentUrl.length == 0) {

        this.attachmentUrl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
      }
      this.password = Math.random().toString(36).slice(-8);
      var entity = {
        'DoctorName': this.doctorname,
        'MobileNumber': this.phoneno,
        'EmailID': this.email,
        'Address': this.address,
        'PhotoUrl': this.attachmentUrl[0],
        'Description': this.description,
        'GenderID': Number(this.gender),
        'CityID': this.cityID,
        'LanguageID': '1',
        'AreaID': this.areaID,
        'Pincode': this.pinCode,
        'CountryID': this.countryID,
        'UserName': this.username,
        'Password': this.password
      }
      this.CommonService.InsertLocalDoctorRegistration(entity).subscribe(data => {
        if (data != 0) {
          // this.pinno = data;
          // this.sendmail()
          this.showPopup=1;
          this.messageID=52;
          this.typeofPopUp=1;
          // location.href = "#/LocalDocDash"
        }
        else {
          this.showPopup=1;
          this.messageID=15;
          this.typeofPopUp=2;
        
          // location.href = "#/LocalDocDash"
        }
      })
    }
  }

  public updatedetails() {
    this.showPopup=0
    if (this.countryID == undefined || this.countryID.length == 0) {
      this.showPopup=1;
      this.messageID=5;
      this.typeofPopUp=2;
     
    }
    else if (this.cityID == undefined || this.cityID.length == 0) {
      this.showPopup=1;
      this.messageID=6;
      this.typeofPopUp=2;
    }
    else if (this.areaID == undefined || this.areaID.length == 0) {
      this.showPopup=1;
      this.messageID=7;
      this.typeofPopUp=2;
    }
    else {

      var entity = {
        'ID': this.id,
        'DoctorName': this.doctorname,
        'MobileNumber': this.phoneno,
        'EmailID': this.email,
        'Address': this.address,
        'Description': this.description,
        'GenderID': Number(this.gender),
        'CityID': this.cityID,
        'LanguageID': '1',
        'AreaID': this.areaID,
        'Pincode': this.pinCode,
        'CountryID': this.countryID,
        'UserName': this.username,
        'Password': this.password
      }
      this.CommonService.UpdateLocalDoctorRegistration(entity).subscribe(data => {
        let res=data;
      this.showPopup=1;
      this.messageID=34;
      this.typeofPopUp=1;
        // location.href = "#/LocalDocDash"
      })
    }
  }







}
