import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../../Pages/Lables/Support/Supportlabels.json';

@Component({
  selector: 'app-doctor-support',
  templateUrl: './doctor-support.component.html',
  styleUrls: ['./doctor-support.component.css']
})
export class DoctorSupportComponent implements OnInit {
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
  labels:any;
  currentUrl:any;
  
  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.description = ""
    this.doctorid = sessionStorage.getItem('userid');
    this.user = sessionStorage.getItem('user');
    

    this.loader = false;
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
    this.DoctorService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
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
        'TypeID': 1,
        'DoctorID': this.doctorid,
        'NurseID': 0,
        'PhysioID': 0,
        'MidWifeID': 0,
        'HospitalID': 0,
        'ReceptionID': 0,
        'UserName': this.user,
        'LanguageID': this.languageid
      }
      this.DoctorService.InsertSupportForWeb(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup = 1;
          this.messageID = 42;
          this.typeofPopUp = 1;
          location.href = "#/Doctor/DoctorSupportDash"
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertSupportForWeb",error);
      })
    }
  }



}
