import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-patient-wallet',
  templateUrl: './patient-wallet.component.html',
  styleUrls: ['./patient-wallet.component.css']
})
export class PatientWalletComponent implements OnInit {

  loader: boolean | undefined;
  currentUrl: any;
  languageid: any;
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  countryid: any;
  cityid: any;
  countrylist: any;
  walletlist: any;
  dummlist: any;
  count: any;
  citylist: any;
  arealist: any;
  areaid: any;
  p: any;
  search: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  user: any;
  labels:any;
  
  constructor(private MenuService: MenuService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.user = sessionStorage.getItem('user');
    this.GetCountryMaster();
    this.countryid = 0;
    this.cityid = 0;
    this.startdate = "2019-01-01";
    this.enddate = "2050-01-01";
    this.GetWalletDetails();


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

  //Get Country ID
  public GetCountryID(even: any) {
    if (even.target.value != 0) {
      this.countryid = even.target.value;
      this.walletlist = this.dummlist.filter((x: { countryID: any; }) => x.countryID == this.countryid)
      this.count = this.walletlist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.GetWalletDetails();
    }
  }
  Getwalletinfo(even:any){
    if (even.target.value != 0) {   
      this.walletlist = this.dummlist.filter((x: { walletAmount: any; }) => x.walletAmount >0)
      this.count = this.walletlist.length;
   
    }
    else if (even.target.value == 0) {
      this.GetWalletDetails();
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

  //Get City ID
  public GetCityID(even: any) {
    if (even.target.value != 0) {

      this.cityid = even.target.value;
      this.getareamasterbyid()
      this.walletlist = this.dummlist.filter((x: { cityID: any; }) => x.cityID == this.cityid)
      this.count = this.walletlist.length
    }
    else if (even.target.value == 0) {
      this.getcity()
    }
  }


  //Get Master 
  public getareamasterbyid() {

    this.MenuService.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
        this.arealist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetAreaMasterByCityIDAndLanguageID", error);
      }
    )
  }

  //Get AreaID

  public GetAreaID(even: any) {
    if (even.target.value != 0) {

      this.areaid = even.target.value;
      this.walletlist = this.dummlist.filter((x: { areaID: any; }) => x.areaID == this.areaid)
      this.count = this.walletlist.length
    }
    else if (even.target.value == 0) {
      this.GetWalletDetails();
    }
  }

  //Get Wallet Details
  public GetWalletDetails() {
    debugger
    this.MenuService.GetPatientWalletDetailsBySdateAndDate(this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.loader = false;
        this.walletlist = data;
        this.dummlist = this.walletlist
        this.count = this.walletlist.length
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatientWalletDetailsBySdateAndDate", error);
      }
    )
  }


  public GetPatientIDAndMoney(patientID: any, walletAmount: any) {

    this.patientid = patientID;
    this.walletamount = walletAmount
  }


  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.MenuService.GetDates(data[0]);
    this.enddate = this.MenuService.GetDates(data[1]);
    this.GetWalletDetails();

  }





  walletamount: any;
  totaladdmoney: any;
  entermoney: any;
  patientid: any;
  reason: any;
  public GetAddMoneyToWallet(money: any) {
  
//    this.totaladdmoney = Number(this.walletamount) + Number(money)
this.totaladdmoney=money;
    this.entermoney = money;
  }

  money: any;
  public updatedateails() {
    
    this.loader = true;
    this.showPopup = 0;

    var entity = {
      'PatientID': this.patientid,
      'WalletAmount': this.totaladdmoney
    }
    this.MenuService.UpdatePatientWalletDetails(entity).subscribe(async data => {
      let res = data;

      await this.insertdetails();
      await  this.GetWalletDetails();
      this.entermoney = "";
      this.reason = ""
      this.showPopup = 1;
      this.messageID = 78;
      this.typeofPopUp = 1;
      this.loader = false;
    })
  }

  serverdateandtime: any;
  servertime: any;
  serverdate: any;

  public getserverdateandtime() {

    this.MenuService.GetServerDateAndTime().subscribe(
      data => {

        this.serverdateandtime = data;
        this.servertime = this.serverdateandtime.presentTime,
          this.serverdate = this.serverdateandtime.todaydate

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetServerDateAndTime",error);
      }
    )
  }


  async insertdetails() {
    var entity = {
      'PatientID': this.patientid,
      'Date': this.serverdate,
      'Time': this.servertime,
      'User': this.user,
      'Reason': this.reason,
      'Amount': this.entermoney
    }
    this.MenuService.InsertPatient_WalletLog(entity).subscribe(async data => {
      if (data != 0) {

      }
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertPatient_WalletLog",error);
    })

  }
}
