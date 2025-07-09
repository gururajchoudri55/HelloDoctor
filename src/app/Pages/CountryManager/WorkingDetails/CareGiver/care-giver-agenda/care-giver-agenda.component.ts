import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';

@Component({
  selector: 'app-care-giver-agenda',
  templateUrl: './care-giver-agenda.component.html',
  styleUrls: ['./care-giver-agenda.component.css']
})
export class CareGiverAgendaComponent implements OnInit {
  loader: boolean | undefined
  constructor(private CommonService: CommonService, private SharedService: SharedService) { }
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  todaydatess: any;
  public physioid: any;
  public languageid: any;
  public Workinglist: any;
  public timeSheetTablearray = [];
  public TodatDate: any;
  public workingdetails: any;
  showmonth: any;
  month: any;
  year: any;
  labels: any;
  dummlistphysiolist: any;
  hospitalclinicid: any;
  physioist: any;
  count: any;
  public search: any;
  public phsyodd = {};
  todaydate: any;
  today = new Date();
  term: any;
  currentUrl: any;
  selectcareGiver:any;

  ngOnInit(): void {
    this.loader = true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.selectcareGiver=this.labels.selectCaregiver;
    this.search=this.labels.search;
    this.currentUrl = window.location.href;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.getphysio();
  }





  public getphysio() {
    if (this.hospitalclinicid != undefined) {
      this.CommonService.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.dummlistphysiolist = data;
          this.physioist = this.dummlistphysiolist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.physioist.length

          this.phsyodd = {
            singleSelection: true,
            idField: 'physiotherapyID',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true
          };
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl, "GetPhysiotherapyHospitalDetails", error);
        }
      )
    }
    else if (this.hospitalclinicid == undefined) {
      this.CommonService.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.dummlistphysiolist = data;
          this.physioist = data;
          this.count = this.physioist.length

          this.phsyodd = {
            singleSelection: true,
            idField: 'physiotherapyID',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            // searchPlaceholderText: this.search,
          };
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl, "GetPhysiotherapyHospitalDetails", error);
        }
      )
    }

  }



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
  DayDatelist: any;



  public GetPhjysioworkingDatewise() {
    
    this.CommonService.GetPhysioWorkingDetailsDyWise(this.physioid, this.slotTypeID, this.todaydate, this.languageid).subscribe(
      data => {
        //this.workingdetails = data;
        this.DayDatelist = data[0];
        
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
        this.workingdetails = data[1];

        this.loader = false;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetPhysioWorkingDetailsDyWise",error);
      }
    )
  }


  public date: any;
  physiohospitalid: any;
  showcalender: any;
  slotTypeID: any;

  GetPhysiotherapistID(item: any) {
    this.loader = true;
    this.showcalender = 1;
    
    this.physioid = item.physiotherapyID
    var list = this.physioist.filter((x: { physiotherapyID: any; }) => x.physiotherapyID == this.physioid);
    this.physiohospitalid = list[0].id;
    this.slotTypeID = list[0].slotDurationID;
    this.GetPhjysioworkingDatewise();
    this.GetMorningSlotsMasterbyid();
  }


  public GetDate(newDate: Date) {
    this.loader = true;
    // this.todaydate = even.toLocaleString().split(',')[0];

    this.todaydate = this.CommonService.GetDates(newDate)

    this.GetPhjysioworkingDatewise();
  }






  public dayid: any;
  public slotID: any;
  public appointmenttypeid: any;
  public dochospitalid: any;
  public appointmentdate: any;
  public appointmentypeid: any;
  public fees: any;

  public GetDay1List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day1DayID
    this.slotID = details.day1SlotID
    this.appointmentypeid = details.day1AppointmentTypeID,
      this.appointmentdate = details.day1AppointmentDate,
      this.fees = details.mondayFees;


  }



  public GetDay2List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day2DayID
    this.slotID = details.day2SlotID
    this.appointmentypeid = details.day2AppointmentTypeID,
      this.appointmentdate = details.day2AppointmentDate,
      this.fees = details.tuesdayFees;



  }


  public GetDay3List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day3DayID
    this.slotID = details.day3SlotID
    this.appointmentypeid = details.day3AppointmentTypeID,
      this.appointmentdate = details.day3AppointmentDate,
      this.fees = details.wednessdayFees;


  }


  public GetDay4List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day4DayID
    this.slotID = details.day4SlotID
    this.appointmentypeid = details.day4AppointmentTypeID,
      this.appointmentdate = details.day4AppointmentDate
    this.fees = details.thursdayFees;

  }

  public GetDay5List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.dayID
    this.slotID = details.day5SlotID
    this.appointmentypeid = details.day5AppointmentTypeID,
      this.appointmentdate = details.day5AppointmentDate,
      this.fees = details.fridayFees;

  }

  public GetDay6List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day6DayID
    this.slotID = details.day6SlotID
    this.appointmentypeid = details.day6AppointmentTypeID,
      this.appointmentdate = details.day6AppointmentDate,
      this.fees = details.satdayFees;

  }


  public GetDay7List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day7DayID
    this.slotID = details.day7SlotID
    this.appointmentypeid = details.day7AppointmentTypeID,
      this.appointmentdate = details.day7AppointmentDate,
      this.fees = details.sundayFees;


  }


  patientid: any;
  email: any;
  mobileno: any;
  nursename: any;
  notificationdate: any;
  appointmentid: any;
  patientname: any;


  public insertdetails() {
    this.loader = true;
    this.showPopup = 0;
    
    this.CommonService.GetPhysioAppointmentdabySlot(this.physioid, this.slotID, this.appointmentdate).subscribe(data1 => {
      
      if (data1.length != 0) {

        var list = data1[0];
        this.patientid = list.relationPatientID,
          this.email = list.pEmail,
          this.mobileno = list.pMobileNo,
          this.nursename = list.name,
          this.notificationdate = list.notificationdate,
          this.appointmentid = list.id,
          this.patientname = list.pName
        // this.Insertnotificatiacceptforcansel();
        // this.insercancelnotoification();
        this.SendCancelPatientmail();
      }
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetPhysioAppointmentdabySlot", error);
    })
    
    this.CommonService.GetPhysioCancelledAppointmentByDateWise(this.physioid, this.slotID, this.appointmentdate).subscribe(data => {
      
    }, error => {
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl, "GetPhysioCancelledAppointmentByDateWise", error);
    })

    
    var entity = {
      'PhysioHospitalDetailsID': this.physiohospitalid,
      'PhysioID': this.physioid,
      'DayID': this.dayid,
      'SlotID': this.slotID,
      'Fees': this.fees,
      'AppointmentDate': this.appointmentdate,
      'AppointmentTypeID': this.appointmentypeid,
    }
    
    this.CommonService.InsertPhysioWorkingDetails_DateWise(entity).subscribe(data => {
      
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;

      this.GetPhjysioworkingDatewise();
      // this.GetNurseWorkingDetailsDyWise();

    }, error => {
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl, "InsertPhysioWorkingDetails_DateWise", error);
    })


  }





  //email

  emailattchementurl = [];
  cclist = [];
  bcclist = [];
  public SendCancelPatientmail() {
    
    var entity = {
      'emailto': this.email,
      'emailsubject': "Your Physiotherapist " + this.nursename + " Has Cancelled Your Appointment At Time " + this.notificationdate,
      'emailbody': 'Dear ' + this.patientname + ',' + "<br><br>" + 'We regret to inform that your Doctor ' + this.nursename + ' has cancelled your appointment of ' + this.notificationdate + '. Please use voiladoc app to reschedule or ask for refund. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.CommonService.sendemail(entity).subscribe(data => {
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "sendemail", error);
    })
  }

  typeID: any;

  public GetTypeID(even: any) {
    this.typeID = even.target.value;
    this.fees = ""
  }



  //datewise entire day
  daychangedate: any;
  dayslist: any;
  datechangedayid: any;
  Daywiseappointmentid: any;


  public GetdaychangeDate(newDate: Date) {
    // this.daychangedate = even.toLocaleString().split(',')[0];
    this.daychangedate = this.CommonService.GetDates(newDate)
    this.Getdays()
  }

  public Getdays() {

    this.CommonService.GetDaysHomecare(this.daychangedate).subscribe(data => {
      this.dayslist = data[0];
      let day = this.dayslist.dayName

      this.Getdayssid(day);
    }, error => {
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl, "GetDaysHomecare", error);
    })
  }

  public Getdayssid(day: any) {
    this.CommonService.GetDayID(day).subscribe(data => {

      let dayidslist = data;
      this.datechangedayid = dayidslist[0].dayID;

    }, error => {
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl,"GetDayID",error);
    })
  }


  appcount: any;


  public InsertDayWiseAlert() {
    this.showPopup = 0;
    if (this.daychangedate == undefined || this.daychangedate == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 2;

    }
    else if (this.Daywiseappointmentid == undefined || this.Daywiseappointmentid == null) {
      this.showPopup = 1;
      this.messageID = 36;
      this.typeofPopUp = 2;
    }
    else {
      this.CommonService.GetBook_Physio_AppointmentCount(this.daychangedate, this.physioid).subscribe(data => {
        var applist = data[0];
        this.appcount = applist.appcount

        Swal.fire({
          title:this.labels.title,
          text:this.labels.youhave + this.appcount + this.labels.bookingText,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText:this.labels.yes,
          cancelButtonText:this.labels.no
        }).then((result) => {
          if (result.isConfirmed) {

            this.InsertDayWiseSlots();
            this.messageID = 34;
            this.typeofPopUp = 1;
            this.showPopup = 1;
          }
        },error=>{
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"GetBook_Physio_AppointmentCount",error);
        })
      }
      )
    }
  }


  slotslist: any;
  mrngfromlist: any;

  public GetMorningSlotsMasterbyid() {

    this.CommonService.GetSlotMasterTimings(this.slotTypeID).subscribe(
      data => {

        this.slotslist = data;
        this.mrngfromlist = data;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "GetSlotMasterTimings", error);
      }
    )
  }


  daychangedate1: any;


  public InsertDayWiseSlots() {
    this.showPopup = 0;
    if (this.daychangedate == undefined || this.daychangedate == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 2;
    }
    else if (this.Daywiseappointmentid == undefined || this.Daywiseappointmentid == null) {
      this.showPopup = 1;
      this.messageID = 36;
      this.typeofPopUp = 2;
    }
    else {

      for (let j = 0; j < this.slotslist.length; j++) {
        
        this.CommonService.GetPhysioAppointmentdabySlot(this.physioid, this.slotslist[j].id, this.daychangedate).subscribe(data1 => {

          if (data1.length != 0) {

            var list = data1[0];
            this.patientid = list.relationPatientID,
              this.email = list.pEmail,
              this.mobileno = list.pMobileNo,
              this.nursename = list.name,
              this.notificationdate = list.notificationdate,
              this.appointmentid = list.id,
              this.patientname = list.pName
            // this.Insertnotificatiacceptforcansel();
            // this.insercancelnotoification();
            this.SendCancelPatientmail();
            // this.GetPhjysioworkingDatewise();
          }

        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl, "GetPhysioAppointmentdabySlot", error);
        })

        this.CommonService.GetPhysioCancelledAppointmentByDateWise(this.physioid, this.slotslist[j].id, this.daychangedate).subscribe(data => {
        })
        var entity = {
          'PhysioHospitalDetailsID': this.physiohospitalid,
          'PhysioID': this.physioid,
          'DayID': this.datechangedayid,
          'SlotID': this.slotslist[j].id,
          'Fees': this.fees,
          'AppointmentDate': this.daychangedate,
          'AppointmentTypeID': this.Daywiseappointmentid
        }
        this.CommonService.InsertPhysioWorkingDetails_DateWise(entity).subscribe(data => {


        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl, "InsertPhysioWorkingDetails_DateWise", error);
        })
      }

      this.GetPhjysioworkingDatewise();
      this.loader = true;
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.Daywiseappointmentid = "";
      this.daychangedate = ""
      this.fees = ""
      this.daychangedate1 = ""
    }
  }


  //time change

  timechangedate: any;
  timechangedayid: any;


  public GetTimewisechangedate(newDate: Date) {

    this.timechangedate = this.CommonService.GetDates(newDate)
    // this.timechangedate = even.toLocaleString().split(',')[0];
    this.Getdaystime()

  }

  public Getdaystime() {

    this.CommonService.GetDaysHomecare(this.timechangedate).subscribe(data => {

      this.dayslist = data[0];
      let dayname = this.dayslist.dayName

      this.Getdayssidbytime(dayname);
    }, error => {
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl,"GetDaysHomecare",error);
    })
  }
  public Getdayssidbytime(dayname: any) {
    this.CommonService.GetDayID(dayname).subscribe(data => {

      let dayidslist = data;
      this.timechangedayid = dayidslist[0].dayID;

    }, error => {
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl, "Getdayssidbytime", error);
    })
  }

























  mrngfromslot: any;
  mrngfromid: any;
  mrngtolist: any;
  mrngtoid: any;
  timewisechangeslotlist: any;

  public getmrngfrom(even: any) {
    this.mrngfromid = even.target.value;
    
    // if (this.timewiseappointmentid == 4 || this.timewiseappointmentid == 6) {
    var qwerty = this.mrngfromlist.filter((x: { id: any; }) => x.id == this.mrngfromid);
    this.mrngfromslot = qwerty[0].slots;
    this.mrngtolist = this.mrngfromlist.filter((x: { id: number; }) => x.id > this.mrngfromid);
    this.mrngtoid = "";
  }
  mrngtoslot: any;

  public getmrngto(even: any) {
    this.mrngtoid = even.target.value;
    
    // if (this.timewiseappointmentid == 4 || this.timewiseappointmentid == 6) {
    var qwerty = this.mrngtolist.filter((x: { id: any; }) => x.id == this.mrngtoid);
    this.mrngtoslot = qwerty[0].slots;
    
    this.timewisechangeslotlist = this.slotslist.filter((x: { id: number; }) => x.id >= this.mrngfromid && x.id <= this.mrngtoid)
  }





  timewiseappointmentid: any;
  totalappcount: any;
  timechangedate1: any;



  public InsertTineWiseAlert() {
    this.showPopup = 0;
    if (this.timechangedate == undefined || this.timechangedate == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 2;
    }
    else if (this.timewiseappointmentid == undefined || this.timewiseappointmentid == null) {
      this.showPopup = 1;
      this.messageID = 36;
      this.typeofPopUp = 2;
    }
    else if (this.mrngfromid == "" || this.mrngtoid == "") {
      this.showPopup = 1;
      this.messageID = 37;
      this.typeofPopUp = 2;
    }
    else {


      Swal.fire({
        title:this.labels.title,
        text: this.labels.youhave + this.totalappcount + this.labels.bookingText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText:this.labels.yes,
        cancelButtonText:this.labels.no
        
      }).then((result) => {
        if (result.isConfirmed) {

          this.InsertTimeWiseSlots();
          this.messageID = 34;
          this.typeofPopUp = 1;
          this.showPopup = 1;
        }
      })


    }

  }


  public InsertTimeWiseSlots() {

    if (this.timechangedate == undefined || this.timechangedate == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 2;
    }
    else if (this.timewiseappointmentid == undefined || this.timewiseappointmentid == null) {
      this.showPopup = 1;
      this.messageID = 36;
      this.typeofPopUp = 2;
    }
    else if (this.mrngfromid == "" || this.mrngtoid == "") {
      this.showPopup = 1;
      this.messageID = 37;
      this.typeofPopUp = 2;
    }
    else {
      
      for (let j = 0; j < this.timewisechangeslotlist.length; j++) {
        
        this.CommonService.GetPhysioAppointmentdabySlot(this.physioid, this.timewisechangeslotlist[j].id, this.timechangedate).subscribe(data1 => {
          
          if (data1.length != 0) {
            
            var list = data1[0];
            this.patientid = list.relationPatientID,
              this.email = list.pEmail,
              this.mobileno = list.pMobileNo,
              this.nursename = list.nurseName,
              this.notificationdate = list.notificationdate,
              this.appointmentid = list.id,
              this.patientname = list.pName

            this.SendCancelPatientmail();

            
          }
        })
        this.CommonService.GetPhysioCancelledAppointmentByDateWise(this.physioid, this.timewisechangeslotlist[j].id, this.timechangedate).subscribe(data => {
          
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetPhysioCancelledAppointmentByDateWise", error);
        }
        )
        var entity = {
          'PhysioHospitalDetailsID': this.physiohospitalid,
          'PhysioID': this.physioid,
          'DayID': this.timechangedayid,
          'SlotID': this.timewisechangeslotlist[j].id,
          'Fees': this.fees,
          'AppointmentDate': this.timechangedate,
          'AppointmentTypeID': this.timewiseappointmentid
        }
        this.CommonService.InsertPhysioWorkingDetails_DateWise(entity).subscribe(data => {


        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "InsertPhysioWorkingDetails_DateWise", error);
        })
      }


      this.GetPhjysioworkingDatewise();
      this.loader = true;
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.timewiseappointmentid = "";
      this.timechangedate1 = "";
      this.timechangedate = "";
      this.mrngtoid = "";
      this.mrngfromid = "";
      this.fees = ""

    }
  }

  public gettimechange(even: any) {

    this.timewiseappointmentid = even.target.value;
    if (this.timewiseappointmentid == 4) {

    }
    else {
      this.mrngtoid = "";
      this.mrngfromid = "";
    }

  }
}
