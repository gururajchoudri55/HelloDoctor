import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-diagnostic-planning',
  templateUrl: './diagnostic-planning.component.html',
  styleUrls: ['./diagnostic-planning.component.css']
})
export class DiagnosticPlanningComponent implements OnInit {
  loader: boolean | undefined
  constructor(private CommonService: CommonService,private SharedService:SharedService) { }
  public languageid: any;
  public labels: any;
  public labels1: any;
  public Workingdetails: any;
  public diagnosticid: any;
  public dummworkingdetails: any;
  public diagnosticlist: any;

  public slotslist: any;
  public slotsdd: any;
  public slotslist1: any;
  public slotsdd1: any;
  public slotslist2: any;
  public slotsdd2: any;
  public slotslist3: any;
  public slotsdd3: any;
  public mrngslots = [];
  public afternoonslots = [];
  public evngslots = [];
  public nightslots = [];
  public tablecount: any;
  public mrngslotarray = [];
  public mrngslotarrayid = [];
  public slotname: any;
  public mrng: any;
  public slotnameid: any;
  public mrngid: any;
  public evngslotarray = [];
  public evngslotarrayid = [];
  public afternoonslotarray = [];
  public afternoonslotarrayid = [];
  public slotname1: any;
  public afternoon: any;
  public slotnameid1: any;
  public afternoonid: any;
  public slotname2: any;
  public evng: any;
  public slotnameid12: any;
  public evngid: any;
  public nightslotarray = [];
  public nightslotarrayid = [];

  public slotname3: any;
  public night: any;
  public slotnameid13: any;
  public nightid: any;
  public dropdownclear1 = [];
  public dropdownclear2 = [];
  public dropdownclear3 = [];
  public dropdownclear4 = [];
  public diadnosticdd = {};

  public dayslist: any;
  public daysdd = {}
  public dayid: any;
  public term: any;
  SelectLabel: any;
  // public dayid = []
  search: any;
  labels3: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  currentUrl:any;



  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
    this.typeidss = 2;
    this.getdiagnosticforadmin();
    document.getElementById("defaultOpen")?.click();
  }

  public getdiagnosticforadmin() {

    this.CommonService.GetDiagnosticForAdminByLanguageID(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.diagnosticlist = data;

      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticForAdminByLanguageID",error);
      }
    )
  }



  public GetDiagnosticcenterID(even: any) {

    this.diagnosticid = even.target.value;
    this.loader = true;
    this.getWorkingdetils();
  }




  public getWorkingdetils() {
    // this.Workingdetails.length = 0;
    this.CommonService.GetDiagnosticSlots(this.diagnosticid, this.languageid, this.typeidss).subscribe(
      data => {

        this.Workingdetails = data;
        this.loader = false;
      },
      error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticSlots",error);
      }
    );
  }

  timeid: any;


  public GetDiagnosticID(diagnosticCenterID: any, dayID: any, timeid: any) {

    this.diagnosticid = diagnosticCenterID,
      this.dayid = dayID,
      this.timeid = timeid
  }


  public id: any;
  public typeid: any;
  public slotid: any;
  public alltypeid: any;

  public GetMondayID(details: any) {

    this.id = details.mondayID;
    this.dayid = details.mondayDayID;
    this.typeid = details.monDayTypeID;
    this.slotid = details.mondaySlotID;
    this.alltypeid = details.monDayTypeID;
    this.totalappoiments = details.mondayTotalappointments;
  }


  public GetTuesDayID(details: any) {

    this.id = details.tuesdayID;
    this.dayid = details.tuesDayDayID;
    this.typeid = details.tueasDayTypeID;
    this.slotid = details.tuesadayslotID;
    this.alltypeid = details.tueasDayTypeID;
    this.totalappoiments = details.tuesdayTotalappointments;
  }


  public GetWednessDayID(details: any) {

    this.id = details.wednessdayID;
    this.dayid = details.wednessDayDayID;
    this.typeid = details.wednessDayTypeID;
    this.slotid = details.wedessdaySlotID;
    this.alltypeid = details.wednessDayTypeID;
    this.totalappoiments = details.wednessdayTotalappointments;
  }


  public GetThursadyID(details: any) {

    this.id = details.thursdayID;
    this.dayid = details.thursDayDayID;
    this.typeid = details.thurDayTypeID;
    this.slotid = details.thursdaySlotID;
    this.alltypeid = details.thurDayTypeID;
    this.totalappoiments = details.thusdayTotalappointments;
  }

  public GetFridayID(details: any) {

    this.id = details.fridayID;
    this.dayid = details.fridayDayDayID;
    this.typeid = details.friDayTypeID;
    this.slotid = details.fridaySlotID;
    this.alltypeid = details.friDayTypeID;
    this.totalappoiments = details.fridayTotalappointments;
  }

  public GetSaturdatID(details: any) {

    this.id = details.saturdayID;
    this.dayid = details.satDayDayID;
    this.typeid = details.satDayTypeID;
    this.slotid = details.saturdaySlotID;
    this.alltypeid = details.satDayTypeID;
    this.totalappoiments = details.satdayTotalappointments;
  }

  public GetSundayID(details: any) {

    this.id = details.sundayID;
    this.dayid = details.sunDayDayID;
    this.typeid = details.sunDayTypeID;
    this.slotid = details.sundaySlotID;
    this.alltypeid = details.sunDayTypeID;
    this.totalappoiments = details.sundayTotalappointments;

  }
  public totalappoiments: any;

  public updatedetails() {

    if (this.alltypeid == 4 && this.typeid == 1) {
      this.loader = true;
      this.getWorkingdetils()
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'DiagnosticSlotID': this.slotid,
        'DayID': this.dayid,
        'TypeID': this.typeid,
        'TotalAppointments': this.totalappoiments
      }
      this.CommonService.InsertDiagnosticRelatedSlotsWeb(entity).subscribe(data => {

        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1
        this.getWorkingdetils()
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertDiagnosticRelatedSlotsWeb",error);
      })
    }
    else if (this.alltypeid == 4 && this.typeid == 2) {

      this.loader = true;
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'DiagnosticSlotID': this.slotid,
        'DayID': this.dayid,
        'TypeID': this.typeid,
        'TotalAppointments': this.totalappoiments
      }
      this.CommonService.InsertDiagnosticRelatedSlotsWeb(entity).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1
        this.getWorkingdetils()
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertDiagnosticRelatedSlotsWeb",error);
      })

    }
    else if (this.alltypeid == 1 && this.typeid == 4) {
      this.loader = true;
      this.CommonService.DeleteDiagnosticRelatedSlots(this.id).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1
        this.getWorkingdetils()
      })

    }
    else if (this.alltypeid == 2 && this.typeid == 4) {
      this.loader = true;
      this.CommonService.DeleteDiagnosticRelatedSlots(this.id).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1
        this.getWorkingdetils()
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"DeleteDiagnosticRelatedSlots",error);
      })
    }
    else if (this.typeid == 1 || this.typeid == 2 && this.alltypeid == 1 || this.alltypeid == 2) {
      this.loader = true;
      var entity1 = {
        'ID': this.id,
        'TypeID': this.typeid,
        'TotalAppointments': this.totalappoiments
      }
      this.CommonService.UpdateDiagnosticRelatedSlotsWeb(entity1).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1
        this.getWorkingdetils()
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"UpdateDiagnosticRelatedSlotsWeb",error);
      })
    }
  }



  public typeidss: any;
  style: any;

  public openCity(evt: any, cityName: any) {

    var i, tabcontent, tablinks;

    if (cityName == "Diagnosticcenter") {
      this.typeidss = 2;
      this.loader = true;
      this.getWorkingdetils();
    }
    else {
      this.typeidss = 1;
      this.loader = true;
      this.getWorkingdetils();
    }

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    let city = document.getElementById(cityName) as HTMLElement
    city.style.display = "block";
    evt.currentTarget.className += " active";
  }
}
