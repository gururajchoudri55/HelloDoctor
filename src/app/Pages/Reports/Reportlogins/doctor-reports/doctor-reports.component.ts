import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/Report/reportlabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-doctor-reports',
  templateUrl: './doctor-reports.component.html',
  styleUrls: ['./doctor-reports.component.css'],
})
export class DoctorReportsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  p: any;
  languageid: any;
  doctorid: any;
  id: any;
  doctorlist: any;
  loader: boolean | undefined;
  search: any;
  hospitalid: any;
  cancelledlist: any;
  dummlist: any;
  clinicid: any;
  dummlisthospitalits: any;
  hospitalcliniclist: any;
  hospitalcount: any;
  dummclinics: any;
  clnicslist: any;
  labels: any;
  currentUrl: any;

  constructor(
    private CommonService: CommonService,
    private ActivatedRoute: ActivatedRoute,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.doctorid = sessionStorage.getItem('Reportdocid');
    this.ActivatedRoute.params.subscribe((params) => {
      this.id = atob(params['id']);
    });
    var date = new Date();
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

    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);

    this.bsRangeValue = [start, end];
    if (this.id == undefined) {
      this.getcancelledappoinrtments();
    } else if (this.id == '1') {
      this.CommonService.GetAllAppointmentsForHosp(
        this.startdate,
        this.enddate
      ).subscribe(
        (data) => {
          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetAllAppointmentsForHosp',
            error
          );
          this.loader = false;
        }
      );
    } else if (this.id == '2') {
      this.CommonService.GetAllAppointmentsForClinics(
        this.startdate,
        this.enddate
      ).subscribe(
        (data) => {
          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetAllAppointmentsForClinics',
            error
          );
          this.loader = false;
        }
      );
    }
    this.gethosptilclinicforadmin();
    this.GetClincsforadmin();
    this.getcancelledappoinrtments();
  }

  //To Select Date
  selectDate(data: any) {
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);
    this.getcancelledappoinrtments();

    if (this.id == undefined) {
      this.getcancelledappoinrtments();
    } else if (this.id == '1') {
      this.CommonService.GetAllAppointmentsForHosp(
        this.startdate,
        this.enddate
      ).subscribe(
        (data) => {
          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetAllAppointmentsForHosp',
            error
          );
          this.loader = false;
        }
      );
    } else if (this.id == '2') {
      this.CommonService.GetAllAppointmentsForClinics(
        this.startdate,
        this.enddate
      ).subscribe(
        (data) => {
          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetAllAppointmentsForClinics',
            error
          );
          this.loader = false;
        }
      );
    }
  }

  public getcancelledappoinrtments() {
    this.CommonService.GetCancelledAppointmentReportsForDoctor(
      this.doctorid,
      this.startdate,
      this.enddate,
      this.languageid
    ).subscribe(
      (data) => {
        this.cancelledlist = data;
        this.dummlist = this.cancelledlist;
        this.count = this.cancelledlist.length;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetCancelledAppointmentReportsForDoctor',
          error
        );
        this.loader = false;
      }
    );
  }

  public GetHosptalWiseAppointments(even: any) {
    if (this.id == 1) {
      this.hospitalid = even.target.value;
      this.cancelledlist = this.dummlist.filter(
        (x: { hospitalClinicID: any }) => x.hospitalClinicID == this.hospitalid
      );
      this.count = this.cancelledlist.length;
      if (this.id == 2) {
        this.clinicid = even.target.value;
        this.cancelledlist = this.dummlist.filter(
          (x: { hospitalClinicID: any }) => x.hospitalClinicID == this.clinicid
        );
        this.count = this.cancelledlist.length;
      }
    }
  }

  public gethosptilclinicforadmin() {
    this.CommonService.GetHospital_ClinicForAdminByAdmin(
      this.languageid
    ).subscribe(
      (data) => {
        this.dummlisthospitalits = data;
        this.hospitalcliniclist = this.dummlisthospitalits.filter(
          (x: { hospital_ClinicID: number }) =>
            x.hospital_ClinicID == 1 || x.hospital_ClinicID == 3
        );
        this.hospitalcount = this.hospitalcliniclist.length;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHospital_ClinicForAdminByAdmin',
          error
        );
        this.loader = false;
      }
    );
  }
  public GetClincsforadmin() {
    this.CommonService.GetHospital_ClinicForAdminByAdmin(
      this.languageid
    ).subscribe(
      (data) => {
        this.dummclinics = data;
        this.clnicslist = this.dummclinics.filter(
          (x: { hospital_ClinicID: number }) => x.hospital_ClinicID == 2
        );
        this.hospitalcount = this.clnicslist.length;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHospital_ClinicForAdminByAdmin',
          error
        );
      }
    );
  }

  count: any;

  public getget(even: any) {
    if (even.target.value == 1) {
      let dfsfd = this.dummlist.filter(
        (x: { isVisited: number }) => x.isVisited == 1
      );

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length;
    }
    if (even.target.value == 2) {
      let dfsfd = this.dummlist.filter(
        (x: { noShow: number }) => x.noShow == 1
      );

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length;
    }
    if (even.target.value == 3) {
      let dfsfd = this.dummlist.filter(
        (x: { cancelled: number; docCancelled: number }) =>
          x.cancelled == 1 || x.docCancelled == 1
      );

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length;
    }
    if (even.target.value == 4) {
      this.getcancelledappoinrtments();
      this.CommonService.GetAllAppointmentsForHosp(
        this.startdate,
        this.enddate
      ).subscribe(
        (data) => {
          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetAllAppointmentsForHosp',
            error
          );
          this.loader = false;
        }
      );
    }
  }

  public GetAppointmenttype(even: any) {
    if (even.target.value == '2') {
      let dfsfd = this.dummlist.filter(
        (x: { appointmentTypeID: number }) => x.appointmentTypeID == 1
      );
      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length;
    }
    if (even.target.value == '3') {
      let dfsfd = this.dummlist.filter(
        (x: { appointmentTypeID: number }) => x.appointmentTypeID == 2
      );

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length;
    }
    if (even.target.value == '4') {
      let dfsfd = this.dummlist.filter(
        (x: { appointmentTypeID: number }) => x.appointmentTypeID == 5
      );

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length;
    }
    if (even.target.value == '1') {
      if (this.id == undefined) {
        this.getcancelledappoinrtments();
      } else if (this.id == '1') {
        this.CommonService.GetAllAppointmentsForHosp(
          this.startdate,
          this.enddate
        ).subscribe(
          (data) => {
            this.cancelledlist = data;
            this.dummlist = this.cancelledlist;
            this.count = this.cancelledlist.length;
          },
          (error) => {
            this.SharedService.insertexceptions(
              this.currentUrl,
              'GetAllAppointmentsForHosp',
              error
            );
            this.loader = false;
          }
        );
      } else if (this.id == '2') {
        this.CommonService.GetAllAppointmentsForClinics(
          this.startdate,
          this.enddate
        ).subscribe(
          (data) => {
            this.cancelledlist = data;
            this.dummlist = this.cancelledlist;
            this.count = this.cancelledlist.length;
          },
          (error) => {
            this.SharedService.insertexceptions(
              this.currentUrl,
              'GetAllAppointmentsForClinics',
              error
            );
            this.loader = false;
          }
        );
      }
    }
  }

  // Pagination

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  //Export Excel
  selectedFieldsList: any;
  item: any;
  fileName = 'Doctor Report List.xlsx';
  exportexcel(): void {
    debugger;
    let element = document.getElementById('download');
    const selectedFieldsList = this.cancelledlist.map(
      (item: {
        appdate: any;
        id: any;
        slots: any;
        appointmentTypeText: any;
        hospital_ClinicName: any;
        doctorName: any;
        reasonForVisit: any;
        pName: any;
        pMobileNo: any;
        emailID: any;
        paymentType: any;
        paidamount: any;
      }) => ({
        AppointmentDate: item.appdate,
        AppointmentNumber: item.id,
        AppointmentTime: item.slots,
        AppointmentType: item.appointmentTypeText,
        HOspitalName: item.hospital_ClinicName,
        DoctorName: item.doctorName,
        Ailment: item.reasonForVisit,
        PatientName: item.pName,
        PhoneNumber: item.pMobileNo,
        Email: item.emailID,
        PaymentType: item.paymentType,
        Price: item.paidamount,
      })
    );
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedFieldsList);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
}
