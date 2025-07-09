import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Prescriptions/prescriptionlabels.json';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ordered-medicines',
  templateUrl: './ordered-medicines.component.html',
  styleUrls: ['./ordered-medicines.component.css']
})
export class OrderedMedicinesComponent implements OnInit {

  @Input() OrdersList: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();
  ReferenceNumber: any;

  constructor(private PharmacyService: PharmacyService, private SharedService: SharedService) { }

  details: any;
  pharmacyID: any;
  languageID: any;
  medicineList: any;
  loader: boolean | undefined;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  labels: any;
  remarks: string = '';


  ngOnInit(): void {
    this.loader = true;
    this.pharmacyID = sessionStorage.getItem('pharmacyid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    console.log("orders", this.OrdersList);
    this.details = this.OrdersList;
    this.remarks=this.details.medicineRemarks
    //this.getMedicines()
  }


  getMedicines(ID:any) {
    this.PharmacyService.GetPatientOrderedMedicines(ID, this.languageID).subscribe(
      data => {

        this.medicineList = data;
        this.details = this.OrdersList;
        this.loader = false;
      }, error => {
        this.loader = false;
      }
    )
    this.getRef(this.details.docPrescrptionID);
  }


  getRef(ID:any){
    ;
    this.PharmacyService.GetReferenceNumberByID(ID).subscribe(
      data => {
        this.ReferenceNumber = data[0].referenceNumber;
      }, error => {
        this.loader = false;
      }
    )
  }


  public Updateavailablemedicines() {
    ;
    this.showPopup = 0;
    this.showLoader.emit();

    // this.loader = true;
    this.SharedService.sendPharmacySMS(this.details, 6, 1);
    var txtAmount = this.medicineList.filter((x: {amount: number;availableBit: number | boolean; substituteBit: number | boolean;
      }) =>
        x.amount == 0 &&
        (x.availableBit == true || x.availableBit == 1) &&
        x.substituteBit != true &&
        x.substituteBit != 1
    );
    var subAmount = this.medicineList.filter(
      (x: {
        subAmount: number;
        availableBit: number | boolean;
        substituteBit: boolean | undefined;
        subMedicineName:string;
      }) =>
        x.subAmount == 0 &&
        (x.availableBit == true || x.availableBit == 1) &&
        x.substituteBit == true &&
        x.substituteBit == true 
    );
    ;
    var mandatoryOne = this.medicineList.filter(
      (x: { availableBit: number | boolean }) =>
        x.availableBit == true || x.availableBit == 1
    );
    var subtext=this.medicineList.filter(
      (x: {     
        substituteBit: boolean | undefined;
        subMedicineName:string;
      }) =>        
        x.substituteBit == true && (x.subMedicineName ==''||x.subMedicineName =='null'|| x.subMedicineName ==null)
    )
    if (
      txtAmount.length != 0 ||
      mandatoryOne.length == 0 ||
      subAmount.length != 0
    ) {
      this.error.emit((this.messageID = 71));

      this.showPopup = 0;
      this.messageID = 71;
      this.typeofPopUp = 2;

      this.loader = false;
    }

    else if(subtext.length!=0){
      this.error.emit((this.messageID = 92));     
    } 
    else {    
     
      for (let i = 0; i < this.medicineList.length; i++) {
        
        var entity = {
          'ID': this.medicineList[i].id,
          'Amount': this.medicineList[i].amount,
          'AvailableBit': this.medicineList[i].availableBit,
          'Quantity': this.medicineList[i].quantity,
          'MedicineName': this.medicineList[i].medicineName,
          'SIG': this.medicineList[i].sig,
          'SubMedicineName': this.medicineList[i].subMedicineName,
          'SubQuantity': this.medicineList[i].subQuantity,
          'SubPhysology': this.medicineList[i].subPhysology,
          'SubAmount': this.medicineList[i].subAmount,
          'DocPrID': this.medicineList[i].docPrID,
          'SubstituteBit': this.medicineList[i].substituteBit
        }
        this.PharmacyService.UpdatePatientOrderedMedicinesAvailableMedicines(entity).subscribe(data => {
          
          this.PharmacyService.UpdatePatient_TextMedicineDetails(this.details.id,this.remarks).subscribe(data => {
            this.loader = false;
          }, error => {

          })
        }, error => {
          

        })
      }


      this.close.emit(this.messageID = 34);

    }
    
    
  }




  pdfContent: any;

  public SavePDF() {

    this.pdfContent = window.document.getElementById("content");
    var doc = new jsPDF('p', 'mm', "a4");

    // html2canvas(this.pdfContent).then(canvas => {
    //   ;
    //   var imgData = canvas.toDataURL('image/jpeg', 1.0);

    //   doc.setFontSize(2);

    //   doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
    html2canvas(this.pdfContent).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();

      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft >= 0) {
        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.deletePage(1)
      var pdf = doc.output('blob');

      var file = new File([pdf], "DocReceipt" + ".pdf");

      let body = new FormData();

      body.append('Dan', file);
      doc.save('PO.pdf');


    });
  }
}
