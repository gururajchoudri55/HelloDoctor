import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.css']
})
export class MyFilesComponent implements OnInit {

  constructor(private DoctorService: DoctorService, private activatedroute: ActivatedRoute, private SharedService: SharedService) { }

  languageid: any;
  id: any;
  term: any;
  doctorid: any;
  labels: any;
  foldername: any;
  atachmentlist: any;
  attachmentsurl: any = [];
  filename: any;
  subfoldername: any;
  loader: boolean | undefined;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  currentUrl: any;
  p: number | undefined;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorid = sessionStorage.getItem('userid');
    this.activatedroute.params.subscribe(params => {
      
      this.id = params['id'];
      this.foldername = params['Foldername'];
      this.GetAttachments();
    }
    )
  }



  GetAttachments() {
    this.DoctorService.GetFolders_Attchments(this.id, this.languageid).subscribe(data => {
      this.atachmentlist = data;
      this.loader = false;
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "GetFolders_Attchments", error);
    })
  }






  InsertDetails() {
    this.loader = true;
    this.showPopup = 0;
    
    if (this.attachmentsurl.length == 0 || this.attachmentsurl == []) {
      this.showPopup = 1;
      this.messageID = 41;
      this.typeofPopUp = 2;
      this.loader = false;
    }
    else {
      
      var entity = {
        'FolderID': this.id,
        'SubFolderName': '',
        'AttachmentUrl': this.attachmentsurl[0],
        'FileName': this.filename
      }
      this.DoctorService.InsertFolders_Attchments(entity).subscribe(data => {
        if (data != 0) {

          this.showPopup = 1;
          this.typeofPopUp = 1;
          this.messageID = 1;
          this.attachmentsurl.length = 0;
          this.GetAttachments();
          this.loader = false;

        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertFolders_Attchments", error);
        this.loader = false;
      })
    }
  }


  openwindow(documents: any) {
    location.href = "#/Shared/view/" + btoa(documents)
    // window.open(documents, '_blank');
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
    let folder = this.doctorid + '/' + this.foldername
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



  CreateSubfolder() {
    
    this.loader = true;
    this.showPopup = 0;
    var entity = {
      'FolderID': this.id,
      'SubFolderName': this.subfoldername,
      'AttachmentUrl': 0,
      'FileName': ''
    }
    this.DoctorService.InsertFolders_Attchments(entity).subscribe(data => {
      if (data != 0) {
        
        this.showPopup = 1;
        this.typeofPopUp = 1;
        this.messageID = 1;
        this.attachmentsurl.length = 0;
        this.GetAttachments();
        this.loader = false;
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertFolders_Attchments", error);
      this.loader = false;
    })
  }


  // Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


}
