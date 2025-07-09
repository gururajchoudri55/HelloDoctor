import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonService } from 'src/app/Pages/services/common.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Report/reportlabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-total-appointment-reports',
  templateUrl: './total-appointment-reports.component.html',
  styleUrls: ['./total-appointment-reports.component.css'],
})
export class TotalAppointmentReportsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  diffid: any;
  hospitalid: any;
  cancelledlist: any;
  dummlist: any;
  count: any;
  doctorid: any;
  languageid: any;
  hospitallist: any;
  showreason: any;
  search: any;
  labels: any;
  loader: boolean | undefined;
  currentUrl: any;

  constructor(
    private CommonService: CommonService,
    private ActivatedRoute: ActivatedRoute,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    debugger;
    this.loader = false;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.doctorid = sessionStorage.getItem('userid');
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

    this.bsRangeValue = [start, end];

    this.ActivatedRoute.params.subscribe((params) => {
      this.diffid = atob(params['id']);
    });
    if (this.diffid == undefined) {
      this.getcancelledappoinrtments();
      this.showreason = 1;
    } else if (this.diffid == '1') {
      this.CommonService.GetCancelledAppointmentReportsForDoctorwEB(
        this.startdate,
        this.enddate,
        this.languageid
      ).subscribe(
        (data) => {
          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length;
          this.loader = false;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetCancelledAppointmentReportsForDoctorwEB',
            error
          );
          this.loader = false;
        }
      );
    } else if (this.diffid == '2') {
      this.CommonService.GetAppointmentReportsForHomeAppts(
        this.startdate,
        this.enddate,
        this.languageid
      ).subscribe(
        (data) => {
          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length;
          this.loader = false;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetCancelledAppointmentReportsForVideoAppts',
            error
          );
          this.loader = false;
        }
      );
    } else if (this.diffid == '5') {
      this.CommonService.GetCancelledAppointmentReportsForVideoAppts(
        this.startdate,
        this.enddate,
        this.languageid
      ).subscribe(
        (data: any) => {
          this.cancelledlist = data.filter(
            (x: { appointmentTypeID: number }) => x.appointmentTypeID == 2
          );
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length;
          this.loader = false;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetCancelledAppointmentReportsForVideoAppts',
            error
          );
          this.loader = false;
        }
      );
    }

    this.GetHospitallist();
  }

  //To Select Date
  selectDate(data: any) {
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);

    if (this.diffid == undefined) {
      this.getcancelledappoinrtments();
      this.showreason = 1;
    } else if (this.diffid == '1') {
      this.CommonService.GetCancelledAppointmentReportsForDoctorwEB(
        this.startdate,
        this.enddate,
        this.languageid
      ).subscribe(
        (data) => {
          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length;
          this.loader = false;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetCancelledAppointmentReportsForDoctorwEB',
            error
          );
          this.loader = false;
        }
      );
    } else if (this.diffid == '2') {
      this.CommonService.GetCancelledAppointmentReportsForVideoAppts(
        this.startdate,
        this.enddate,
        this.languageid
      ).subscribe(
        (data) => {
          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length;
          this.loader = false;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetCancelledAppointmentReportsForVideoAppts',
            error
          );
          this.loader = false;
        }
      );
    }
  }

  //export to excel
  fileName = 'appointmentlist.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName, { password: 'S3cret!' });
  }

  public GetHospitalID(even: any) {
    if (this.diffid == 1) {
      this.hospitalid = even.target.value;
      this.cancelledlist = this.dummlist.filter(
        (x: { hospitalClinicID: any }) => x.hospitalClinicID == this.hospitalid
      );
    } else if (this.diffid == 2) {
      this.hospitalid = even.target.value;
      this.cancelledlist = this.dummlist.filter(
        (x: { hospitalClinicID: any }) => x.hospitalClinicID == this.hospitalid
      );
    } else {
      this.ngOnInit();
    }
  }

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
        (x: {
          isVisited: string;
          accepted: string;
          cancelled: string;
          docCancelled: string;
        }) =>
          x.isVisited == '0' &&
          x.accepted == '0' &&
          x.cancelled == '0' &&
          x.docCancelled == '0'
      );

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length;
    }

    if (even.target.value == 4) {
      let dfsfd = this.dummlist.filter(
        (x: {
          accepted: string;
          isVisited: string;
          docCancelled: string;
          cancelled: string;
          noShow: string;
        }) =>
          x.accepted == '1' &&
          x.isVisited == '0' &&
          x.docCancelled == '0' &&
          x.cancelled == '0' &&
          x.noShow == '0'
      );

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length;
    }
    if (even.target.value == 5) {
      let dfsfd = this.dummlist.filter(
        (x: { cancelled: string }) => x.cancelled == '1'
      );

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length;
    }
    if (even.target.value == 6) {
      let dfsfd = this.dummlist.filter(
        (x: { docCancelled: string }) => x.docCancelled == '1'
      );

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length;
    }

    if (even.target.value == 0) {
      this.getcancelledappoinrtments();
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
        this.dummlist = data;
        this.cancelledlist = this.dummlist.filter(
          (x: { refundBit: number }) => x.refundBit == 1
        );
        this.count = this.cancelledlist.length;
        this.loader = false;
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

  public GetHospitallist() {
    this.CommonService.GetHospital_ClinicForAdminByAdmin(
      this.languageid
    ).subscribe(
      (data) => {
        this.hospitallist = data;
        this.loader = false;
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
}
