import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/Pages/services/support.service';
import Labels from '../../../Lables/Support/Supportlabels.json';
import * as XLSX from 'xlsx';
import { SharedService } from 'src/app/Pages/services/shared.service';



@Component({
  selector: 'app-support-resolved-tickets-providers',
  templateUrl: './support-resolved-tickets-providers.component.html',
  styleUrls: ['./support-resolved-tickets-providers.component.css']
})
export class SupportResolvedTicketsProvidersComponent implements OnInit {

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
  issuelist: any;
  dummissuelist: any;
  resolvephotourl: any;
  typeid: any;
  labels: any;
  p: any;
  currentUrl: any;


  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.loader = true;
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
    this.GetSupportIssues()
  }

  //export to excel
  fileName = 'Support Resolved Reports.xlsx';
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





  public GetSupportIssues() {
    this.SupportService.GetSupportForWebForSupportLogin(this.languageid, this.startdate, this.enddate).subscribe(res => {
      this.issuelist = res;
      this.dummissuelist = res.filter((x: { resolved: number; }) => x.resolved == 1)
      this.loader = false;
      this.issuelist = this.dummissuelist.filter((x: { resolved: number; }) => x.resolved == 1)
      this.count = this.issuelist.length;
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetSupportForWebForSupportLogin", error);
    })
  }



  public GetImageUrl(photoURL: any) {

    this.photourl = photoURL
  }




  public GetResolvePhotoUrl(resolveDescription: any) {
    this.resolvephotourl = resolveDescription
  }



  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.SupportService.GetDates(data[0]);
    this.enddate = this.SupportService.GetDates(data[1]);
    this.GetSupportIssues()

  }


  public GetTypeID(even: any) {
    this.loader = true;
    this.typeid = even.target.value;
    if (even.target.value != 0) {
      this.issuelist = this.dummissuelist.filter((x: { typeID: any; resolved: number; }) => x.typeID == this.typeid && x.resolved == 0)
      this.count = this.issuelist.length;
      this.loader = false;
    }
    else {
      this.GetSupportIssues()
    }
  }
}
