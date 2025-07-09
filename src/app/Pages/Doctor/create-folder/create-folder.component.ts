import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent implements OnInit {

  constructor(private DoctorService: DoctorService, private SharedService: SharedService, private activatedroute: ActivatedRoute) { }
  folderName: any;
  doctorid: any;
  languageid: any;
  labels: any;
  loader: boolean | undefined;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  currentUrl: any;
  recpid: any;
  id: any;
  showEdit: any;
  ngOnInit(): void {
    
    this.recpid = sessionStorage.getItem('recpid');
    this.folderName = sessionStorage.getItem('patientName')
    this.currentUrl = window.location.href;
    this.doctorid = sessionStorage.getItem('userid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];


    this.activatedroute.params.subscribe((params) => {
      this.id = params["id"];
      if (this.id == undefined) {
        this.showEdit = 0;
      }
      else {
        this.showEdit = 1;
        this.GetDoctors_PersonalFolder()
      }
    });
  }



  GetDoctors_PersonalFolder() {
    this.DoctorService.GetDoctors_PersonalFolder(this.doctorid, this.languageid).subscribe(data => {
      var list = data.filter(x => x.id == this.id)
      this.folderName = list[0].folderName
    }, error => {

    })
  }

  InsertDetails() {
    this.loader = true;
    this.showPopup = 0;
    var entity = {
      'DoctorID': this.doctorid,
      'FolderName': this.folderName,
      'ReceptionistId': this.recpid == undefined || null ? '0' : this.recpid,
      'patientID': 0
    }
    this.DoctorService.InsertDoctors_PersonalFolder(entity).subscribe(data => {
      if (data != 0) {
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1
        this.loader = false;
        location.href = "#/Doctor/FolderDash"
      }
      else {
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2
        this.loader = false;
        location.href = "#/Doctor/FolderDash"
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertDoctors_PersonalFolder", error);
      this.loader = false;
    })
  }


  UpdateDoctors_PersonalFolder() {
    this.showPopup = 0;
    var entity = {
      'ID': this.id,
      'FolderName': this.folderName
    }
    this.DoctorService.UpdateDoctors_PersonalFolder(entity).subscribe(data => {

      this.messageID = 34;
      this.showPopup = 1;
      this.typeofPopUp = 1;
      location.href = "#/Doctor/FolderDash"


    })
  }
}
