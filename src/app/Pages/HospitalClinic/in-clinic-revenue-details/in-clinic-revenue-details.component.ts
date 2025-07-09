import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { SharedService } from '../../services/shared.service';
import * as XLSX from 'xlsx';
import Labels from '../../Lables/Hospital/hospitallabels.json';

@Component({
  selector: 'app-in-clinic-revenue-details',
  templateUrl: './in-clinic-revenue-details.component.html',
  styleUrls: ['./in-clinic-revenue-details.component.css'],
})
export class InClinicRevenueDetailsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  loader: boolean | undefined;
  currentURl: any;
  dummlist: any;
  hospitalid: any;
  sdate: any;
  edate: any;
  cancelledlist: any;
  TotalAmount: any;
  count: any;
  search: any;
  languageid: any;
  departmentlist: any;
  labels: any;
  p: any;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.currentURl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.hospitalid = sessionStorage.getItem('hospitalid');
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
    this.loader = false;
  }

  //Get DepartmentList
  public getdepartmentmaster() {
    this.DoctorService.GetDepartmentMasterByLanguageID(
      this.languageid
    ).subscribe(
      (data) => {
        this.departmentlist = data;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentURl,
          'GetDepartmentMasterByLanguageID',
          error
        );
        this.loader = false;
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
    this.DoctorService.GetHospitalAppointmentDetails(
      this.hospitalid,
      this.startdate,
      this.enddate
    ).subscribe(
      (data) => {
        this.cancelledlist = data;
        // this.cancelledlist = this.dummlist.filter((x: { appointmentTypeID: number; }) => x.appointmentTypeID == 1);
        let total1 = 0;
        this.cancelledlist.forEach((element: { PaidAmount: number }) => {
          total1 += element.PaidAmount;
        });
        this.TotalAmount = total1;
        this.count = this.cancelledlist.length;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentURl,
          'GetHospitalAppointmentDetails',
          error
        );
        this.loader = false;
      }
    );
  }

  // Pagination

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }
}
