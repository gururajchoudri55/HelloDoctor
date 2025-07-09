import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../Lables/Hospital/hospitallabels.json';

@Component({
  selector: 'app-video-call-appointments',
  templateUrl: './video-call-appointments.component.html',
  styleUrls: ['./video-call-appointments.component.css'],
})
export class VideoCallAppointmentsComponent implements OnInit {
  hospitalid: any;
  languageid: any;
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  dummlist: any;
  cancelledlist: any;
  TotalAmount: any;
  count: any;
  departmentlist: any;
  currentUrl: any;
  search: any;
  loader: boolean | undefined;
  labels: any;
  p: any;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
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
    this.getdepartmentmaster();
    this.GetHospitalAppointmentDetails();
  }

  public getdepartmentmaster() {
    this.DoctorService.GetDepartmentMasterByLanguageID(
      this.languageid
    ).subscribe(
      (data) => {
        this.departmentlist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDepartmentMasterByLanguageID',
          error
        );
      }
    );
  }

  public GetHospitalAppointmentDetails() {
    this.DoctorService.GetHospitalVideocallAppointmentDetails(
      this.hospitalid,
      this.startdate,
      this.enddate
    ).subscribe(
      (data) => {
        this.cancelledlist = data;
        // this.cancelledlist = this.dummlist.filter(
        //   (x: { appointmentTypeID: number }) => x.appointmentTypeID == 2
        // );
        // let total1 = 0;
        // this.cancelledlist.forEach((element: { paidAmount: number; }) => {
        //   total1 += element.paidAmount;
        // });
        //this.TotalAmount = total1
        this.count = this.cancelledlist.length;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHospitalAppointmentDetails',
          error
        );
      }
    );
  }

  //export to excel
  fileName = 'Hospital Dashboard Reports.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  //To Select Date
  selectDate(data: any) {
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);
  }

  // Pagination

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  selectStatus(even: any) {
    if (even.target.value == 1) {
      this.cancelledlist = this.dummlist.filter(
        (x: { cancelled: number }) => x.cancelled == 1
      );
    } else if (even.target.value == 2) {
      this.cancelledlist = this.dummlist.filter(
        (x: { docCancelled: number }) => x.docCancelled == 1
      );
    } else if (even.target.value == 3) {
      this.cancelledlist = this.dummlist.filter(
        (x: { noShow: number }) => x.noShow == 1
      );
    } else {
      this.GetHospitalAppointmentDetails();
    }
  }
}
