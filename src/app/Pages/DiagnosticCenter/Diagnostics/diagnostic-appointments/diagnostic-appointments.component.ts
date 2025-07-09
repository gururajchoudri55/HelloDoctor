import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json';
import { CommonService } from 'src/app/Pages/services/common.service';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';

@Component({
  selector: 'app-diagnostic-appointments',
  templateUrl: './diagnostic-appointments.component.html',
  styleUrls: ['./diagnostic-appointments.component.css'],
})
export class DiagnosticAppointmentsComponent implements OnInit {
  constructor(
    private DiagnosticService: DiagnosticService,
    private SharedService: SharedService,
    private CommonService: CommonService,
    private DoctorService: DoctorService
  ) {}
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  loader: boolean | undefined;
  count: any;
  search: any;
  user: any;
  p: any;
  term: any;
  term1: any;
  diagnosticID: any;
  languageID: any;
  receptionID: any;
  todaydate: any;
  dayidslist: any;
  dayid: any;
  morningslotslist: any;
  afternoonslotslist: any;
  nigntslotslist: any;
  eveningslotslist: any;
  patientdd = {};

  noMorningSlots: any;
  noafteternonlist: any;
  noeveningSlots: any;
  nonightist: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  labels: any;
  selectPatient: any;
  appointmentDate: any;
  dayName: any;
  public today = new Date();
  dayMap: any;
  diagnosticCenterName: any;

  ngOnInit(): void {
    this.loader = true;
    var date = new Date();
    this.appointmentDate = this.DoctorService.GetDates(date);
    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);
    this.user = sessionStorage.getItem('user');
    this.diagnosticCenterName = sessionStorage.getItem('diagnosticCenterName');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.selectPatient = this.labels.selectpatient;
    this.search = this.labels.search;
    this.diagnosticID = sessionStorage.getItem('diagnosticid');
    this.receptionID = sessionStorage.getItem('Receptionstid');

    const format3 = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale2 = 'en-US';
    this.todaydate = formatDate(myDate, format3, locale2);
    console.log(this.todaydate, 'todaydate');
    this.openCity(1);

    var gsDayNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    this.date = new Date(this.todaydate);
    this.dayName = this.date.toLocaleDateString(locale, { weekday: 'long' });
    // this.dayName = gsDayNames[d.getDay()];
    this.GetDiagnosticSlots();
    this.GetPatients();
    this.GetPatientDetails();
  }

  public GetDiagnosticSlots() {
    debugger;
    this.DiagnosticService.GetDayID(this.dayName).subscribe((data) => {
      this.dayidslist = data;
      this.dayid = this.dayidslist[0].dayID;

      this.DiagnosticService.GetDiagnosticSlotsWeb(
        this.diagnosticID,
        this.todaydate,
        1,
        this.dayid
      ).subscribe(
        (data) => {
          this.morningslotslist = data;
          if (this.morningslotslist.length == 0) {
            this.noMorningSlots = 0;
          }
        },
        (error) => {}
      );
      this.DiagnosticService.GetDiagnosticSlotsWeb(
        this.diagnosticID,
        this.todaydate,
        2,
        this.dayid
      ).subscribe(
        (data) => {
          this.afternoonslotslist = data;

          if (this.afternoonslotslist.length == 0) {
            this.noafteternonlist = 0;
          }
        },
        (error) => {}
      );
      this.DiagnosticService.GetDiagnosticSlotsWeb(
        this.diagnosticID,
        this.todaydate,
        3,
        this.dayid
      ).subscribe(
        (data) => {
          this.eveningslotslist = data;

          if (this.eveningslotslist.length == 0) {
            this.noeveningSlots = 0;
          }
        },
        (error) => {}
      );
      this.DiagnosticService.GetDiagnosticSlotsWeb(
        this.diagnosticID,
        this.todaydate,
        4,
        this.dayid
      ).subscribe(
        (data) => {
          this.nigntslotslist = data;

          if (this.nigntslotslist.length == 0) {
            this.nonightist = 0;
          }
        },
        (error) => {}
      );
    });
  }

  public GetPatients() {
    this.DiagnosticService.GetDiagnosticpatients(this.diagnosticID).subscribe(
      (data) => {
        this.patientslist = data;

        this.patientdd = {
          singleSelection: true,
          idField: 'patientID',
          textField: 'patientName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropdownOnSelect: true,
          closeDropDownOnSelection: true,
          searchPlaceholderText: this.search,
        };
      },
      (error) => {}
    );
  }

  patientdetails: any;

  public GetPatientDetails() {
    this.DiagnosticService.GetPatientRegistrationDetails().subscribe(
      (data) => {
        this.patientdetails = data;
      },
      (error) => {}
    );
  }

  table: any;
  idcount: any;

  public AddAll() {
    this.table = 1;
    if (this.type == 1) {
      for (let i = 0; i < this.selectedtestlist.length; i++) {
        var testentity = {
          Sno: this.idcount,
          TestID: this.selectedtestlist[i].id,
          Testorpackage: this.selectedtestlist[i].testName,
          Price: this.selectedtestlist[i].price,
          PackageID: null,
          TestType: this.selectedtestlist[i].testType,
          TestName: this.selectedtestlist[i].testName,
        };
        this.allselectedtestandpakages.push(testentity);
        this.idcount = this.idcount + 1;
        this.totalamount = this.allselectedtestandpakages
          .map((a: { Price: any }) => a.Price)
          .reduce(function (a: any, b: any) {
            return a + b;
          });
      }
      this.selectedtestlist = [];
    } else {
      for (let i = 0; i < this.selectedpackagelist.length; i++) {
        var packgeentity = {
          Sno: this.idcount,
          TestID: null,
          Testorpackage: this.selectedpackagelist[i].packageName,
          Price: this.selectedpackagelist[i].price,
          PackageID: this.selectedpackagelist[i].id,
        };
        this.allselectedtestandpakages.push(packgeentity);
        this.idcount = this.idcount + 1;
        this.totalamount = this.allselectedtestandpakages
          .map((a: { Price: any }) => a.Price)
          .reduce(function (a: any, b: any) {
            return a + b;
          });
      }
      this.selectedpackagelist = [];
    }
  }

  public GetSelectedTests(even: any, list: any) {
    if (even.target.checked == true) {
      this.selectedtestlist.push(list);
    } else {
      for (let k = 0; k < this.selectedtestlist.length; k++) {
        var index = this.selectedtestlist.indexOf(this.selectedtestlist);
        if (index === -1) {
          this.selectedtestlist.splice(index, 1);
        } else {
          this.selectedtestlist.push(this.selectedtestlist);
        }
      }
    }

    console.log('selected list', this.selectedtestlist);
  }

  patientname: any;
  patientid: any;
  patientslist: any;
  smsMobileno: any;
  patientDropdown: any;
  public GetPatientID(item: any) {
    debugger;
    this.patientid = item.patientID;
    var list = this.patientslist.filter(
      (x: { id: any }) => x.id == this.patientid
    );
    this.patientname = list[0].patientName;
    this.smsMobileno = list[0].smsmobileno;
  }

  public GetSelectedPackages(even: any, list: any) {
    if (even.target.checked == true) {
      this.selectedpackagelist.push(list);
    } else {
      for (let k = 0; k < this.selectedpackagelist.length; k++) {
        var index = this.selectedpackagelist.indexOf(this.selectedpackagelist);
        if (index === -1) {
          this.selectedpackagelist.splice(index, 1);
        } else {
          this.selectedpackagelist.push(this.selectedpackagelist);
        }
      }
    }
  }

  selectedtestlist: any = [];
  selectedpackagelist: any = [];
  allselectedtestandpakages: any = [];
  totalamount: any;

  public delete(Sno: any) {
    for (let i = 0; i < this.allselectedtestandpakages.length; i++) {
      if (Sno == this.allselectedtestandpakages[i].Sno) {
        this.allselectedtestandpakages.splice(i, 1);
        this.totalamount = this.allselectedtestandpakages
          .map((a: { Price: any }) => a.Price)
          .reduce(function (a: any, b: any) {
            return a + b;
          });
      }
    }
  }

  public slottime: any;
  diagnosticslotid: any;
  homesample: any;
  slotname: any;
  appointmentid: any;
  public BookAppointment() {
    debugger;
    this.showPopup = 0;
    if (this.homesample == undefined || this.diagnosticslotid == undefined) {
      this.showPopup = 1;
      this.messageID = 79;
      this.typeofPopUp = 2;
    } else {
      this.loader = true;
      var entity = {
        PatientID: this.patientid,
        DiagnosticCenterID: this.diagnosticID,
        DiagnosticSlotID: this.diagnosticslotid,
        Date: this.todaydate,
        TotalPrice: this.totalamount,
        HomeSampleBit: this.homesample,
        DiagnopatientNmae: this.patientname,
        SlotTime: this.slotname,
      };

      this.DiagnosticService.InsertDiagnosticAppointments(entity).subscribe(
        (data) => {
          this.appointmentid = data;

          if (data != undefined) {
            for (let k = 0; k < this.allselectedtestandpakages.length; k++) {
              var entity2 = {
                DiagnosticCenterTestsID:
                  this.allselectedtestandpakages[k].TestID,
                PackageID: this.allselectedtestandpakages[k].PackageID,
                DiagnosticAppointmentsID: this.appointmentid,
                TestType: this.allselectedtestandpakages[k].TestType,
                TestName: this.allselectedtestandpakages[k].TestName,
                Fees: this.allselectedtestandpakages[k].Price,
              };
              this.DiagnosticService.InsertDiagnosticBookedTests(
                entity2
              ).subscribe((data) => {
                if (data != undefined) {
                }
              });
            }
          }

          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          this.smsdesc = `${this.diagnosticCenterName}  vous a donné RDV le ${this.todaydate} à ${this.slotname} Merci d'arriver 15 minutes avant votre RDV. Le rappel apparaîtra sur votre app`;
          this.sendSms();
          this.sendEmail();
          location.href = '#/Diagnostic/DiagnosticOrders';

          // if (this.languageID == 1) {
          //     Swal.fire("Booked Successfully");
          //     location.href = "#/DiagnosticAppointmentDash";
          // }
          // else {
          //     Swal.fire("Réservé");
          //     location.href = "#/DiagnosticAppointmentDash";
          // }
        }
      );
    }
  }

  public GetDiagnosticSlotID(slist: any) {
    this.diagnosticslotid = slist.id;
    this.slotname = slist.slotName;
  }
  selecteddate: any;
  selectedDate(even: any) {
    this.selecteddate = even.toLocaleString().split(',')[0];
    if (this.homesample == true) {
      var gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      var d = new Date(this.todaydate);
      var dayName = gsDayNames[d.getDay()];
      this.DiagnosticService.GetDayID(dayName).subscribe((data) => {
        this.dayidslist = data;
        this.dayid = this.dayidslist[0].dayID;
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          1,
          this.dayid
        ).subscribe(
          (data) => {
            this.morningslotslist = data;
            this.morningslotslist = this.morningslotslist.filter(
              (x: { typeID: number }) => x.typeID == 1
            );
            if (this.morningslotslist.length == 0) {
              this.noMorningSlots = 0;
            }
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          2,
          this.dayid
        ).subscribe(
          (data) => {
            this.afternoonslotslist = data;
            this.afternoonslotslist = this.afternoonslotslist.filter(
              (x: { typeID: number }) => x.typeID == 1
            );

            if (this.afternoonslotslist.length == 0) {
              this.noafteternonlist = 0;
            }
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          3,
          this.dayid
        ).subscribe(
          (data) => {
            this.eveningslotslist = data;
            this.eveningslotslist = this.eveningslotslist.filter(
              (x: { typeID: number }) => x.typeID == 1
            );

            if (this.eveningslotslist.length == 0) {
              this.noeveningSlots = 0;
            }
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          4,
          this.dayid
        ).subscribe(
          (data) => {
            this.nigntslotslist = data;
            this.nigntslotslist = this.nigntslotslist.filter(
              (x: { typeID: number }) => x.typeID == 1
            );
            if (this.nigntslotslist.length == 0) {
              this.nonightist = 0;
            }
          },
          (error) => {}
        );
      });
    } else {
      var gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      var d = new Date(this.todaydate);
      var dayName = gsDayNames[d.getDay()];
      this.DiagnosticService.GetDayID(dayName).subscribe((data) => {
        this.dayidslist = data;
        this.dayid = this.dayidslist[0].dayID;
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          1,
          this.dayid
        ).subscribe(
          (data) => {
            this.morningslotslist = data;
            this.morningslotslist = this.morningslotslist.filter(
              (x: { typeID: number }) => x.typeID == 2
            );
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          2,
          this.dayid
        ).subscribe(
          (data) => {
            this.afternoonslotslist = data;
            this.afternoonslotslist = this.afternoonslotslist.filter(
              (x: { typeID: number }) => x.typeID == 2
            );
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          3,
          this.dayid
        ).subscribe(
          (data) => {
            this.eveningslotslist = data;
            this.eveningslotslist = this.eveningslotslist.filter(
              (x: { typeID: number }) => x.typeID == 2
            );
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          4,
          this.dayid
        ).subscribe(
          (data) => {
            this.nigntslotslist = data;
            this.nigntslotslist = this.nigntslotslist.filter(
              (x: { typeID: number }) => x.typeID == 2
            );
          },
          (error) => {}
        );
      });
    }
  }

  public onChange() {
    if (this.homesample == true) {
      var gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      var d = new Date(this.todaydate);
      var dayName = gsDayNames[d.getDay()];
      this.DiagnosticService.GetDayID(dayName).subscribe((data) => {
        this.dayidslist = data;
        this.dayid = this.dayidslist[0].dayID;
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          1,
          this.dayid
        ).subscribe(
          (data) => {
            this.morningslotslist = data;
            this.morningslotslist = this.morningslotslist.filter(
              (x: { typeID: number }) => x.typeID == 1
            );
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          2,
          this.dayid
        ).subscribe(
          (data) => {
            this.afternoonslotslist = data;
            this.afternoonslotslist = this.afternoonslotslist.filter(
              (x: { typeID: number }) => x.typeID == 1
            );
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          3,
          this.dayid
        ).subscribe(
          (data) => {
            this.eveningslotslist = data;
            this.eveningslotslist = this.eveningslotslist.filter(
              (x: { typeID: number }) => x.typeID == 1
            );
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          4,
          this.dayid
        ).subscribe(
          (data) => {
            this.nigntslotslist = data;
            this.nigntslotslist = this.nigntslotslist.filter(
              (x: { typeID: number }) => x.typeID == 1
            );
          },
          (error) => {}
        );
      });
    } else {
      this.homesample = false;
      var gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      var d = new Date(this.todaydate);
      var dayName = gsDayNames[d.getDay()];
      this.DiagnosticService.GetDayID(dayName).subscribe((data) => {
        this.dayidslist = data;
        this.dayid = this.dayidslist[0].dayID;
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          1,
          this.dayid
        ).subscribe(
          (data) => {
            this.morningslotslist = data;
            this.morningslotslist = this.morningslotslist.filter(
              (x: { typeID: number }) => x.typeID == 2
            );
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          2,
          this.dayid
        ).subscribe(
          (data) => {
            this.afternoonslotslist = data;
            this.afternoonslotslist = this.afternoonslotslist.filter(
              (x: { typeID: number }) => x.typeID == 2
            );
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          3,
          this.dayid
        ).subscribe(
          (data) => {
            this.eveningslotslist = data;
            this.eveningslotslist = this.eveningslotslist.filter(
              (x: { typeID: number }) => x.typeID == 2
            );
          },
          (error) => {}
        );
        this.DiagnosticService.GetDiagnosticSlotsWeb(
          this.diagnosticID,
          this.selecteddate,
          4,
          this.dayid
        ).subscribe(
          (data) => {
            this.nigntslotslist = data;
            this.nigntslotslist = this.nigntslotslist.filter(
              (x: { typeID: number }) => x.typeID == 2
            );
          },
          (error) => {}
        );
      });
    }
  }

  searchon: any;
  showSearchBox: any;

  acceptedTerms() {
    this.showSearchBox = 1;
  }
  tableid: any;
  EmailID: any;
  particularPatienDetails: any = [];
  GetPatientsID(details: any) {
    debugger;
    this.tableid = true;
    this.patientid = details.id;
    this.patientname = details.patientName;
    this.smsMobileno = details.smsmobileno;
    this.EmailID = details.emailID;
    this.particularPatienDetails.push(details);
    this.searchon = 0;
    this.showSearchBox = 0;
  }
  removeList() {
    this.tableid = false;
  }

  public Searchpatient(term: any) {
    if (term.length > 6) {
      this.searchon = 1;
    } else {
      this.searchon = 0;
    }
  }

  tablinkType: any;
  type: any;
  testlist: any;
  packageslist: any;
  openCity(evt: any) {
    this.tablinkType = evt;
    this.loader = true;
    if (this.tablinkType == 1) {
      this.type = 1;
      this.DiagnosticService.GetDiagnosticCenterTestsByID(
        this.diagnosticID,
        this.languageID
      ).subscribe(
        (data) => {
          this.testlist = data;
          this.loader = false;
        },
        (err) => {
          this.loader = false;
        }
      );
    } else {
      this.type = 2;
      this.DiagnosticService.GetDiagnosticPackagesByIDMob(
        this.diagnosticID,
        this.languageID
      ).subscribe(
        (data) => {
          this.packageslist = data;
          this.loader = false;
        },
        (error) => [(this.loader = false)]
      );
    }
  }

  smsdesc: any;

  sendSms() {
    this.CommonService.SendTwillioSMS(this.smsMobileno, this.smsdesc).subscribe(
      (data) => {}
    );
  }
  date: any;
  Selecteddate: any;
  getendDate(event: any) {
    debugger;
    this.todaydate = event;
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.todaydate = formatDate(this.todaydate, format, locale);
    console.log(this.todaydate, 'this.todaydate');
    this.date = new Date(this.todaydate);
    this.dayName = this.date.toLocaleDateString(locale, { weekday: 'long' });
    console.log(this.dayName, 'dayName');
    this.GetDiagnosticSlots();
  }

  public GetDates(newDate: any) {
    var d = new Date(newDate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var date = month + '-' + day + '-' + year;
    return (date = year + '-' + month + '-' + day);
  }
  emailattchementurl = [];
  public sendEmail() {
    debugger;
    var entity = {
      emailto: this.EmailID,
      emailsubject: 'New Appointment',
      emailbody: this.smsdesc,
      attachmenturl: this.emailattchementurl,
      cclist: 0,
      bcclist: 0,
    };
    this.CommonService.sendemail(entity).subscribe(
      (data) => {
        if (data == 'Success') {
        } else {
          // Swal.fire("Error", "Your Email is not valid. Can not send mail");
          this.loader = false;
        }
      },
      (error) => {}
    );
  }
}
