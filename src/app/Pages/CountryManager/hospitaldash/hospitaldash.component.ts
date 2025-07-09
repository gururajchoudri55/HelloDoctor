import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Labels from '../../Lables/countrymanager/countrylabels.json';
import { SharedService } from '../../services/shared.service';
import { Subject } from 'rxjs'


@Component({
  selector: 'app-hospitaldash',
  templateUrl: './hospitaldash.component.html',
  styleUrls: ['./hospitaldash.component.css']
})
export class HospitaldashComponent implements OnInit {
  unsubscribe: Subject<void> = new Subject();
  constructor(private CommonService: CommonService, private SharedService: SharedService) { }
  languageid: any;
  meridionalid: any;
  dummlist1: any;
  hospitalClinicList: any;
  count: any;
  term: any;
  loader: boolean | undefined
  p: number | undefined;
  res: any;
  labels: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  currentUrl: any;

  showdelete: any;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.meridionalid = sessionStorage.getItem('meridionalid');
    if (this.meridionalid == undefined) {
      this.showdelete = 0;
    }
    else {
      this.showdelete = 1;
    }

    this.gethosptilclinicforadmin()


 
  }


  fileName = 'Hospital List.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }



  public gethosptilclinicforadmin() {

    this.CommonService.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.dummlist1 = data.filter(x => x.hospital_ClinicID == 1)
        this.hospitalClinicList = this.dummlist1.filter((x: { id: number; }) => x.id != 590 && x.id != 614 && x.id != 613 && x.id != 612)
        this.count = this.hospitalClinicList.length;

      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetHospital_ClinicForAdminByAdmin", error);
      }
    )
  }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  //Delete Hospital
  public deletehospitalclinic(id: any) {
    this.showPopup = 0;
    
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
        this.CommonService.DeleteHospital_Clinic(id).subscribe(res => {
          let test = res;
          this.ngOnInit();
        })
        this.showPopup = 1;
        this.messageID = 75;
        this.typeofPopUp = 1;
      }
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "DeleteHospital_Clinic", error);
    })


  }

  getimage(photo: any) {
    location.href = "#/Shared/view/" + btoa(photo)
  }



  edit(id: any) {
    location.href = "#/countrymanager/EditHospital/" + btoa(id);
  }


  photoslist: any;
  hospitalclinicid: any;

  public GetHospital_ClinicPhotosByHospitalclinicID(id: number) {
    this.hospitalclinicid = id;
    this.showadPhotos = 0;
    this.hospitalPhotoUrl.length = 0;
    this.files.length = 0;
    this.CommonService.GetHospital_ClinicPhotosByHospitalclinicID(id).subscribe(
      (data) => {
        this.photoslist = data;
        console.log(this.photoslist)
      },
      (error) => { }
    );
  }


  files: File[] = [];
  hospitalPhotoUrl: any = []

  onSelect(event: any) {
    this.loader = true;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadHospitalPhotos()
  }

  public uploadHospitalPhotos() {
    this.showPopup = 0;
    this.CommonService.HospitalClinicPhotos(this.files).subscribe(res => {
      
      this.hospitalPhotoUrl.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("hospitalPhoto", this.hospitalPhotoUrl);
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "HospitalClinicPhotos", error);
    })
    // this.sendattachment();
  }



  onRemove(event: any) {
    console.log(event);
    this.hospitalPhotoUrl.splice(this.files.indexOf(event), 1);
    this.files.splice(this.files.indexOf(event), 1);
    console.log("hospitalPhoto", this.hospitalPhotoUrl);
  }




  public insertPhotos() {
    for (let i = 0; i < this.hospitalPhotoUrl.length; i++) {
      var entity = {
        'Hospital_ClinicID': this.hospitalclinicid,
        'PhotoURL': this.hospitalPhotoUrl[i]
      }
      this.CommonService.InsertHospital_ClinicPhotos(entity).subscribe(data => {

        this.messageID = 1;
        this.typeofPopUp = 1;
        this.showPopup = 1;
        this.gethosptilclinicforadmin()
      })
    }
  }

  showadPhotos: number | undefined;

  showAdd() {
    this.showadPhotos = 1;
    this.updatePhotoId = 0;
  }


  updatePhotoId: number = 0;


  EditPhoto(id: any) {
    this.updatePhotoId = id;
    this.showadPhotos = 0;
  }






  public updatephoto() {
    this.showPopup = 0;
    
    var entity = {
      'ID': this.updatePhotoId,
      'PhotoURL': this.hospitalPhotoUrl[0]
    }
    this.CommonService.UpdateHospital_ClinicPhotos(entity).subscribe(res => {
      let test = res;
      
      this.messageID = 1;
      this.typeofPopUp = 1;
      this.showPopup = 1;
      this.showadPhotos = 0;
      this.updatePhotoId = 0;

      this.GetHospital_ClinicPhotosByHospitalclinicID(this.hospitalclinicid)

    })
  }
}
