import { Component, OnInit } from '@angular/core';
import { MidwifeService } from 'src/app/Pages/services/midwife.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Support/Supportlabels.json';

@Component({
  selector: 'app-support-ticket-details',
  templateUrl: './support-ticket-details.component.html',
  styleUrls: ['./support-ticket-details.component.css']
})
export class SupportTicketDetailsComponent implements OnInit {
  issuephotourl:any=[];
  loader:boolean | undefined;
  folderName:any;
  showPopup:any;
  messageID:any;
  typeofPopUp:any;
  description:any;
  issuename:any;
  midwifeid:any;
  user:any;
  languageid:any;
  labels:any;
  currentUrl:any;

  constructor(private SharedService:SharedService,private MidwifeService:MidwifeService) { }

  ngOnInit(): void {
    this.description = "";
    this.currentUrl=window.location.href;
    this.midwifeid = sessionStorage.getItem('midwifeid');
    this.user = sessionStorage.getItem('user');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

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

  //Upload Attachments

  uploadsAttchments() {
    this.folderName = "Images/SupportPhoto"
    this.MidwifeService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
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
        'Description': this.description,
        'Photo': this.issuephotourl[0],
        'TypeID': 4,
        'DoctorID': 0,
        'NurseID': 0,
        'PhysioID': 0,
        'MidWifeID': this.midwifeid,
        'HospitalID': 0,
        'ReceptionID': 0,
        'UserName': this.user,
        'LanguageID': this.languageid
      }
      this.MidwifeService.InsertSupportForWeb(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup = 1;
          this.messageID = 42;
          this.typeofPopUp = 1;
          location.href = "#/midwife/SupportTickets";
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertSupportForWeb",error);
      })
    }
  }

}
