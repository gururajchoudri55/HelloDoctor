import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import Labels from '../../Lables/Doctors/myAppointments.json';

@Component({
  selector: 'app-doctor-slots',
  templateUrl: './doctor-slots.component.html',
  styleUrls: ['./doctor-slots.component.css'],
})
export class DoctorSlotsComponent implements OnInit {
  appointmentDate: any;

  constructor(
    private DoctorService: DoctorService,
    private ActivatedRoute: ActivatedRoute,
    private SharedService: SharedService
  ) {}
  doctorID: any;
  doctorType: any;
  bookingType: any;
  hospitalID: any;
  doctorid: any;
  docHospitalID: any;
  hospitalClinicID: any;
  appointmentTypeID: any;
  bookibgTypeID: any;
  slotTypeID: any;
  dayIDList: any;
  dayID: any;
  todayDate: any;
  presenttime: any;
  serverdateandtime: any;
  eveningSlots: any;
  nightSlots: any;
  languageID: any;
  typeofAppointment: any;
  loader: boolean | undefined;
  labels: any;
  showback: any;
  currentUrl: any;
  doctorName: any;

  ngOnInit(): void {
    debugger;
    this.loader = true;
    this.currentUrl = window.location.href;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todayDate = formatDate(myDate, format, locale);
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.showback = sessionStorage.getItem('Showbutton');
    this.DoctorService.GetServerDateAndTime().subscribe(
      (data) => {
        this.serverdateandtime = data;
        this.presenttime = this.serverdateandtime.presentTime;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetServerDateAndTime',
          error
        );
      }
    );

    this.hospitalID = sessionStorage.getItem('hospitalClinicID');
    this.ActivatedRoute.params.subscribe((params: { [x: string]: any }) => {
      this.doctorid = params['doctorID'];
      this.doctorName = params['doctorName'];
      this.docHospitalID = params['id'];
      this.hospitalClinicID = params['hospital_ClinicID'];
      this.appointmentTypeID = params['appointmentTypeID'];
      console.log(this.appointmentTypeID, 'appointmentTypeID');
      this.bookibgTypeID = params['bookingTypeID'];
      this.slotTypeID = params['slotDurationID'];
      var date = sessionStorage.getItem('SelectedDate');
      this.appointmentDate = this.DoctorService.GetDates(date);

      var gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      var d = new Date(this.appointmentDate);
      var dayName = gsDayNames[d.getDay()];

      this.DoctorService.GetDayID(dayName).subscribe((data) => {
        this.dayIDList = data;
        this.dayID = this.dayIDList[0].dayID;

        sessionStorage.setItem('doctorid', this.doctorid);
        sessionStorage.setItem('doctorhospitalid', this.docHospitalID);
        sessionStorage.setItem('appointmentate', this.appointmentDate);
        sessionStorage.setItem('Appointmenttypeid', this.appointmentTypeID);
        sessionStorage.setItem('BookingTypeID', this.bookibgTypeID);

        if (this.appointmentTypeID == 1) {
          if (this.languageID == 1) {
            this.typeofAppointment = 'In Clinic';
          } else {
            this.typeofAppointment = 'Présentiel';
          }
        } else if (this.appointmentTypeID == 2) {
          if (this.languageID == 1) {
            this.typeofAppointment = 'Video call';
          } else {
            this.typeofAppointment = 'Téléconsultation';
          }
        } else if (this.appointmentTypeID == 5) {
          if (this.languageID == 1) {
            this.typeofAppointment = 'Home Visit';
          } else {
            this.typeofAppointment = 'Visite à domicile';
          }
        }

        // sessionStorage.setItem('fees', this.doctorfees);

        if (this.todayDate == this.appointmentDate) {
          if (this.appointmentTypeID == 5) {
            this.getdoctorHomevistmorningslots();
            this.getDocHomeVistafternoonslots();
            this.getHomeVisiteveningslots();
            this.GetHomeVistNightslots();
            this.loader = false;
          } else {
            this.getdoctormorningslots();
            this.getafternoonslots();
            this.geteveningslots();
            this.GetNightslots();
            this.loader = false;
          }
        } else {
          if (this.appointmentTypeID == 5) {
            this.DoctorService.GetDoctorSlotsss(
              this.doctorid,
              this.dayID,
              this.hospitalClinicID,
              1,
              this.appointmentDate,
              this.docHospitalID,
              this.slotTypeID
            ).subscribe(
              (data) => {
                this.doctorslots = data.filter(
                  (x) => x.appointmentTypeID == this.appointmentTypeID
                );
              },
              (error) => {}
            );
            this.DoctorService.GetDoctorSlotsss(
              this.doctorid,
              this.dayID,
              this.hospitalClinicID,
              2,
              this.appointmentDate,
              this.docHospitalID,
              this.slotTypeID
            ).subscribe(
              (data) => {
                this.afternoonSLots = data.filter(
                  (x) => x.appointmentTypeID == this.appointmentTypeID
                );
              },
              (error) => {}
            );
            this.DoctorService.GetDoctorSlotsss(
              this.doctorid,
              this.dayID,
              this.hospitalClinicID,
              3,
              this.appointmentDate,
              this.docHospitalID,
              this.slotTypeID
            ).subscribe(
              (data) => {
                this.eveningSlots = data.filter(
                  (x) => x.appointmentTypeID == this.appointmentTypeID
                );
              },
              (error) => {}
            );
            this.DoctorService.GetDoctorSlotsss(
              this.doctorid,
              this.dayID,
              this.hospitalClinicID,
              4,
              this.appointmentDate,
              this.docHospitalID,
              this.slotTypeID
            ).subscribe(
              (data) => {
                this.nightSlots = data.filter(
                  (x) => x.appointmentTypeID == this.appointmentTypeID
                );
              },
              (error) => {}
            );
            this.loader = false;
          } else {
            this.DoctorService.GetDoctorSlotsForWeb(
              this.doctorid,
              this.dayID,
              this.hospitalClinicID,
              1,
              this.appointmentDate,
              this.docHospitalID,
              this.slotTypeID
            ).subscribe(
              (data) => {
                //this.doctorslots = data;
                this.doctorslots = data.filter(
                  (x) => x.appointmentTypeID == this.appointmentTypeID
                );
              },
              (error) => {}
            );
            this.DoctorService.GetDoctorSlotsForWeb(
              this.doctorid,
              this.dayID,
              this.hospitalClinicID,
              2,
              this.appointmentDate,
              this.docHospitalID,
              this.slotTypeID
            ).subscribe(
              (data) => {
                this.afternoonSLots = data.filter(
                  (x) => x.appointmentTypeID == this.appointmentTypeID
                );
              },
              (error) => {}
            );
            this.DoctorService.GetDoctorSlotsForWeb(
              this.doctorid,
              this.dayID,
              this.hospitalClinicID,
              3,
              this.appointmentDate,
              this.docHospitalID,
              this.slotTypeID
            ).subscribe(
              (data) => {
                //this.eveningSlots = data;
                this.eveningSlots = data.filter(
                  (x) => x.appointmentTypeID == this.appointmentTypeID
                );
              },
              (error) => {}
            );
            this.DoctorService.GetDoctorSlotsForWeb(
              this.doctorid,
              this.dayID,
              this.hospitalClinicID,
              4,
              this.appointmentDate,
              this.docHospitalID,
              this.slotTypeID
            ).subscribe(
              (data) => {
                this.nightSlots = data.filter(
                  (x) => x.appointmentTypeID == this.appointmentTypeID
                );
              },
              (error) => {
                this.SharedService.insertexceptions(
                  this.currentUrl,
                  'GetDoctorSlotsForWeb',
                  error
                );
              }
            );
          }
          this.loader = false;
          sessionStorage.setItem('appointmentate', this.appointmentDate);
        }
      });
    });
  }

  eveningSlots1: any;
  getendDate(endDate: any) {
    debugger;
    this.loader = true;
    this.appointmentDate = this.DoctorService.GetDates(endDate);
    console.log(this.appointmentTypeID, 'appointmentTypeID');
    sessionStorage.setItem('appointmentate', this.appointmentDate);
    sessionStorage.setItem('Appointmenttypeid', this.appointmentTypeID);

    if (this.appointmentDate == this.todayDate) {
      if (this.appointmentTypeID == 5) {
        this.dayID = new Date().getDay();
        this.getdoctorHomevistmorningslots();
        this.getDocHomeVistafternoonslots();
        this.getHomeVisiteveningslots();
        this.GetHomeVistNightslots();
        this.loader = false;
      } else {
        this.dayID = new Date().getDay();
        this.getdoctormorningslots();
        this.getafternoonslots();
        this.geteveningslots();
        this.GetNightslots();
        this.loader = false;
      }
    } else {
      if (this.appointmentTypeID == 5) {
        var gsDayNames = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];

        var d = new Date(this.appointmentDate);
        var dayName = gsDayNames[d.getDay()];
        this.DoctorService.GetDayID(dayName).subscribe((data) => {
          this.dayIDList = data;
          this.dayID = this.dayIDList[0].dayID;
          // this.selecteddate = this.docservice.GetDates(newDate)
          // even.toLocaleString().split(',')[0];
          this.DoctorService.GetDoctorSlotsss(
            this.doctorid,
            this.dayID,
            this.hospitalClinicID,
            1,
            this.appointmentDate,
            this.docHospitalID,
            this.slotTypeID
          ).subscribe(
            (data) => {
              this.doctorslots = data.filter(
                (x) => x.appointmentTypeID == this.appointmentTypeID
              );
            },
            (error) => {
              this.SharedService.insertexceptions(
                this.currentUrl,
                'GetDoctorSlotsss',
                error
              );
            }
          );
          this.DoctorService.GetDoctorSlotsss(
            this.doctorid,
            this.dayID,
            this.hospitalClinicID,
            2,
            this.appointmentDate,
            this.docHospitalID,
            this.slotTypeID
          ).subscribe(
            (data) => {
              this.afternoonSLots = data.filter(
                (x) => x.appointmentTypeID == this.appointmentTypeID
              );
            },
            (error) => {
              this.SharedService.insertexceptions(
                this.currentUrl,
                'GetDoctorSlotsss',
                error
              );
            }
          );
          this.DoctorService.GetDoctorSlotsss(
            this.doctorid,
            this.dayID,
            this.hospitalClinicID,
            3,
            this.appointmentDate,
            this.docHospitalID,
            this.slotTypeID
          ).subscribe(
            (data) => {
              this.eveningSlots = data.filter(
                (x) => x.appointmentTypeID == this.appointmentTypeID
              );
            },
            (error) => {
              this.SharedService.insertexceptions(
                this.currentUrl,
                'GetDoctorSlotsss',
                error
              );
            }
          );
          this.DoctorService.GetDoctorSlotsss(
            this.doctorid,
            this.dayID,
            this.hospitalClinicID,
            4,
            this.appointmentDate,
            this.docHospitalID,
            this.slotTypeID
          ).subscribe(
            (data) => {
              this.nightSlots = data.filter(
                (x) => x.appointmentTypeID == this.appointmentTypeID
              );
            },
            (error) => {
              this.SharedService.insertexceptions(
                this.currentUrl,
                'GetDoctorSlotsss',
                error
              );
            }
          );
          this.loader = false;
        });
      } else {
        debugger;
        var gsDayNames = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        var d = new Date(this.appointmentDate);
        var dayName = gsDayNames[d.getDay()];
        this.DoctorService.GetDayID(dayName).subscribe((data) => {
          this.dayIDList = data;
          this.dayID = this.dayIDList[0].dayID;
          // this.selecteddate = this.docservice.GetDates(newDate)
          // even.toLocaleString().split(',')[0];
          this.DoctorService.GetDoctorSlotsForWeb(
            this.doctorid,
            this.dayID,
            this.hospitalClinicID,
            1,
            this.appointmentDate,
            this.docHospitalID,
            this.slotTypeID
          ).subscribe(
            (data) => {
              this.doctorslots = data.filter(
                (x) => x.appointmentTypeID == this.appointmentTypeID
              );
            },
            (error) => {}
          );
          this.DoctorService.GetDoctorSlotsForWeb(
            this.doctorid,
            this.dayID,
            this.hospitalClinicID,
            2,
            this.appointmentDate,
            this.docHospitalID,
            this.slotTypeID
          ).subscribe(
            (data) => {
              this.afternoonSLots = data.filter(
                (x) => x.appointmentTypeID == this.appointmentTypeID
              );
            },
            (error) => {}
          );
          this.DoctorService.GetDoctorSlotsForWeb(
            this.doctorid,
            this.dayID,
            this.hospitalClinicID,
            3,
            this.appointmentDate,
            this.docHospitalID,
            this.slotTypeID
          ).subscribe(
            (data) => {
              debugger;
              //this.eveningSlots = data;
              this.eveningSlots = data.filter(
                (x) => x.appointmentTypeID == this.appointmentTypeID
              );
              console.log(data, 'eveningSlots');
            },
            (error) => {}
          );
          this.DoctorService.GetDoctorSlotsForWeb(
            this.doctorid,
            this.dayID,
            this.hospitalClinicID,
            4,
            this.appointmentDate,
            this.docHospitalID,
            this.slotTypeID
          ).subscribe(
            (data) => {
              this.nightSlots = data.filter(
                (x) => x.appointmentTypeID == this.appointmentTypeID
              );
            },
            (error) => {}
          );
        });
        this.loader = false;
      }
    }
  }

  hours: any;
  minutes: any;
  doctorslots: any;

  afternoonSLots: any;

  public getdoctorHomevistmorningslots() {
    // this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    let d = new Date();
    this.hours = d.getHours() + 2;
    this.minutes = d.getMinutes() + 30;
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;
    this.DoctorService.GetDoctorSlotsss(
      this.doctorid,
      this.dayID,
      this.hospitalClinicID,
      1,
      this.appointmentDate,
      this.docHospitalID,
      this.slotTypeID
    ).subscribe(
      (data) => {
        this.doctorslots = data.filter(
          (x: { slotcompare: number; appointmentTypeID: any }) =>
            x.slotcompare > this.presenttime &&
            x.appointmentTypeID == this.appointmentTypeID
        );
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorSlotsss',
          error
        );
      }
    );
  }

  public getDocHomeVistafternoonslots() {
    //this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    let d = new Date();
    this.hours = d.getHours() + 2;
    this.minutes = d.getMinutes() + 30;
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;

    this.DoctorService.GetDoctorSlotsss(
      this.doctorid,
      this.dayID,
      this.hospitalClinicID,
      2,
      this.appointmentDate,
      this.docHospitalID,
      this.slotTypeID
    ).subscribe(
      (data) => {
        this.afternoonSLots = data.filter(
          (x: { slotcompare: number; appointmentTypeID: any }) =>
            x.slotcompare > this.presenttime &&
            x.appointmentTypeID == this.appointmentTypeID
        );
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorSlotsss',
          error
        );
      }
    );
  }

  public getHomeVisiteveningslots() {
    let d = new Date();
    this.hours = d.getHours() + 2;
    this.minutes = d.getMinutes() + 30;
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;
    // this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    this.DoctorService.GetDoctorSlotsss(
      this.doctorid,
      this.dayID,
      this.hospitalClinicID,
      3,
      this.appointmentDate,
      this.docHospitalID,
      this.slotTypeID
    ).subscribe(
      (data) => {
        this.eveningSlots = data.filter(
          (x) =>
            x.slotcompare > this.presenttime &&
            x.appointmentTypeID == this.appointmentTypeID
        );
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorSlotsss',
          error
        );
      }
    );
  }

  public GetHomeVistNightslots() {
    //this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    let d = new Date();
    this.hours = d.getHours() + 2;
    this.minutes = d.getMinutes() + 30;
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;
    this.DoctorService.GetDoctorSlotsss(
      this.doctorid,
      this.dayID,
      this.hospitalClinicID,
      4,
      this.appointmentDate,
      this.docHospitalID,
      this.slotTypeID
    ).subscribe(
      (data) => {
        this.nightSlots = data.filter(
          (x: { slotcompare: number; appointmentTypeID: any }) =>
            x.slotcompare > this.presenttime &&
            x.appointmentTypeID == this.appointmentTypeID
        );
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorSlotsss',
          error
        );
      }
    );
  }

  public getdoctormorningslots() {
    // this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    let d = new Date();
    this.hours = d.getHours() + 2;
    this.minutes = d.getMinutes() + 30;
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;
    this.DoctorService.GetDoctorSlotsForWeb(
      this.doctorid,
      this.dayID,
      this.hospitalClinicID,
      1,
      this.appointmentDate,
      this.docHospitalID,
      this.slotTypeID
    ).subscribe(
      (data) => {
        this.doctorslots = data.filter(
          (x) =>
            x.slotcompare > this.presenttime &&
            x.appointmentTypeID == this.appointmentTypeID
        );
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorSlotsForWeb',
          error
        );
      }
    );
  }

  public getafternoonslots() {
    //this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    let d = new Date();
    this.hours = d.getHours() + 2;
    this.minutes = d.getMinutes() + 30;
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;

    this.DoctorService.GetDoctorSlotsForWeb(
      this.doctorid,
      this.dayID,
      this.hospitalClinicID,
      2,
      this.appointmentDate,
      this.docHospitalID,
      this.slotTypeID
    ).subscribe(
      (data) => {
        this.afternoonSLots = data.filter(
          (x) =>
            x.slotcompare > this.presenttime &&
            x.appointmentTypeID == this.appointmentTypeID
        );
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorSlotsForWeb',
          error
        );
      }
    );
  }

  public geteveningslots() {
    debugger;
    let d = new Date();
    this.hours = d.getHours() + 2;
    this.minutes = d.getMinutes() + 30;
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;
    // this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    this.DoctorService.GetDoctorSlotsForWeb(
      this.doctorid,
      this.dayID,
      this.hospitalClinicID,
      3,
      this.appointmentDate,
      this.docHospitalID,
      this.slotTypeID
    ).subscribe(
      (data) => {
        this.eveningSlots = data.filter(
          (x) =>
            x.slotcompare > this.presenttime &&
            x.appointmentTypeID == this.appointmentTypeID
        );
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorSlotsForWeb',
          error
        );
      }
    );
  }

  public GetNightslots() {
    //this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    let d = new Date();
    this.hours = d.getHours() + 2;
    this.minutes = d.getMinutes() + 30;
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;
    this.DoctorService.GetDoctorSlotsForWeb(
      this.doctorid,
      this.dayID,
      this.hospitalClinicID,
      4,
      this.appointmentDate,
      this.docHospitalID,
      this.slotTypeID
    ).subscribe(
      (data) => {
        this.nightSlots = data.filter(
          (x) =>
            x.slotcompare > this.presenttime &&
            x.appointmentTypeID == this.appointmentTypeID
        );
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorSlotsForWeb',
          error
        );
      }
    );
  }
}
