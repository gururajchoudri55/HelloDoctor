import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import Labels from '../../Lables/Hospital/hospitallabels.json';

@Component({
  selector: 'app-home-care-apointments',
  templateUrl: './home-care-apointments.component.html',
  styleUrls: ['./home-care-apointments.component.css'],
})
export class HomeCareApointmentsComponent implements OnInit {
  hospitalid: any;
  startdate: any;
  enddate: any;
  dummlist: any;
  cancelledlist: any;
  TotalAmount: any;
  count: any;
  currentUrl: any;
  bsRangeValue: any;
  languageid: any;
  departmentlist: any;
  search: any;
  loader: boolean | undefined;
  labels: any;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
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
    this.GetHomecareRevenue();
  }

  //To Get DepartmentLIst

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

  public GetHomecareRevenue() {
    this.DoctorService.GetHospitalHomevisitAppointmentDetails(
      this.hospitalid,
      this.startdate,
      this.enddate
    ).subscribe(
      (data) => {
        this.cancelledlist = data;
        // this.cancelledlist = this.dummlist.filter((x: { isVisited: number; }) => x.isVisited == 1);
        // let total1 = 0;
        // this.cancelledlist.forEach((element: { paidAmount: number; }) => {
        //   total1 += element.paidAmount;
        // });
        // this.TotalAmount = total1
        this.count = this.cancelledlist.length;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHomecareRevenue',
          error
        );
      }
    );
  }

  //To Select Date
  selectDate(data: any) {
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);
  }

  public GetTypeID(event: any) {
    if (event.target.value == 'none') {
      this.DoctorService.GetHomecareRevenue(
        this.hospitalid,
        this.startdate,
        this.enddate
      ).subscribe(
        (data) => {
          this.dummlist = data;
          this.cancelledlist = this.dummlist.filter(
            (x: { isVisited: number }) => x.isVisited == 1
          );
          let total1 = 0;
          this.cancelledlist.forEach((element: { paidAmount: number }) => {
            total1 += element.paidAmount;
          });
          this.TotalAmount = total1;
          this.count = this.cancelledlist.length;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetHomecareRevenue',
            error
          );
        }
      );
    } else {
      this.DoctorService.GetHomecareRevenue(
        this.hospitalid,
        this.startdate,
        this.enddate
      ).subscribe(
        (data) => {
          this.dummlist = data;
          this.cancelledlist = this.dummlist.filter(
            (x: { type: any; isVisited: number }) =>
              x.type == event.target.value && x.isVisited == 1
          );
          let total1 = 0;
          this.cancelledlist.forEach((element: { paidAmount: number }) => {
            total1 += element.paidAmount;
          });
          this.TotalAmount = total1;
          this.count = this.cancelledlist.length;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetHomecareRevenue',
            error
          );
        }
      );
    }
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
      this.GetHomecareRevenue();
    }
  }
}
