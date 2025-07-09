import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json';

@Component({
  selector: 'app-diagnostic-lab-agenda',
  templateUrl: './diagnostic-lab-agenda.component.html',
  styleUrls: ['./diagnostic-lab-agenda.component.css']
})
export class DiagnosticLabAgendaComponent implements OnInit {
  loader: boolean | undefined;

  constructor(private CommonService: CommonService,private SharedService:SharedService) { }
  public languageid: any;
  public labels: any;
  public labels1: any;
  public Workingdetails: any;
  public diagnosticid: any;
  public term: any;
  SelectLabel: any;
  // public dayid = []
  search: any;
  public todaydate: any;
  public today = new Date();
  public recepid: any;
  public showedit: any;
  public labelsss: any;
  term1: any;
  timechangedate1: any;
  public totalappointments: any;
  public diagnosticlist: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  todaydate1: any;
  currentUrl:any;


  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
    this.mrngfromid = "";
    this.mrngtoid = "";
    this.typeidss = 2;
    this.loader = true;
    this.recepid = sessionStorage.getItem('Receptionstid');
    if (this.recepid == undefined) {
      this.showedit = 1;
    }
    else {
      this.showedit = 0;
    }
    document.getElementById("defaultOpen")!.click();
    this.getWorkingdetils();
    // this.getWorkingdetils();
    // this.GetdicgnosticMasterSlotByID();
    // this.getdiagnosticforadmin();
    this.GetdicgnosticMasterSlotByID()
  }




  public getdiagnosticforadmin() {

    this.CommonService.GetDiagnosticForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;
        this.loader = false;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticForAdminByLanguageID",error);
      }
    )
  }

  public DayDatelist: any;


  public date1: any;
  public day1: any;



  public date2: any;
  public day2: any;


  public date3: any;
  public day3: any;


  public date4: any;
  public day4: any;

  public date5: any;
  public day5: any;

  public date6: any;
  public day6: any;

  public date7: any;
  public day7: any;

  public getWorkingdetils() {

    this.CommonService.GetDiaGnosticSlotsByCalender(this.diagnosticid, this.languageid, this.todaydate, this.typeidss).subscribe(
      data => {
        this.DayDatelist = data[0];
        this.Workingdetails = data[1];

        this.date1 = this.DayDatelist[0].date,
          this.day1 = this.DayDatelist[0].day

        this.date2 = this.DayDatelist[1].date,
          this.day2 = this.DayDatelist[1].day

        this.date3 = this.DayDatelist[2].date,
          this.day3 = this.DayDatelist[2].day

        this.date4 = this.DayDatelist[3].date,
          this.day4 = this.DayDatelist[3].day

        this.date5 = this.DayDatelist[4].date,
          this.day5 = this.DayDatelist[4].day

        this.date6 = this.DayDatelist[5].date,
          this.day6 = this.DayDatelist[5].day

        this.date7 = this.DayDatelist[6].date,
          this.day7 = this.DayDatelist[6].day
        this.loader = false;
      },
      error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDiaGnosticSlotsByCalender",error);
      }
    );
  }



  public GetDiagnosticcenterID(even: any) {

    this.diagnosticid = even.target.value;
    this.loader = true;
    this.getWorkingdetils();
  }


  public GetDoctorDates(Newdate: Date) {
    this.loader = true;
    // this.todaydate = even.toLocaleString().split(',')[0];
    this.todaydate = this.CommonService.GetDates(Newdate)

    this.getWorkingdetils();
  }


  public dayid: any;
  public appointmentdate: any;
  public slotid: any;
  public typeid: any;


  public GetDay1Details(details: any) {

    this.dayid = details.day1DayID
    this.appointmentdate = details.day1AppointmentDate
    this.slotid = details.day1SlotID
    this.typeid = details.day1TypeID
    this.totalappointments = details.day1Appointments
  }

  public GetDay2Details(details: any) {

    this.dayid = details.day2DayID
    this.appointmentdate = details.day2AppointmentDate
    this.slotid = details.day2SlotID
    this.typeid = details.day2TypeID
    this.totalappointments = details.day2Appointments
  }

  public GetDay3Details(details: any) {

    this.dayid = details.day3DayID
    this.appointmentdate = details.day3AppointmentDate
    this.slotid = details.day3SlotID
    this.typeid = details.day3TypeID
    this.totalappointments = details.day3Appointments
  }


  public GetDay4Details(details: any) {

    this.dayid = details.day4DayID
    this.appointmentdate = details.day4AppointmentDate
    this.slotid = details.day4SlotID
    this.typeid = details.day4TypeID
    this.totalappointments = details.day4Appointments
  }


  public GetDay5Details(details: any) {

    this.dayid = details.day5DayID
    this.appointmentdate = details.day5AppointmentDate
    this.slotid = details.day5SlotID
    this.typeid = details.day5TypeID
    this.totalappointments = details.day5Appointments
  }


  public GetDay6Details(details: any) {

    this.dayid = details.day6DayID
    this.appointmentdate = details.day6AppointmentDate
    this.slotid = details.day6SlotID
    this.typeid = details.day6TypeID
    this.totalappointments = details.day6Appointments
  }


  public GetDay7Details(details: any) {

    this.dayid = details.day7DayID
    this.appointmentdate = details.day7AppointmentDate
    this.slotid = details.day7SlotID
    this.typeid = details.day7TypeID
    this.totalappointments = details.day7Appointments
  }


  public insertdetails() {
    this.showPopup = 0;
    this.loader = true;
    var entity = {
      'DiagnosticCenterID': this.diagnosticid,
      'DiagnosticSlotID': this.slotid,
      'DayID': this.dayid,
      'TypeID': this.typeid,
      'AppointmentDate': this.appointmentdate,
      'TotalAppointments': this.totalappointments,
      'BookTypeID': this.typeidss
    }
    this.CommonService.InsertDiagnosticRelatedSlotsByDateWise(entity).subscribe(data => {
      this.CommonService.GetDiagnosticCancelledAppointmentByDateWise(this.diagnosticid, this.slotid, this.appointmentdate).subscribe(data => {
      })

      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.getWorkingdetils()

    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertDiagnosticRelatedSlotsByDateWise",error);
    })
  }







  public typeidss: any;


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
    let ele = document.getElementById(cityName) as HTMLElement
    ele.style.display = "block";
    evt.currentTarget.className += " active";
  }


  public typeID: any;

  public GetTypeID(even: any) {
    this.typeID = even.target.value;
    this.totalappointments = 0;
  }


  public slotslist: any;

  public mrngfromlist: any;
  public diagnsticfromlist: any;

  public GetdicgnosticMasterSlotByID() {

    this.CommonService.GetDiagnosticSlotMasterByTimeID(1).subscribe(
      data => {

        this.slotslist = data;
        this.mrngfromlist = this.slotslist;

        this.diagnsticfromlist = this.slotslist;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticSlotMasterByTimeID",error);
      }
    )
  }

  public timechangedate: any;
  public dayslist: any;
  public dayname: any;
  public dayidslist: any;
  public timechangedayid: any;



  // public GetTimewisechangedate(even) {
  //   this.timechangedate = even.toLocaleString().split(',')[0];
  //   this.Getdaystime()

  // }

  public datechangedayid: any;

  public GetdaychangeDate(NewDate: Date) {
    this.daychangedate = this.CommonService.GetDates(NewDate)
    // this.daychangedate = even.toLocaleString().split(',')[0];
    this.Getdays()
  }

  public Getdays() {

    this.CommonService.GetDaysHomecare(this.daychangedate).subscribe(data => {

      this.dayslist = data[0];
      this.dayname = this.dayslist.dayName

      this.Getdayssid();
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl,"GetDaysHomecare",error);
    })
  }
  public Getdayssid() {
    this.CommonService.GetDayID(this.dayname).subscribe(data => {

      this.dayidslist = data;
      this.datechangedayid = this.dayidslist[0].dayID;

    }, error => {
      this.SharedService.insertexceptions(this.currentUrl,"GetDayID",error);
    })
  }


  public timewiseappointmentid: any;
  public Daywiseappointmentid: any;
  public daychangedate: any;



  public InsertDayWiseSlots() {
    this.showPopup = 0;
    if (this.daychangedate == undefined || this.daychangedate == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 1;
    }
    else if (this.Daywiseappointmentid == undefined || this.Daywiseappointmentid == null) {
      this.showPopup = 1;
      this.messageID = 32;
      this.typeofPopUp = 1;
    }
    else {

      for (let i = 0; i < this.slotslist.length; i++) {
        this.loader = true;
        var entity = {
          'DiagnosticCenterID': this.diagnosticid,
          'DiagnosticSlotID': this.slotslist[i].id,
          'DayID': this.datechangedayid,
          'TypeID': this.Daywiseappointmentid,
          'AppointmentDate': this.daychangedate,
          'TotalAppointments': this.totalappointments,
          'BookTypeID': this.typeidss
        }
        this.CommonService.InsertDiagnosticRelatedSlotsByDateWise(entity).subscribe(data => {
          this.CommonService.GetDiagnosticCancelledAppointmentByDateWise(this.diagnosticid, this.slotslist[i].id, this.daychangedate).subscribe(data => {
          })


        },error=>{
          this.SharedService.insertexceptions(this.currentUrl,'InsertDiagnosticRelatedSlotsByDateWise',error);
        })

      }

      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.getWorkingdetils();
      this.totalappointments = ""

    }
  }




  // slot time wise





  public GetTimewisechangedate(NewDate: Date) {
    // this.timechangedate = even.toLocaleString().split(',')[0];

    this.timechangedate = this.CommonService.GetDates(NewDate)
    this.Getdaystime()

  }


  public Getdaystime() {

    this.CommonService.GetDaysHomecare(this.timechangedate).subscribe(data => {

      this.dayslist = data[0];
      this.dayname = this.dayslist.dayName

      this.Getdayssidbytime();
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl,"GetDaysHomecare",error);
    })
  }

  public Getdayssidbytime() {
    this.CommonService.GetDayID(this.dayname).subscribe(data => {

      this.dayidslist = data;
      this.timechangedayid = this.dayidslist[0].dayID;

    }, error => {
      this.SharedService.insertexceptions(this.currentUrl,"GetDayID",error);
    })
  }


  public mrngfromid: any;
  public mrngfromslot: any;
  public mrngtolist: any;
  public mrngtoid: any;
  public mrngtoslot: any;

  public getmrngfrom(even: any) {
    this.mrngfromid = even.target.value;
    var qwerty = this.mrngfromlist.filter((x: { id: any; }) => x.id == this.mrngfromid);
    this.mrngfromslot = qwerty[0].slots;
    this.mrngtolist = this.mrngfromlist.filter((x: { id: number; }) => x.id > this.mrngfromid);
    this.mrngtoid = "";
  }


  public timewisechangeslotlist: any;

  public getmrngto(even: any) {
    this.mrngtoid = even.target.value;
    var qwerty = this.mrngtolist.filter((x: { id: any; }) => x.id == this.mrngtoid);
    this.mrngtoslot = qwerty[0].slots;
    this.GetGetSlotsByIDPlanning();
  }

  public GetGetSlotsByIDPlanning() {
    this.CommonService.GetDiagnosticSlotsByIDPlanning(this.mrngfromid, this.mrngtoid).subscribe(data => {


      this.timewisechangeslotlist = data;

    }, error => {
      this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticSlotsByIDPlanning",error);
    })
  }




  public InsertTimeWiseSlots() {
    this.showPopup = 0
    if (this.timechangedate == undefined || this.timechangedate == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 1;
    }
    else if (this.timewiseappointmentid == undefined || this.timewiseappointmentid == null) {
      this.showPopup = 1;
      this.messageID = 32;
      this.typeofPopUp = 1;
    }
    else if (this.mrngfromid == "" || this.mrngtoid == "") {
      this.showPopup = 1;
      this.messageID = 37;
      this.typeofPopUp = 1;
    }
    else {

      for (let i = 0; i < this.timewisechangeslotlist.length; i++) {
        this.loader = true;
        var entity = {
          'DiagnosticCenterID': this.diagnosticid,
          'DiagnosticSlotID': this.timewisechangeslotlist[i].id,
          'DayID': this.timechangedayid,
          'TypeID': this.timewiseappointmentid,
          'AppointmentDate': this.timechangedate,
          'TotalAppointments': this.totalappointments,
          'BookTypeID': this.typeidss
        }
        this.CommonService.InsertDiagnosticRelatedSlotsByDateWise(entity).subscribe(data => {
          this.CommonService.GetDiagnosticCancelledAppointmentByDateWise(this.diagnosticid, this.timewisechangeslotlist[i].id, this.timechangedate).subscribe(data => {
          })

        },error=>{
          this.SharedService.insertexceptions(this.currentUrl,"InsertDiagnosticRelatedSlotsByDateWise",error);
        })
      }
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.getWorkingdetils();
      this.timewiseappointmentid = "";
      this.timechangedate = "";
      this.mrngtoid = "";
      this.mrngtoid = "";
      this.totalappointments = ""


    }
  }

}