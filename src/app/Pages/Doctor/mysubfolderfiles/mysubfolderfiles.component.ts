import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json'


@Component({
  selector: 'app-mysubfolderfiles',
  templateUrl: './mysubfolderfiles.component.html',
  styleUrls: ['./mysubfolderfiles.component.css']
})
export class MysubfolderfilesComponent implements OnInit {
  p: any;

  constructor(private DoctorService: DoctorService, private activatedroute: ActivatedRoute, private SharedService: SharedService) { }
  languageid: any;
  dropzonelable: any;
  folderid: any;
  term: any;
  subfolderid: any;
  doctorid: any;
  foldername: any;
  subfoldername: any;
  filename: any;
  attachmentsurl: any = [];
  loader: boolean | undefined;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  atachmentlist: any;
  currentUrl: any;
  subfoldessrid: any;
  subfolderssname: any;
  labels: any;


  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorid = sessionStorage.getItem('userid');
    this.activatedroute.params.subscribe(params => {

      this.folderid = params['folderid'];
      this.subfolderid = params['subfolderid'];
      this.subfoldessrid = params['SubfoldersID'];
      this.foldername = params['Foldername'];
      this.subfoldername = params['SubFolderName'];
      this.subfolderssname = params['SubFoldersName'];
      this.GetAttachments();
    }
    )

  }


  GetAttachments() {
    this.DoctorService.GetSub_Folders_Attachemnts(this.subfoldessrid, this.languageid).subscribe(data => {
      this.atachmentlist = data;
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "GetSub_Folders_Attachemnts", error);
    })
  }



  files1: File[] = [];
  doctorPhotoUrl: any = [];
  onSelect(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    
    this.files1.push(...event.addedFiles);
    this.uploadattachments()
  }

  public uploadattachments() {
    this.showPopup = 0;
    let folder = this.doctorid + '/' + this.foldername + '/' + this.subfoldername + '/' + this.subfolderssname
    this.DoctorService.DoctorsPersonalUploads(this.files1, folder).subscribe(res => {
      this.attachmentsurl.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "DoctorsPersonalUploads", error);
      this.loader = false;
    })
    // this.sendattachment();
  }


  onRemove(event: any) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }







  InsertDetails() {
    this.showPopup = 0;
    this.loader = true;
    
    if (this.attachmentsurl.length == 0 || this.attachmentsurl == []) {
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    }
    else {
      
      var entity = {
        'FolderID': this.folderid,
        'SubfolderID': this.subfolderid,
        'SubFolders_ID': this.subfoldessrid,
        'FileName': this.filename,
        'AttachmentUrl': this.attachmentsurl[0]
      }
      this.DoctorService.InsertSub_Folders_Attachemnts(entity).subscribe(data => {
        if (data != 0) {

          this.loader = false;
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          this.attachmentsurl.length = 0;
          this.GetAttachments();

        }
      })
    }
  }


  openwindow(documents: any) {
    location.href = "#/Shared/view/" + btoa(documents);

  }

  subfold: any;
  // Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  routeBack() {
    location.href = "#/Doctor/SubFolderFiles/" + this.folderid + '/' + this.subfolderid + '/' + this.foldername + '/' + this.subfoldername

  }
}
