import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
import Labels from '../../Lables/Hospital/hospitallabels.json';

@Component({
  selector: 'app-in-clinc-appointments',
  templateUrl: './in-clinc-appointments.component.html',
  styleUrls: ['./in-clinc-appointments.component.css'],
})
export class InClincAppointmentsComponent implements OnInit {
  startdate: any;
  enddate: any;
  hospitalid: any;
  languageid: any;
  dummlist: any;
  cancelledlist: any;
  TotalAmount: any;
  count: any;
  currentUrl: any;
  loader: boolean | undefined;
  search: any;
  bsRangeValue: any;
  departmentlist: any;
  labels: any;
  p: any;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loader = true;
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
    this.GetHospitalAppointmentDetails();
    this.getdepartmentmaster();
  }

  // Pagination

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
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

  public GetHospitalAppointmentDetails() {
    this.DoctorService.GetHospitalAppointmentDetails(
      this.hospitalid,
      this.startdate,
      this.enddate
    ).subscribe(
      (data) => {
        this.cancelledlist = data;
        // this.cancelledlist = this.dummlist.filter((x: { appointmentTypeID: number; isVisited: number }) => x.appointmentTypeID == 1 && x.isVisited == 1);
        let total1 = 0;
        // this.cancelledlist.forEach((element: { PaidAmount: number; }) => {
        //   total1 += element.PaidAmount;
        // });
        this.TotalAmount = total1;
        this.count = this.cancelledlist.length;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHospitalAppointmentDetails',
          error
        );
        this.loader = false;
      }
    );
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);
    this.GetHospitalAppointmentDetails();
    this.loader = false;
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
        this.loader = false;
      }
    );
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
