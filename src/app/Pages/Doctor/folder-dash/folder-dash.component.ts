import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { SharedService } from '../../services/shared.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-folder-dash',
  templateUrl: './folder-dash.component.html',
  styleUrls: ['./folder-dash.component.css']
})
export class FolderDashComponent implements OnInit {
  p: any;
  loader: boolean | undefined;
  doctorid: any;
  languageid: any;
  folderList: any;
  currentUrl: any;
  count: any;
  search: any
  labels: any;
  recpid: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;

  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }

  ngOnInit(): void {
    ;
    this.loader = true;
  
    
 
    this.recpid = sessionStorage.getItem('recpid');

    this.currentUrl = window.location.href;
    this.doctorid = sessionStorage.getItem('userid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetDoctors_PersonalFolder();

  }


  //Get Doctor List
  GetDoctors_PersonalFolder() {

    // const promise = fetch("https://madagascar.voiladoc-eastafrica.com/MadagascarWebAPI/LanguageMaster/GetLanguageMaste");
    // promise.then(data=>{
     
    //   let data1= data.json()
   
    // })


    // console.log("promise", promise);

    if (this.recpid != undefined || this.recpid != null) {
      this.DoctorService.GetDoctors_PersonalFolder(this.doctorid, this.languageid).subscribe(data => {
        this.loader = false;
        this.folderList = data.filter(x => x.receptionistId == this.recpid);
        this.count = this.folderList.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDoctors_PersonalFolder", error);
      })
    }
    else {
      this.DoctorService.GetDoctors_PersonalFolder(this.doctorid, this.languageid).subscribe(data => {
        this.loader = false;
        this.folderList = data;
        this.count = this.folderList.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDoctors_PersonalFolder", error);
      })
    }
  }

  // Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  gotoSubfolder(id: any, folderName: any) {
    
    location.href = "#/Doctor/MyFiles/" + id + '/' + folderName
  }







  //delete doctor
  public deleteFolder(id: any) {
    
    Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText: this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.DoctorService.DeleteDoctors_PersonalFolder(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
        this.showPopup = 1;
        this.messageID = 75,
          this.typeofPopUp = 1;
      }
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "DeleteDoctorRegistration", error);
    })
  }
}
