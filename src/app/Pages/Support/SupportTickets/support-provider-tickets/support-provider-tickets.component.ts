import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/Pages/services/support.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Support/Supportlabels.json';
import * as XLSX from 'xlsx';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-support-provider-tickets',
  templateUrl: './support-provider-tickets.component.html',
  styleUrls: ['./support-provider-tickets.component.css']
})
export class SupportProviderTicketsComponent implements OnInit {
  p: any;

  constructor(private SupportService: SupportService, private SharedService: SharedService) { }
  issuelist: any;
  languageid: any;
  labels: any;
  count: any;
  term: any;
  public startdate: any;
  public enddate: any;

  value: any;
  SDate = new Date();
  EDate = new Date();
  public sdate: any;
  public edate: any;
  public todaydate: any;
  public CurrentTime: any;
  public dummissuelist: any;
  public issuephoto = [];
  public issuephotourl: any = [];
  dropzonelable: any;
  countrymanaerid: any;
  supportid: any;
  showexportbutton: any;

  loader: boolean | undefined;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  photourl: any;
  useremail: any;
  smsmoibilno: any;
  resolveid: any;
  folderName: any;
  bsRangeValue: Date[] | undefined;
  typeid: any;
  currentUrl: any;


  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.supportid = sessionStorage.getItem('supportid');
    if (this.countrymanaerid != undefined || this.supportid != undefined) {
      this.showexportbutton = 1;
    }
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
    this.GetSupportIssues();
  }


  public GetSupportIssues() {
    this.SupportService.GetSupportForWebForSupportLogin(this.languageid, this.startdate, this.enddate).subscribe(res => {
      this.issuelist = res;
      this.dummissuelist = res;
      this.issuelist = this.dummissuelist.filter((x: { resolved: number; }) => x.resolved == 0)
      this.count = this.issuelist.length;
      this.loader = false;
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetSupportForWebForSupportLogin", error);
    })
  }




  public GetImageUrl(photoURL: any) {

    this.photourl = photoURL
  }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  fileName = 'Support Provider Tickets.xlsx';
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







  //Accept



  public UpdateSupportForWebAcceptedbit(id: any) {
    this.showPopup = 0;
    Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.yesAccept
    }).then((result) => {
      if (result.value) {
        this.SupportService.UpdateSupportForWebAcceptedbit(id).subscribe(res => {
          let test = res;
          this.GetSupportIssues();
        })
        this.messageID =
          this.showPopup = 1;
        this.messageID = 47;
        this.typeofPopUp = 1;
      }
      else {
        this.GetSupportIssues();
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "UpdateSupportForWebAcceptedbit", error);
      this.loader = false;
    })
  }




  public id: any;

  public assignMeridiobal(id: any, useremail: any, usermobile: any) {
    this.id = id;
    this.useremail = useremail
    this.smsmoibilno = usermobile
    
    this.smsmoibilno = "212" + this.smsmoibilno
  }




  public GetSupportResolveID(id: any, useremail: any, usermobile: any) {

    this.resolveid = id
    this.useremail = useremail
    this.smsmoibilno = usermobile
    
    this.smsmoibilno = "212" + this.smsmoibilno
    
  }





  files: File[] = [];

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





  comments: any

  public updateassignmerigional() {
    this.loader = true;
    this.showPopup = 0;
    var entity = {
      'ID': this.id,
      'MeridionalPhotoUrl': this.issuephotourl[0],
      'MerdionalComments': this.comments
    }
    this.SupportService.UpdateSupportForWebMeridionalCommetnts(entity).subscribe(data => {
      let res = data;
      this.issuephotourl.length = 0;
      this.showPopup = 1;
      this.messageID = 48;
      this.typeofPopUp = 1;
      this.loader = false;
      this.GetSupportIssues();
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "UpdateSupportForWebMeridionalCommetnts", error);
    })
  }





  public insertdetails() {
    this.typeofPopUp = 0;
    this.loader = true;
    var entity = {
      'ID': this.resolveid,
      'ResolvePhotoUrl': this.issuephotourl[0],
      'ResolveDescription': this.comments
    }
    this.SupportService.UpdateSupportForWebResolvedbit(entity).subscribe(data => {
      let res = data;
      this.issuephotourl.length = 0;
      this.showPopup = 1;
      this.messageID = 49;
      this.typeofPopUp = 1;
      this.issuephotourl = [];
      this.GetSupportIssues();
      this.loader = false

    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "UpdateSupportForWebResolvedbit", error);
    })
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
