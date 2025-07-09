import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Swal from 'sweetalert2';
import Labels from '../../Lables/WorkingDetails/workinglabels.json';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-mycalender',
  templateUrl: './mycalender.component.html',
  styleUrls: ['./mycalender.component.css'],
})
export class MycalenderComponent implements OnInit {
  constructor(
    private CommonService: CommonService,
    private SharedService: SharedService
  ) {}
  public timeSheetTablearray = [];
  public TodatDate: any;
  public doctorid: any;
  public languageid: any;
  todaydatess: any;

  public workingdetails: any;
  showmonth: any;
  month: any;
  year: any;
  labels: any;
  Select: any;
  hospitalid: any;
  dummlist: any;
  doctorlist: any;
  public docdd = {};
  public search: any;
  public today = new Date();
  public todaydate: any;
  public daychangedate1: any;
  public timechangedate1: any;
  public term: any;

  myDateValue: Date | undefined;
  mrngfromid: any;
  mrngtoid: any;
  loader: boolean | undefined;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  public dayid: any;
  public slotID: any;
  public appointmenttypeid: any;
  public dochospitalid: any;
  public appointmentdate: any;
  public appointmentypeid: any;
  public fees: any;

  public DayDatelist: any;
  public slottypeid: any;

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

  public showtable = 1;
  public dummlist2: any;

  public patientid: any;
  public email: any;
  public mobileno: any;
  public doctorname: any;
  public notificationdate: any;
  public appointmentid: any;
  public patientname: any;
  hosptalist: any;
  public showcalender: any;
  currentUrl: any;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.doctorid = sessionStorage.getItem('userid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.hospitalid = sessionStorage.getItem('hospitalid');

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.CommonService.GetDoctorListByLanguageID(this.languageid).subscribe(
      (data) => {
        this.doctorlist = data;
        var list = this.doctorlist.filter(
          (x: { id: any }) => x.id == this.doctorid
        );
        this.slottypeid = list[0].slotDurationID;

        this.GetMyDoctorWorkingDetails();
        this.GetMorningSlotsMasterbyid();
      },
      (error) => {
        console.log('GetMyDoctorWorkingDetails', error);
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorListByLanguageID',
          error
        );
      }
    );

    this.CommonService.GetDoctorHospitalsByDoctorID(
      this.languageid,
      this.doctorid
    ).subscribe(
      (data) => {
        this.hosptalist = data;
        this.dochospitalid = this.hosptalist[0].id;
        this.hospitalid = this.hosptalist[0].hospital_ClinicID;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorHospitalsByDoctorID',
          error
        );
      }
    );
    this.mrngtoid = '';
    this.mrngfromid = '';
  }

  public GetMyDoctorWorkingDetails() {
    this.CommonService.GetDoctorcalenderSlotsByDoctorID(
      this.doctorid,
      this.slottypeid,
      this.todaydate,
      this.languageid
    ).subscribe(
      (data) => {
        this.loader = false;

        //this.workingdetails = data;
        this.DayDatelist = data[0];

        (this.date1 = this.DayDatelist[0].date),
          (this.day1 = this.DayDatelist[0].day);

        (this.date2 = this.DayDatelist[1].date),
          (this.day2 = this.DayDatelist[1].day);

        (this.date3 = this.DayDatelist[2].date),
          (this.day3 = this.DayDatelist[2].day);

        (this.date4 = this.DayDatelist[3].date),
          (this.day4 = this.DayDatelist[3].day);

        (this.date5 = this.DayDatelist[4].date),
          (this.day5 = this.DayDatelist[4].day);

        (this.date6 = this.DayDatelist[5].date),
          (this.day6 = this.DayDatelist[5].day);

        (this.date7 = this.DayDatelist[6].date),
          (this.day7 = this.DayDatelist[6].day);
        // let sfdsfd=this.DayDatelist.map("date");
        // this.head1=sfdsfd[0];
        this.workingdetails = data[1];
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorcalenderSlotsByDoctorID',
          error
        );
      }
    );
  }

  public GetDoctorID(item: any) {
    this.doctorid = '';
    this.showtable = 1;

    this.doctorid = item.doctorID;
    this.CommonService.GetDoctorListByLanguageID(this.languageid).subscribe(
      (data) => {
        this.loader = true;
        this.dummlist2 = data;
        var list = this.dummlist2.filter(
          (x: { id: any }) => x.id == this.doctorid
        );
        (this.slottypeid = list[0].slotDurationID),
          (this.hospitalid = list[0].hospitalClinicID),
          this.GetMorningSlotsMasterbyid();
        this.GetMyDoctorWorkingDetails();
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorListByLanguageID',
          error
        );
      }
    );

    this.CommonService.GetDoctorHospitalsByDoctorID(
      this.languageid,
      this.doctorid
    ).subscribe(
      (data) => {
        this.hosptalist = data;
        this.dochospitalid = this.hosptalist[0].id;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorHospitalsByDoctorID',
          error
        );
      }
    );
    if (this.doctorid == undefined) {
      this.showcalender = 0;
    } else {
      this.showcalender = 1;
    }
  }

  public GetDoctorDates(newDate: Date) {
    this.loader = true;

    // this.todaydate = even.toLocaleString().split(',')[0];
    this.todaydate = this.CommonService.GetDates(newDate);

    this.GetMyDoctorWorkingDetails();
  }

  public GetDay1List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day1DayID;
    this.slotID = details.day1SlotID;
    (this.appointmentypeid = details.day1AppointmentTypeID),
      (this.appointmentdate = details.day1AppointmentDate),
      (this.fees = details.mondayFees);
  }

  public GetDay2List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day2DayID;
    this.slotID = details.day2SlotID;
    (this.appointmentypeid = details.day2AppointmentTypeID),
      (this.appointmentdate = details.day2AppointmentDate),
      (this.fees = details.tuesdayFees);
  }

  public GetDay3List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day3DayID;
    this.slotID = details.day3SlotID;
    (this.appointmentypeid = details.day3AppointmentTypeID),
      (this.appointmentdate = details.day3AppointmentDate),
      (this.fees = details.wednessdayFees);
  }

  public GetDay4List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day4DayID;
    this.slotID = details.day4SlotID;
    (this.appointmentypeid = details.day4AppointmentTypeID),
      (this.appointmentdate = details.day4AppointmentDate);
    this.fees = details.thursdayFees;
  }

  public GetDay5List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.dayID;
    this.slotID = details.day5SlotID;
    (this.appointmentypeid = details.day5AppointmentTypeID),
      (this.appointmentdate = details.day5AppointmentDate),
      (this.fees = details.fridayFees);
  }

  public GetDay6List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day6DayID;
    this.slotID = details.day6SlotID;
    (this.appointmentypeid = details.day6AppointmentTypeID),
      (this.appointmentdate = details.day6AppointmentDate),
      (this.fees = details.satdayFees);
  }

  public GetDay7List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day7DayID;
    this.slotID = details.day7SlotID;
    (this.appointmentypeid = details.day7AppointmentTypeID),
      (this.appointmentdate = details.day7AppointmentDate),
      (this.fees = details.sundayFees);
  }

  public insertdetails() {
    this.CommonService.GetDoctorAppointmentByDateBySlot(
      this.doctorid,
      this.slotID,
      this.appointmentdate
    ).subscribe((data1) => {
      if (data1.length != 0) {
        var list = data1[0];
        (this.patientid = list.relationPatientID),
          (this.email = list.pEmail),
          (this.mobileno = list.pMobileNo),
          (this.doctorname = list.doctorName),
          (this.notificationdate = list.notificationdate),
          (this.appointmentid = list.id),
          (this.patientname = list.pName);
        this.insercancelnotoification();
        this.SendCancelPatientmail();
      }
    });
    this.CommonService.GetDoctorCancelledAppointmentByDateWise(
      this.doctorid,
      this.slotID,
      this.appointmentdate
    ).subscribe((data) => {});
    var entity = {
      SlotID: this.slotID,
      DoctorID: this.doctorid,
      DayID: this.dayid,
      Hospital_ClinicID: this.hospitalid,
      DoctorHospitalDetailsID: this.dochospitalid,
      AppointmentTypeID: this.appointmentypeid,
      AppointmentDate: this.appointmentdate,
      DoctorFees: this.fees,
    };
    this.CommonService.InsertDoctorSlots_DateWiseAvailable(entity).subscribe(
      (data) => {
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.showPopup = 1;
        this.insertbookappointmenttype();
        this.GetMyDoctorWorkingDetails();
        this.loader = true;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'InsertDoctorSlots_DateWiseAvailable',
          error
        );
      }
    );
  }

  // public GetBookappoinmentpatientDetails() {
  //   this.docservice.GetDoctorAppointmentByDateBySlot(this.doctorid, this.slotID, this.appointmentdate).subscribe(data => {
  //     if(data.length!=0)

  //     var list = data[0];
  //     this.patientid = list.relationPatientID,
  //       this.email = list.pEmail,
  //       this.mobileno = list.pMobileNo

  //   })
  // }

  public emailattchementurl = [];
  public cclist: any;
  public bcclist: any;

  public SendCancelPatientmail() {
    var entity = {
      emailto: this.email,
      emailsubject:
        'Your Doctor ' +
        this.doctorname +
        ' Has Cancelled Your Appointment At Time ' +
        this.notificationdate,
      emailbody:
        'Dear ' +
        this.patientname +
        ',' +
        '<br><br>' +
        'We regret to inform that your Doctor ' +
        this.doctorname +
        ' has cancelled your appointment of ' +
        this.notificationdate +
        '. Please use voiladoc app to reschedule or ask for refund. For any further help. Please contact our support clients' +
        '<br><br>' +
        'Regards,' +
        '<br>' +
        'Voiladoc Team',
      attachmenturl: this.emailattchementurl,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.CommonService.sendemail(entity).subscribe(
      (data) => {},
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'sendemail',
          error
        );
      }
    );
  }

  public insercancelnotoification() {
    console.log('notificartion' + this.notificationdate);
    if (this.languageid == '1') {
      var entity = {
        PatientID: this.patientid,
        Notification: 'Appointment Cancelled By Doctor.',
        Description:
          'Dr.' +
          this.doctorname +
          ' has cancelled your appointment scheduled for ' +
          this.notificationdate,
        NotificationTypeID: 11,
        Date: this.todaydate,
        LanguageID: this.languageid,
        AppointmentID: this.appointmentid,
      };
      this.CommonService.InsertNotificationsWebLatest(entity).subscribe(
        (data) => {
          if (data != 0) {
          }
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'InsertNotificationsWebLatest',
            error
          );
        }
      );
    } else if (this.languageid == '6') {
      console.log('notificartion' + this.notificationdate);
      var entity = {
        PatientID: this.patientid,
        Notification: 'Rendez-vous annulé par le médecin.',
        Description:
          'Dr.' +
          this.doctorname +
          ' a annulé votre rendez-vous prévu pour ' +
          this.notificationdate,
        NotificationTypeID: 11,
        Date: this.todaydate,
        LanguageID: this.languageid,
        AppointmentID: this.appointmentid,
      };
      this.CommonService.InsertNotificationsWebLatest(entity).subscribe(
        (data) => {
          if (data != 0) {
          }
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'InsertNotificationsWebLatest',
            error
          );
        }
      );
    }
  }

  // Full Day Slot Change By date

  public typeID: any;

  public GetTypeID(even: any) {
    this.typeID = even.target.value;
    this.fees = 0;
  }

  public daychangedate: any;
  public dayslist: any;
  public dayname: any;
  public dayidslist: any;
  public datechangedayid: any;

  public GetdaychangeDate(newDate: Date) {
    // this.daychangedate = even.toLocaleString().split(',')[0];
    // var d = new Date(newDate),
    //   month = '' + (d.getMonth() + 1),
    //   day = '' + d.getDate(),
    //   year = d.getFullYear();

    // if (month.length < 2)
    //   month = '0' + month;
    // if (day.length < 2)
    //   day = '0' + day;

    this.daychangedate = this.CommonService.GetDates(newDate);
    //  month + "-" + day + "-" + year;

    this.Getdays();
  }

  public Getdays() {
    this.CommonService.GetDaysHomecare(this.daychangedate).subscribe(
      (data) => {
        this.dayslist = data[0];
        this.dayname = this.dayslist.dayName;

        this.Getdayssid();
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDaysHomecare',
          error
        );
      }
    );
  }

  public Getdayssid() {
    this.CommonService.GetDayID(this.dayname).subscribe(
      (data) => {
        this.dayidslist = data;
        this.datechangedayid = this.dayidslist[0].dayID;
      },
      (error) => {
        this.SharedService.insertexceptions(this.currentUrl, 'GetDayID', error);
      }
    );
  }

  public slotslist: any;
  public mrngfromlist: any;

  public GetMorningSlotsMasterbyid() {
    this.CommonService.GetSlotsMasterByID(1, this.slottypeid).subscribe(
      (data) => {
        this.slotslist = data;
        this.mrngfromlist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetSlotsMasterByID',
          error
        );
      }
    );
  }

  applist: any;
  appcount: any;

  public InsertDayWiseAlert() {
    this.showPopup = 0;
    if (this.daychangedate == undefined || this.daychangedate == null) {
      this.messageID = 35;
      this.typeofPopUp = 1;
      this.showPopup = 1;
    } else if (
      this.Daywiseappointmentid == undefined ||
      this.Daywiseappointmentid == null
    ) {
      this.messageID = 36;
      this.typeofPopUp = 1;
      this.showPopup = 1;
    } else {
      this.CommonService.GetBookAppointmentByDateWiseAppointmentCount(
        this.daychangedate,
        this.doctorid
      ).subscribe(
        (data) => {
          this.applist = data[0];
          this.appcount = this.applist.appcount;
          Swal.fire({
            title: this.labels.title,
            text: this.labels.youhave + this.appcount + this.labels.bookingText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.labels.yes,
            cancelButtonText: this.labels.no,
          }).then((result) => {
            if (result.isConfirmed) {
              this.InsertDayWiseSlots();
              this.messageID = 34;
              this.typeofPopUp = 1;
              this.showPopup = 1;
            }
          });
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetBookAppointmentByDateWiseAppointmentCount',
            error
          );
        }
      );
    }
  }

  public Daywiseappointmentid: any;

  public InsertDayWiseSlots() {
    this.showPopup = 0;
    if (this.daychangedate == undefined || this.daychangedate == null) {
      this.messageID = 35;
      this.typeofPopUp = 1;
      this.showPopup = 1;
    } else if (
      this.Daywiseappointmentid == undefined ||
      this.Daywiseappointmentid == null
    ) {
      this.messageID = 36;
      this.typeofPopUp = 1;
      this.showPopup = 1;
    } else {
      for (let j = 0; j < this.slotslist.length; j++) {
        this.CommonService.GetDoctorAppointmentByDateBySlot(
          this.doctorid,
          this.slotslist[j].id,
          this.daychangedate
        ).subscribe((data1) => {
          if (data1.length != 0) {
            var list = data1[0];
            (this.patientid = list.relationPatientID),
              (this.email = list.pEmail),
              (this.mobileno = list.pMobileNo),
              (this.doctorname = list.doctorName),
              (this.notificationdate = list.notificationdate),
              (this.appointmentid = list.id),
              (this.patientname = list.pName);

            this.insercancelnotoification();
            this.SendCancelPatientmail();
            this.GetMyDoctorWorkingDetails();
          }
        });

        this.CommonService.GetDoctorCancelledAppointmentByDateWise(
          this.doctorid,
          this.slotslist[j].id,
          this.daychangedate
        ).subscribe((data) => {});

        var entity = {
          SlotID: this.slotslist[j].id,
          DoctorID: this.doctorid,
          DayID: this.datechangedayid,
          Hospital_ClinicID: this.hospitalid,
          DoctorHospitalDetailsID: this.dochospitalid,
          AppointmentTypeID: this.Daywiseappointmentid,
          AppointmentDate: this.daychangedate,
          DoctorFees: this.fees,
        };
        this.CommonService.InsertDoctorSlots_DateWiseAvailable(
          entity
        ).subscribe((data) => {
          this.insertbookappointmenttype();
        });
      }
      this.insertbookappointmenttype();
      this.GetMyDoctorWorkingDetails();
      this.loader = true;
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.Daywiseappointmentid = '';
      this.daychangedate = '';
      this.fees = '';
      this.daychangedate1 = '';
    }
  }

  // time wise changes

  public timechangedayid: any;
  public timechangedate: any;

  public GetTimewisechangedate(newDate: Date) {
    // this.timechangedate = even.toLocaleString().split(',')[0];

    this.timechangedate = this.CommonService.GetDates(newDate);

    this.Getdaystime();
  }

  public Getdaystime() {
    this.CommonService.GetDaysHomecare(this.timechangedate).subscribe(
      (data) => {
        this.dayslist = data[0];
        this.dayname = this.dayslist.dayName;

        this.Getdayssidbytime();
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDaysHomecare',
          error
        );
      }
    );
  }

  public Getdayssidbytime() {
    this.CommonService.GetDayID(this.dayname).subscribe(
      (data) => {
        this.dayidslist = data;
        this.timechangedayid = this.dayidslist[0].dayID;
      },
      (error) => {
        this.SharedService.insertexceptions(this.currentUrl, 'GetDayID', error);
      }
    );
  }

  public gettimechange(even: any) {
    this.timewiseappointmentid = even.target.value;
    if (this.timewiseappointmentid == 4) {
    } else {
      this.mrngtoid = '';
      this.mrngfromid = '';
    }
  }

  public mrngfromslot: any;
  public mrngtolist: any;
  public mrngtoslot: any;

  public getmrngfrom(even: any) {
    this.mrngfromid = even.target.value;

    // if (this.timewiseappointmentid == 4 || this.timewiseappointmentid == 6) {
    var qwerty = this.mrngfromlist.filter(
      (x: { id: any }) => x.id == this.mrngfromid
    );
    this.mrngfromslot = qwerty[0].slots;
    this.mrngtolist = this.mrngfromlist.filter(
      (x: { id: number }) => x.id > this.mrngfromid
    );
    this.mrngtoid = '';
    // }
    // else {
    //   this.docservice.GetDoctorSlotsGap(this.mrngfromid, this.timechangedate, 1, this.doctorid, this.timechangedayid, 1).subscribe(data => {
    //
    //     let data1 = data;
    //     if (data.length == 0) {
    //       var qwerty = this.mrngfromlist.filter(x => x.id == this.mrngfromid);
    //       this.mrngfromslot = qwerty[0].slots;
    //       this.mrngtolist = this.mrngfromlist.filter(x => x.id > this.mrngfromid);
    //       this.mrngtoid = "";
    //     }
    //     else {
    //       if (this.languageid == 1) {
    //         Swal.fire({ text: "We are sorry. This action cannot be initiated. Voiladoc tries to optimize your schedule and tasks so that you spend quality time with your patients. Therefore, please allow an interval of 30 minutes between two types of" });
    //         this.mrngfromid = "";
    //       }
    //       else {
    //         Swal.fire({ text: "Nous sommes désolés. Cette action ne peut pas être initiée. Voiladoc essaie d'optimiser votre emploi du temps et vos tâches afin que vous passiez du temps de qualité avec vos patients. Par conséquent, veuillez prévoir un intervalle de 30 minutes entre deux types de RDV. Veuillez revenir en arrière et réviser votre sélection. Merci !" });
    //         this.mrngfromid = "";
    //       }

    //     }
    //   })
    // }
  }

  public getmrngto(even: any) {
    this.mrngtoid = even.target.value;

    // if (this.timewiseappointmentid == 4 || this.timewiseappointmentid == 6) {
    var qwerty = this.mrngtolist.filter(
      (x: { id: any }) => x.id == this.mrngtoid
    );
    this.mrngtoslot = qwerty[0].slots;
    this.GetGetSlotsByIDPlanning();
    // }
    // else {

    //   this.docservice.GetDoctorSlotsGap(this.mrngtoid, this.timechangedate, 1, this.doctorid, this.timechangedayid, 2).subscribe(data => {
    //     if (data.length == 0) {
    //
    //       var qwerty = this.mrngtolist.filter(x => x.id == this.mrngtoid);
    //       this.mrngtoslot = qwerty[0].slots;
    //       this.GetGetSlotsByIDPlanning();
    //     }
    //     else {
    //
    //       if (this.languageid == 1) {
    //         Swal.fire({ text: "We are sorry. This action cannot be initiated. Voiladoc tries to optimize your schedule and tasks so that you spend quality time with your patients. Therefore, please allow an interval of 30 minutes between two types of" });
    //         this.mrngtoid = "";
    //       }
    //       else {
    //         Swal.fire({ text: "Nous sommes désolés. Cette action ne peut pas être initiée. Voiladoc essaie d'optimiser votre emploi du temps et vos tâches afin que vous passiez du temps de qualité avec vos patients. Par conséquent, veuillez prévoir un intervalle de 30 minutes entre deux types de RDV. Veuillez revenir en arrière et réviser votre sélection. Merci !" });
    //         this.mrngtoid = "";
    //       }

    //     }
    //   })
    // }
  }

  // public getmrngfrom(even) {
  //   this.mrngfromid = even.target.value;

  //
  //   this.docservice.GetDoctorSlotsGap(this.mrngfromid, this.timechangedate, 1, this.doctorid, this.timechangedayid, 1).subscribe(data => {
  //
  //     let data1 = data;
  //     if (data.length == 0) {
  //       var qwerty = this.mrngfromlist.filter(x => x.id == this.mrngfromid);
  //       this.mrngfromslot = qwerty[0].slots;
  //       this.mrngtolist = this.mrngfromlist.filter(x => x.id > this.mrngfromid);
  //       this.mrngtoid = "";
  //     }
  //     else {
  //       Swal.fire("Please Select Another Time ");
  //       this.mrngfromid = "";
  //     }
  //   })

  // }

  // public getmrngto(even) {
  //   this.mrngtoid = even.target.value;

  //
  //   this.docservice.GetDoctorSlotsGap(this.mrngtoid, this.timechangedate, 1, this.doctorid, this.timechangedayid, 2).subscribe(data => {
  //     if (data.length == 0) {
  //
  //       var qwerty = this.mrngtolist.filter(x => x.id == this.mrngtoid);
  //       this.mrngtoslot = qwerty[0].slots;
  //       this.GetGetSlotsByIDPlanning();
  //     }
  //     else {
  //
  //       Swal.fire("Please Select Another Time");
  //       this.mrngtoid = "";

  //     }
  //   })

  // }

  public timewisechangeslotlist: any;
  public totalappcount: any;
  public slotappcount: any;

  public GetGetSlotsByIDPlanning() {
    this.CommonService.GetSlotsByIDPlanning(
      this.mrngfromid,
      this.mrngtoid
    ).subscribe(
      (data) => {
        this.timewisechangeslotlist = data;
        this.totalappcount = 0;
        for (let K = 0; K < this.timewisechangeslotlist.length; K++) {
          this.CommonService.GetBookAppointmentByDateWiseAndSlotWiseAppointmentCount(
            this.timechangedate,
            this.doctorid,
            this.timewisechangeslotlist[K].id
          ).subscribe((data) => {
            this.applist = data[0];
            this.applist = data[1];
            this.slotappcount = this.applist.appcount;
            this.totalappcount =
              Number(this.totalappcount) + Number(this.slotappcount);
          });
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetBookAppointmentByDateWiseAndSlotWiseAppointmentCount',
          error
        );
      }
    );
  }

  public timewiseappointmentid: any;

  public InsertTineWiseAlert() {
    this.showPopup = 0;

    if (this.timechangedate == undefined || this.timechangedate == null) {
      this.messageID = 35;
      this.typeofPopUp = 1;
      this.showPopup = 1;
    } else if (
      this.timewiseappointmentid == undefined ||
      this.timewiseappointmentid == null
    ) {
      this.messageID = 36;
      this.typeofPopUp = 1;
      this.showPopup = 1;
    } else if (this.mrngfromid == '' || this.mrngtoid == '') {
      this.showPopup = 1;
      this.messageID = 37;
      this.typeofPopUp = 1;
    } else {
      Swal.fire({
        title: this.labels.title,
        text:
          this.labels.youhave + this.totalappcount + this.labels.bookingText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no,
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.InsertTimeWiseSlots();
            this.messageID = 34;
            this.typeofPopUp = 1;
            this.showPopup = 1;
          }
        },
        (error) => {}
      );
    }
  }

  public InsertTimeWiseSlots() {
    this.showPopup = 0;
    if (this.timechangedate == undefined || this.timechangedate == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 1;
    } else if (
      this.timewiseappointmentid == undefined ||
      this.timewiseappointmentid == null
    ) {
      this.showPopup = 1;
      this.messageID = 36;
      this.typeofPopUp = 1;
    } else if (this.mrngfromid == '' || this.mrngtoid == '') {
      this.showPopup = 1;
      this.messageID = 37;
      this.typeofPopUp = 1;
    } else {
      for (let j = 0; j < this.timewisechangeslotlist.length; j++) {
        this.CommonService.GetDoctorAppointmentByDateBySlot(
          this.doctorid,
          this.timewisechangeslotlist[j].id,
          this.timechangedate
        ).subscribe((data1) => {
          if (data1.length != 0) {
            var list = data1[0];
            (this.patientid = list.relationPatientID),
              (this.email = list.pEmail),
              (this.mobileno = list.pMobileNo),
              (this.doctorname = list.doctorName),
              (this.notificationdate = list.notificationdate),
              (this.appointmentid = list.id),
              (this.patientname = list.pName);

            this.insercancelnotoification();
            this.SendCancelPatientmail();
            this.GetMyDoctorWorkingDetails();
          }
        });

        this.CommonService.GetDoctorCancelledAppointmentByDateWise(
          this.doctorid,
          this.timewisechangeslotlist[j].id,
          this.timechangedate
        ).subscribe((data) => {});

        var entity = {
          SlotID: this.timewisechangeslotlist[j].id,
          DoctorID: this.doctorid,
          DayID: this.timechangedayid,
          Hospital_ClinicID: this.hospitalid,
          DoctorHospitalDetailsID: this.dochospitalid,
          AppointmentTypeID: this.timewiseappointmentid,
          AppointmentDate: this.timechangedate,
          DoctorFees: this.fees,
        };
        this.CommonService.InsertDoctorSlots_DateWiseAvailable(
          entity
        ).subscribe((data) => {});
      }
      this.insertbookappointmenttype();
      this.GetMyDoctorWorkingDetails();
      this.loader = true;
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.timewiseappointmentid = '';
      this.timechangedate = '';
      this.mrngtoid = '';
      this.mrngfromid = '';
      this.fees = '';
      this.timechangedate1 = '';
    }
  }

  public insertbookappointmenttype() {
    var entity = {
      DoctorHospitalID: this.dochospitalid,
      AppointmentTypeID: this.appointmentypeid,
    };
    this.CommonService.InsertBookAppointmentType(entity).subscribe(
      (data) => {
        if (data != undefined) {
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'InsertBookAppointmentType',
          error
        );
      }
    );
  }
}
