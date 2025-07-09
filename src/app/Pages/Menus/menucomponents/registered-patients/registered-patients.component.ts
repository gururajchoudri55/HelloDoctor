import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-registered-patients',
  templateUrl: './registered-patients.component.html',
  styleUrls: ['./registered-patients.component.css']
})
export class RegisteredPatientsComponent implements OnInit {
  loader: boolean | undefined;
  currentUrl: any;
  languageid: any;
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  patientslist: any;
  dummlist: any;
  count: any;
  p: any;
  countryid: any;
  countrylist: any;
  citylist: any;
  cityid: any;
  arealist: any;
  areaid: any;
  search: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  labels: any;
  roleID: any;


  constructor(private MenuService: MenuService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.roleID=sessionStorage.getItem("roleid")
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    // var da te = new Date();
    // this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    // this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // var start = new Date(date.getFullYear(), date.getMonth(), 1);
    // var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // const format = 'yyyy-MM-dd';
    // const locale = 'en-US';
    // this.startdate = formatDate(this.startdate, format, locale);

    // const format1 = 'yyyy-MM-dd';
    // const locale1 = 'en-US';
    // this.enddate = formatDate(this.enddate, format1, locale1);  
    // this.bsRangeValue = [start, end];

    this.GetCountryMaster();
    this.countryid = 0;
    this.cityid = 0;
    this.startdate = "2019-01-01";
    this.enddate = "2050-01-01";
    this.active=0;
    this.typetest=0;
    this.Getregisterdpatients();
  }

  //Get Country Master
  public GetCountryMaster() {
    this.MenuService.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.countrylist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCountryMasterByLanguageID", error);
      }
    )
  }

  //Get CountryID

  public GetCountryID(even: any) {
    // filter
    if (even.target.value != 0) {

      this.countryid = even.target.value;

      this.patientslist = this.dummlist.filter((x: { countryID: any; hidden: any;downloadType: any;}) => x.countryID == this.countryid && x.hidden == this.active && x.downloadType == this.typetest )
      this.count = this.patientslist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.Getregisterdpatients();
    }

  }
  active:any;
  Activelist(even: any){
    ;
    this.active = even.target.value;
    if(this.active!="2" && this.typetest!="0"){
    // filter
    this.patientslist = this.dummlist.filter((x: { hidden: any;  downloadType: any; }) => x.hidden == this.active && x.downloadType == this.typetest );
    this.count = this.patientslist.length;      
    this.loader = false;
    }
    else if(this.active!="2"){
      this.patientslist = this.dummlist.filter((x: { hidden: any }) => x.hidden == this.active  );
    this.count = this.patientslist.length;      
    this.loader = false;
    }
    else{
      this.patientslist=this.dummlist;
      this.count = this.patientslist.length; 
    }
  }

  typetest:any;
  gettypetest(even: any){
    debugger
// filter
    this.typetest = even.target.value;
    if(this.typetest!="0"){
    this.patientslist = this.dummlist.filter((x: { downloadType: any; hidden: any;   }) => x.downloadType == this.typetest &&  x.hidden == this.active );
    this.count = this.patientslist.length;      
    this.loader = false;
    }
    else{
      this.patientslist=this.dummlist;
      this.count = this.patientslist.length; 
    }
  }
 
  //Get City
  public getcity() {

    this.MenuService.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {

        this.citylist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCityMasterBYIDandLanguageID", error);
      }
    )
  }

  //Get CityID
  public GetCityID(even: any) {
    if (even.target.value != 0) {

      this.cityid = even.target.value;
      this.getareamasterbyid()
      this.patientslist = this.dummlist.filter((x: { cityID: any; }) => x.cityID == this.cityid)
      this.count = this.patientslist.length
    }
    else if (even.target.value == 0) {
      this.getcity()
    }
  }

  //Get AreaMasterID
  public getareamasterbyid() {

    this.MenuService.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {

        this.arealist = data;

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetAreaMasterByCityIDAndLanguageID", error);
      }
    )
  }


  //GEt Areaa ID
  public GetAreaID(even: any) {
    if (even.target.value != 0) {

      this.areaid = even.target.value;
      this.patientslist = this.dummlist.filter((x: { areaID: any; }) => x.areaID == this.areaid)
      this.count = this.patientslist.length
    }
    else if (even.target.value == 0) {
      this.Getregisterdpatients()
    }
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.MenuService.GetDates(data[0]);
    this.enddate = this.MenuService.GetDates(data[1]);
    this.Getregisterdpatients();

  }

  //To Get Registered Patients 
  public Getregisterdpatients() {
    this.MenuService.GetPatientRegistration(this.startdate, this.enddate,this.languageid).subscribe(
      data => {
        this.loader = false;
        this.patientslist = data;
        this.dummlist = this.patientslist
        this.count = this.patientslist.length
      },
      error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatientRegistration", error);
      }
    );
  }

  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //Enable Patient
  public Enablepatient(id: any) {
    this.showPopup = 0;
    this.MenuService.EnablePatientRegistration(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.Getregisterdpatients();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "EnablePatientRegistration", error);
      }
    )
  }

  //Disable patient
  public disablepatient(docid: any) {
    this.showPopup = 0;
    this.MenuService.DeletePatientRegistration(docid).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.Getregisterdpatients();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "DeletePatientRegistration", error);
      }
    )
  }

  mobilenNumber: any;
  emailID: any;
  id: any;
  passwordshow:any;
  editPatientID(list: any) {
    this.id = list.id
    this.mobilenNumber = list.mobileNumber,
      this.emailID = list.emailID,
      this.passwordshow=list.password
  }


  updatePatient() {
    this.showPopup = 0
    this.MenuService.updatePatientMobileno(this.id, this.mobilenNumber, this.emailID).subscribe(data => {
      this.showPopup = 1;
      this.typeofPopUp = 1;
      this.messageID = 34;
      this.Getregisterdpatients()
    })
  }
 
}


