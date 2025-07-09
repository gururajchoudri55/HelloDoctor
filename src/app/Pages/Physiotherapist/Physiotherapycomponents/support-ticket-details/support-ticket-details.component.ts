import { Component, OnInit } from '@angular/core';
import { PhysioService } from 'src/app/Pages/services/physio.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Support/Supportlabels.json';

@Component({
  selector: 'app-support-ticket-details',
  templateUrl: './support-ticket-details.component.html',
  styleUrls: ['./support-ticket-details.component.css']
})
export class SupportTicketDetailsComponent implements OnInit {
  description:any;
  physioid:any;
  user:any;
  languageid:any;
  insertnotification:any;
  issuename:any;
  issuephotourl:any=[];
  showPopup:any;
  messageID:any;
  typeofPopUp:any;
  removetgdescription:any;
  loader:boolean | undefined;
  folderName:any;
  labels:any;
  currentUrl:any;


  constructor(private PhysioService:PhysioService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.description = "";
    this.currentUrl=window.location.href;
    this.physioid = sessionStorage.getItem('physioid');
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


  uploadsAttchments() {
    this.folderName = "Images/SupportPhoto"
    this.PhysioService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.issuephotourl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("supportphoto", this.issuephotourl);
      this.loader = false;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"AllFilesUploads",error);
      this.loader=false;
    })
  }


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
        'TypeID': 3,
        'DoctorID': 0,
        'NurseID': 0,
        'PhysioID': this.physioid,
        'MidWifeID': 0,
        'HospitalID': 0,
        'ReceptionID': 0,
        'UserName': this.user,
        'LanguageID': this.languageid
      }
      this.PhysioService.InsertSupportForWeb(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup = 1;
          this.messageID = 42;
          this.typeofPopUp = 1;
          location.href = "#/Physiotherapist/SupportTickets";
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertSupportForWeb",error);
        this.loader=false;
      })
    }
  }







}
