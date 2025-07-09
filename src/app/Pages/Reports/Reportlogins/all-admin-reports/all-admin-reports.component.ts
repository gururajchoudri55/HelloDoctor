import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/Revenue/revenuelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-admin-reports',
  templateUrl: './all-admin-reports.component.html',
  styleUrls: ['./all-admin-reports.component.css'],
})
export class AllAdminReportsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  p: any;
  search: any;
  languageid: any;
  hospitalid: any;
  AllDetails: any;
  count: any;
  typeid: any;
  labels: any;
  loader: boolean | undefined;
  currentUrl: any;
  reciveddates: any;
  totalAmount: any;
  constructor(
    private CommonService: CommonService,
    private SharedService: SharedService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    debugger;
    this.loader = true;
    this.currentUrl = window.location.href;
    this.hospitalid = sessionStorage.getItem('SubhospitalID');
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

    this.bsRangeValue = [start, end];
    this.CommonService.data$.subscribe((data) => {
      debugger;
      this.reciveddates = data;
      console.log(this.reciveddates);
      this.startdate = this.reciveddates.Startdate;
      this.enddate = this.reciveddates.Enddate;
    });
    this.ActivatedRoute.params.subscribe((params) => {
      this.typeid = params['id'];
      this.GetAllProviderReports();

      // if (this.hospitalid == undefined) {
      //   this.loader = false;
      // }
      // else {
      //   this.GetAllProviderReports();
      // }
    });
    // this.GetAllProviderReports();
  }

  public GetAllProviderReports() {
    debugger;
    this.CommonService.GetAllProvidersRevenueReports(
      0,
      this.startdate,
      this.enddate,
      this.typeid
    ).subscribe(
      (data) => {
        this.loader = false;
        this.AllDetails = data;
        this.count = this.AllDetails.length;
        this.totalAmount = this.AllDetails[0].totalAmount;
        console.log(this.totalAmount, 'Amount');
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAllProvidersRevenueReports',
          error
        );
      }
    );
  }

  //To Select Date
  selectDate(data: any) {
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);
    this.GetAllProviderReports();
  }

  // Pagination

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  //export to excel
  fileName = 'Approved Applicants Reports.xlsx';
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
}
