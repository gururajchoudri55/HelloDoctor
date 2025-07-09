import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import Labels from '../../../Lables/Support/Supportlabels.json';

@Component({
  selector: 'app-support-ticket-details',
  templateUrl: './support-ticket-details.component.html',
  styleUrls: ['./support-ticket-details.component.css']
})
export class SupportTicketDetailsComponent implements OnInit {
  description:any;
  languageid:any;
  diagnosticid:any;
  user:any;
  loader:boolean | undefined;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  folderName:any;
  issuephotourl:any=[];
  issuename:any;
  removetgdescription:any;
  midwifeid:any;
  labels:any;
  currentUrl:any;


  constructor(private DiagnosticService:DiagnosticService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.description = ""
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
    this.user = sessionStorage.getItem('user');

  }


  
  files: File[] = [];
  onSelect(event: any) {
    this.loader = true;
    this.showPopup = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
    this.loader = false;
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.issuephotourl.splice(this.files.indexOf(event), 1);
  }

  //Upload Attachments

  uploadsAttchments() {
    this.folderName = "Images/SupportPhoto"
    this.DiagnosticService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.issuephotourl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("supportphoto", this.issuephotourl);
      this.loader = false;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"AllFilesUploads",error);
    })
  }



//to insert details
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
        'Description': this.removetgdescription,
        'Photo': this.issuephotourl[0],
        'TypeID': 8,
        'DoctorID': 0,
        'NurseID': 0,
        'PhysioID': 0,
        'MidWifeID': this.midwifeid,
        'HospitalID': 0,
        'ReceptionID': 0,
        'UserName': this.user,
        'LanguageID': this.languageid,
        'PharmacyID': 0,
        'DiagnosticcenterID': this.diagnosticid
      }
      this.DiagnosticService.InsertSupportForWeb1(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup = 1;
          this.messageID = 42;
          this.typeofPopUp = 1;
          location.href = "#/Diagnostic/DiagnosticSupportTickets";
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertSupportForWeb1",error);
      })
    }
  }

}
