import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import Labels from '../../Lables/Hospital/hospitallabels.json';

@Component({
  selector: 'app-video-call-revenue-details',
  templateUrl: './video-call-revenue-details.component.html',
  styleUrls: ['./video-call-revenue-details.component.css'],
})
export class VideoCallRevenueDetailsComponent implements OnInit {
  currentURl: any;
  languageid: any;
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  loader: boolean | undefined;
  departmentlist: any;
  hospitalid: any;
  sdate: any;
  edate: any;
  dummlist: any;
  cancelledlist: any;
  TotalAmount: any;
  count: any;
  search: any;
  grandtotal: any;
  labels: any;
  p: any;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    debugger;
    this.currentURl = window.location.href;
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

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);
    this.GetHospitalAppointmentDetails();
  }

  //Get DepartmentList
  public getdepartmentmaster() {
    this.DoctorService.GetDepartmentMasterByLanguageID(
      this.languageid
    ).subscribe(
      (data) => {
        this.departmentlist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentURl,
          'GetDepartmentMasterByLanguageID',
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

  public GetHospitalAppointmentDetails() {
    debugger;
    this.DoctorService.GetHospitalVideocallAppointmentDetails(
      this.hospitalid,
      this.startdate,
      this.enddate
    ).subscribe(
      (data) => {
        this.cancelledlist = data;
        // this.cancelledlist = this.dummlist.filter(
        //   (x: { appointmentTypeID: number; isVisited: number }) =>
        //     x.appointmentTypeID == 2 && x.isVisited == 1
        // );
        this.count = this.cancelledlist.length;
        // this.grandtotal=0
        // this.grandtotal = this.cancelledlist.map((a: { paidAmount: any; }) => a.paidAmount)?.reduce(function (a:any, b:any) {
        //   return a + b;
        // });
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentURl,
          'GetHospitalAppointmentDetails',
          error
        );
      }
    );
  }

  // Pagination

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }
}
