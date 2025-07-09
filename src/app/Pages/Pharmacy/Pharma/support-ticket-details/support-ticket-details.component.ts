import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/Support/Supportlabels.json';



@Component({
  selector: 'app-support-ticket-details',
  templateUrl: './support-ticket-details.component.html',
  styleUrls: ['./support-ticket-details.component.css']
})
export class SupportTicketDetailsComponent implements OnInit {

  constructor(private PharmacyService:PharmacyService,private SharedService:SharedService) { }
  loader: boolean | undefined;
  showPopup: any;
  attchmentUrl: any;
  folderName: any;
  messageID: any;
  typeofPopUp: any;
  description: any;
  doctorid: any;
  user: any;
  languageid: any;
  issuename: any;
  issuephotourl: any = [];
  startdate:any;
  enddate:any;
  pharmacyid:any;
  bsRangeValue:any;
  labels:any;
  currenturl:any;


  ngOnInit(): void {
   this.currenturl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
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

    this.pharmacyid = sessionStorage.getItem('pharmacyid');
    this.bsRangeValue = [start, end];

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
    this.issuephotourl.splice(this.files.indexOf(event), 1);
  }


  uploadsAttchments() {
    this.folderName = "Images/SupportPhoto"
    this.PharmacyService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.issuephotourl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("supportphoto", this.issuephotourl);
      this.loader = false;
    })
  }





  //Insert Details

  public insertdetails() {
    this.showPopup = 0;
    if (this.issuephotourl == null && this.issuephotourl.length == 0 && this.issuephotourl == undefined) {
      this.showPopup = 1;
      this.messageID = 41;
      this.typeofPopUp = 2;

    }
    else {
      var entity = {
        'Issue': this.issuename,
        'Description': this.description,
        'Photo': this.issuephotourl[0],
        'TypeID': 7,
        'DoctorID':0,
        'NurseID': 0,
        'PhysioID': 0,
        'MidWifeID': 0,
        'HospitalID': 0,
        'ReceptionID': 0,
        'UserName': this.user,
        'LanguageID': this.languageid,
        'PharmacyID': this.pharmacyid,
        'DiagnosticcenterID': 0
      }
      this.PharmacyService.InsertSupportForWeb1(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup = 1;
          this.messageID = 42;
          this.typeofPopUp = 1;
          location.href = "#/Pharmacy/SupportTickets"
        }
      },error=>{
        this.SharedService.insertexceptions(this.currenturl,"InsertSupportForWeb1",error);
      })
    }
  }

}
