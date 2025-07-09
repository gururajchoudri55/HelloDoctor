import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/Pages/services/support.service';
import Labels from '../../../Lables/Support/Supportlabels.json';
import * as XLSX from 'xlsx';
import { SharedService } from 'src/app/Pages/services/shared.service';


@Component({
  selector: 'app-support-problem-resolve-petient',
  templateUrl: './support-problem-resolve-petient.component.html',
  styleUrls: ['./support-problem-resolve-petient.component.css']
})
export class SupportProblemResolvePetientComponent implements OnInit {

  constructor(private SupportService: SupportService, private SharedService: SharedService) { }
  SDate = new Date();
  EDate = new Date();
  public sdate: any;
  public edate: any;
  startdate: any;
  enddate: any;
  bsRangeValue: Date[] | undefined;
  languageid: any;
  supportlist: any;
  count: any;
  loader: boolean | undefined;
  photourl: any;
  term: any;
  labels: any;
  currentUrl: any;
  p: any;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth() - 6, 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var start = new Date(date.getFullYear(), date.getMonth() - 6, 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.bsRangeValue = [start, end];
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);
    this.getsupport()
  }


  public getsupport() {
    this.SupportService.GetSupport(this.startdate, this.enddate).subscribe(
      data => {
        this.supportlist = data.filter(x => x.resolve == 1);
        this.count = this.supportlist.length;
        this.loader = false;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetSupport", error);
      }
    )
  }

  public GetImageUrl(photoURL: any) {
    
    this.photourl = photoURL
  }

  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.SupportService.GetDates(data[0]);
    this.enddate = this.SupportService.GetDates(data[1]);
    this.getsupport()

  }
  public GetResolvePhotoUrl(resolveDescription: any) {
    this.photourl = resolveDescription
  }


  fileName = 'SupportProblem.xlsx';
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

  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }



}


