import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Labels from '../../Lables/countrymanager/countrylabels.json';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {

  languageID: any;
  hospitalClinicID: any;
  countryManagerID: any;
  salesReoresentativeID: any;
  meridionalID: any;
  paharmcyList: any;
  count: any;
  term: any;
  p: number | undefined;
  loader: boolean | undefined;
  labels: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  currentUrl: any;
  meridionalid: any;
  showdelete: any;

  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.countryManagerID = sessionStorage.getItem('countrymanagerid');
    this.salesReoresentativeID = sessionStorage.getItem('salesrepresntativeid');
    this.meridionalID = sessionStorage.getItem('meridionalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.meridionalid = sessionStorage.getItem('meridionalid');
    if (this.meridionalid == undefined) {
      this.showdelete = 0;
    }
    else {
      this.showdelete = 1;
    }
    this.getPharmacyForAdmin();
  }

  //export to excel
  fileName = 'Pharmacy List.xlsx';
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



  // PharmacyGet

  getPharmacyForAdmin() {

    this.CommonService.GetPharmacyForAdminByLanguageID(this.languageID).subscribe(
      data => {
        this.loader = false;
        this.paharmcyList = data;
        this.count = this.paharmcyList.length;
        console.log(this.paharmcyList);
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetPharmacyForAdminByLanguageID", error);
      }
    )
  }

  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //Delete Pharmacy
  public deletepharmacy(id: any) {
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
        this.CommonService.DeletePharmacy(id).subscribe(res => {
          let test = res;
          this.ngOnInit();
        })
        this.showPopup = 1;
        this.messageID = 75;
        this.typeofPopUp = 1;
      }
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "DeletePharmacy", error);
    })


  }





  edit(id: any) {
    location.href = "#/countrymanager/EditPharmacy/" + btoa(id)
  }





  //Pharmacy Photo

  files: File[] = [];

  onSelect(event: any) {
    this.loader = true;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadattachments()
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.attachmentUrl.splice(this.files.indexOf(event), 1);

  }
  public uploadattachments() {
    this.CommonService.pharmacyphoto(this.files).subscribe((res: any) => {
      this.loader = false;
      this.attachmentUrl.push(res);
    }, error => {
      console.log("Error with pharmacyphoto", error);
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "pharmacyphoto", error);
    })
  }




  photos: any;
  pharmacyID: any;
  public GetPhotos(id: any) {
    this.pharmacyID = id;
    this.showMul = false;
    this.attachmentUrl.length = 0;
    this.files.length = 0;
    this.CommonService.GetPharmacyPhotos(id).subscribe(
      (data) => {
        this.photos = data;
      },
      (error) => { }
    );
  }








  attachmentUrl: any = []

  public InsertPharmcyPhotos() {
    this.showPopup = 0;
    if (this.attachmentUrl.length == 0) {
      this.attachmentUrl[0] = 'C:\\MarocAPI\\Images\\PharmacyPhotos\\Pharmacy.jpg'
    }
    for (let i = 0; i < this.attachmentUrl.length; i++) {

      var entity = {
        'PharmacyID': this.pharmacyID,
        'PhotoURL': this.attachmentUrl[i]
      }
      this.CommonService.InsertPharmacyPhotos(entity).subscribe(data => {

        if (data != 0) {
          this.getPharmacyForAdmin()

        }
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertPharmacyPhotos", error);
      })
    }

  }
  showMul: boolean | undefined

  addPhotos() {
    this.showMul = true
  }
}
