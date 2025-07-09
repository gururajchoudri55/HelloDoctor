import { Component, HostListener, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';


@Component({
  selector: 'app-clinicsdash',
  templateUrl: './clinicsdash.component.html',
  styleUrls: ['./clinicsdash.component.css']
})
export class ClinicsdashComponent implements OnInit {
  languageid: any;
  meridionalid: any;
  dummlist1: any;
  hospitalClinicList: any;
  count: any;
  term: any;
  loader:boolean | undefined;
  p:number | undefined;
  labels:any;
  currentUrl:any;
  showdelete:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;

  constructor(private CommonService: CommonService,private  SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.meridionalid = sessionStorage.getItem('meridionalid');
    this.gethosptilclinicforadmin();
    if (this.meridionalid == undefined) {
      this.showdelete = 0;
    }
    else {
      this.showdelete = 1;
    }

  }


  fileName = 'Clinic List.xlsx';
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

  //Get HospitalList

  public gethosptilclinicforadmin() {
    this.CommonService.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.dummlist1 = data.filter(x => x.hospital_ClinicID == 2)
        this.hospitalClinicList = this.dummlist1.filter((x: { id: number; }) => x.id != 590 && x.id != 614 && x.id != 613 && x.id != 612)
        this.count = this.hospitalClinicList.length;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetHospital_ClinicForAdminByAdmin",error);
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
          
          Swal.fire({
            title:this.labels.title,
            text: this.labels.text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.labels.confirmButtonText,
            cancelButtonText:this.labels.cancelButtonText
          }).then((result) => {
            if (result.isConfirmed) {
              this.CommonService.DeleteHospital_Clinic(id).subscribe(res => {
                let test = res;
                this.ngOnInit();
              },error=>{
                this.loader=false;
                this.SharedService.insertexceptions(this.currentUrl,"DeleteHospital_Clinic",error);
              })
               
            }
          })
      
      
        }

        edit(id: any) {
          location.href = "#/countrymanager/EditHospital/" + btoa(id);
        }


        photoslist: any;
        hospitalclinicid: any;
      
        public GetHospital_ClinicPhotosByHospitalclinicID(id: number) {
          this.hospitalclinicid = id;
          this.showadPhotos = 0;
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
          this.showPopup = 0;
          for (let i = 0; i < this.hospitalPhotoUrl.length; i++) {
            var entity = {
              'Hospital_ClinicID': this.hospitalclinicid,
              'PhotoURL': this.hospitalPhotoUrl[i]
            }
            this.CommonService.InsertHospital_ClinicPhotos(entity).subscribe(data => {
          
         
              this.gethosptilclinicforadmin()
            })
          }
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
        }
      
        showadPhotos: number | undefined;
      
        showAdd() {
          this.showadPhotos = 1;
        }
      
    
}
