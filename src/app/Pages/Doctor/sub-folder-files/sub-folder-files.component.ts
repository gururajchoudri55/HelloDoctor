import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';

@Component({
  selector: 'app-sub-folder-files',
  templateUrl: './sub-folder-files.component.html',
  styleUrls: ['./sub-folder-files.component.css']
})
export class SubFolderFilesComponent implements OnInit {
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
  labels:any;
  

  ngOnInit(): void {
    this.loader = true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorid = sessionStorage.getItem('userid');
    this.currentUrl = window.location.href;

    this.activatedroute.params.subscribe(params => {

      this.folderid = params['folderid'];
      this.subfolderid = params['subfolderid'];
      this.foldername = params['Foldername'];
      this.subfoldername = params['SubFolderName'];
      this.GetAttachments();
    }
    )
  }
  GetAttachments() {
    this.DoctorService.GetSubFolder_Attachments(this.subfolderid, this.languageid).subscribe(data => {
      this.atachmentlist = data;
      this.loader = false;
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "GetSubFolder_Attachments", error);
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
    let folder = this.doctorid + '/' + this.foldername + '/' + this.subfoldername
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
    if (this.attachmentsurl.length == 0 || this.attachmentsurl == []) {
      this.showPopup = 1;
      this.messageID = 41;
      this.typeofPopUp = 2;
    }
    else {
      
      this.loader = true;
      var entity = {
        'FolderID': this.folderid,
        'SubfolderID': this.subfolderid,
        'FileName': this.filename,
        'AttachmentUrl': this.attachmentsurl[0],
        'SubFolderName': ''
      }
      this.DoctorService.InsertSubFolder_Attachments(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup = 1;
          this.typeofPopUp = 1;
          this.messageID = 1;
          this.attachmentsurl.length = 0;
          this.GetAttachments();
          this.loader = false;

        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertSubFolder_Attachments", error);
        this.loader = false;
      })
    }
  }


  openwindow(documents: any) {
    location.href = "#/Shared/view/" + btoa(documents)

  }

  subfold: any;


  CreateSubfolder() {
    
    this.loader = true;
    var entity = {
      'FolderID': this.folderid,
      'SubfolderID': this.subfolderid,
      'FileName': '',
      'AttachmentUrl': 0,
      'SubFolderName': this.subfold
    }
    this.DoctorService.InsertSubFolder_Attachments(entity).subscribe(data => {
      if (data != 0) {

        this.showPopup = 1;
        this.typeofPopUp = 1;
        this.messageID = 1;
        this.attachmentsurl.length = 0;
        this.files1.length = 0;
        this.GetAttachments();
        this.subfoldername = "";
        this.loader = false;
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertSubFolder_Attachments", error);
      this.loader = false;
    })
  }

  // Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }
  routeBack(){
    location.href = "#/Doctor/MyFiles/" + this.folderid + '/' + this.foldername
  }


  
}
