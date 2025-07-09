import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/Pages/services/support.service';
import Labels from '../../../Lables/Support/Supportlabels.json';
import * as XLSX from 'xlsx';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-support-escalated-tickets',
  templateUrl: './support-escalated-tickets.component.html',
  styleUrls: ['./support-escalated-tickets.component.css']
})
export class SupportEscalatedTicketsComponent implements OnInit {
  p: any;

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
  dummlist: any;
  count: any;
  supportid: any;
  resolvephotourl: any;
  photourl: any;
  loader: boolean | undefined;
  typeid: any;
  issuelist: any;
  dummissuelist: any;
  term: any;

  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  resolveid: any;
  useremail: any;
  smsmobileno: any;
  files: File[] = [];
  public issuephotourl: any = [];
  folderName: any;
  comments: any;
  labels: any;
  currentUrl: any;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.supportid = sessionStorage.getItem('supportid');
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
    this.getsupport();
  }


  public getsupport() {
    this.SupportService.GetSupport(this.startdate, this.enddate).subscribe(
      data => {
        this.loader = false;
        this.supportlist = data.filter(x => x.meridionalBit == 1);
        this.dummlist = this.supportlist
        this.count = this.supportlist.length;
        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetSupport", error);
        this.loader = false;
      }
    )
  }



  public GetImageUrl(photoURL: any) {

    this.photourl = photoURL
  }




  public GetResolvePhotoUrl(resolveDescription: any) {
    this.resolvephotourl = resolveDescription
  }



  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.SupportService.GetDates(data[0]);
    this.enddate = this.SupportService.GetDates(data[1]);
    this.getsupport()

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
      this.getsupport()
    }
  }

  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  fileName = 'Support Escalated Tickets.xlsx';
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










  public GetImage(photo: any) {
    this.photourl = photo;
  }

  public GetSupportResolveID(id: any, email: any, smsmoibileno: any, typeid: any) {
    this.resolveid = id;
    this.useremail = email;
    this.smsmobileno = smsmoibileno;
    this.typeid = typeid;
  }




  onSelect(event: any) {
    this.loader = true;
    this.showPopup = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.issuephotourl.splice(this.issuephotourl.indexOf(event), 1);
  }


  uploadsAttchments() {
    this.folderName = "Images/SupportPhoto"
    this.SupportService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.issuephotourl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      this.loader = false;
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "AllFilesUploads", error);
      this.loader = false;
    })
  }



  public insertdetails() {
    this.showPopup = 0;
    var entity = {
      'ID': this.resolveid,
      'Comments': this.comments,
      'IssuePhotoUrl': this.issuephotourl[0],
      'TypeID': this.typeid
    }
    this.SupportService.UpdateSupport(entity).subscribe(data => {
      let res = data;
      this.issuephotourl.length = 0;
      this.showPopup = 1;
      this.messageID = 49;
      this.typeofPopUp = 1;
      this.issuephotourl = [];
      this.loader = false;
      this.getsupport()
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "UpdateSupport", error);
    })
  }
}
