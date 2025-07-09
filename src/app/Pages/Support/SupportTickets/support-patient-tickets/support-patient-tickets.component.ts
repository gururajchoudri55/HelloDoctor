import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/Pages/services/support.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Support/Supportlabels.json';
import * as XLSX from 'xlsx';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-support-patient-tickets',
  templateUrl: './support-patient-tickets.component.html',
  styleUrls: ['./support-patient-tickets.component.css']
})
export class SupportPatientTicketsComponent implements OnInit {


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
  supportid: any;
  countrymanaerid: any;
  filterSupportList: any;
  dummlist: any;
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
  p: any;
  issueTypeID: any;
  dummSuportlist: any;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.supportid = sessionStorage.getItem('supportid');
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
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
    this.getSupportType();
  }

  public GetImage(photo: any) {
    this.photourl = photo;
  }


  getSupportType() {
    this.SupportService.GetSupportIssueTypeWeb(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.filterSupportList = data;
        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetSupportIssueTypeWeb", error);
        this.loader = false;
      }
    )

  }





  getIssueTypeID(even: any) {
    this.issueTypeID = even.target.value;
    if (even.target.value != 0) {
      this.supportlist = this.dummSuportlist.filter((x: { issueTypeID: any; }) => x.issueTypeID == this.issueTypeID)
    }
    else {
      this.getsupport()
    }

  }

  public getsupport() {
    this.SupportService.GetSupport(this.startdate, this.enddate).subscribe(
      data => {
        this.loader = false;
        this.supportlist = data.filter(x => x.resolve == 0);
        this.dummSuportlist = data.filter(x => x.resolve == 0);
        this.dummlist = this.supportlist
        this.count = this.supportlist.length
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetSupport", error);
      }
    )
  }



  public GetResolvedStatus(even: any) {
    if (even.target.value == '1') {
      let dfsfd = this.dummlist.filter((x: { resolve: number; }) => x.resolve == 1);
      this.supportlist = dfsfd;
      this.count = this.supportlist.length

    }
    if (even.target.value == '2') {
      let dfsfd = this.dummlist.filter((x: { resolve: number; }) => x.resolve == 0);
      this.supportlist = dfsfd;
      this.count = this.supportlist.length

    }
    if (even.target.value == '0') {

      this.getsupport();
    }
  }




  public GetAcceptSupport(id: any) {
    this.showPopup = 0;
    Swal.fire({
      title: this.labels.title,
      text: this.labels.text1,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.yesAccept
    }).then((result) => {
      if (result.value) {
        this.SupportService.GetSupportResolvedBit(id).subscribe(res => {
          let test = res;
          this.getsupport();
        })
        this.messageID =
          this.showPopup = 1;
        this.messageID = 47;
        this.typeofPopUp = 1;
      }
      else {
        this.getsupport();
      }
    })
  }


  public GetSupportResolveID(id: any, email: any, smsmoibileno: any, typeid: any) {
    this.resolveid = id;
    this.useremail = email;
    this.smsmobileno = smsmoibileno;
    this.typeid = typeid;
  }

  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.SupportService.GetDates(data[0]);
    this.enddate = this.SupportService.GetDates(data[1]);
    this.getsupport()

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
    })
  }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }




  fileName = 'Support Petient Tickets.xlsx';
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

  public insertdetails() {
    this.loader = true;
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
      this.loader = false;
      this.getsupport()
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "UpdateSupport", error);
    })
  }




}
