import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import Labels from '../../../Lables/Prescriptions/prescriptionlabels.json';
declare var window: any;
import { SharedService } from 'src/app/Pages/services/shared.service';
import { Router } from '@angular/router';
import { UploadedPrescriptionComponent } from '../uploaded-prescription/uploaded-prescription.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  p: any;
  @ViewChild(UploadedPrescriptionComponent, { static: false })
  UploadedPrescriptionComponent: UploadedPrescriptionComponent | undefined;

  constructor(
    private PharmacyService: PharmacyService,
    private SharedService: SharedService,
    public router: Router
  ) {}

  pharmacyID: any;
  languageID: any;
  user: any;
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader: boolean | undefined;
  ordersList: any;
  term: any;
  formModal: any;
  labels: any;
  count: any;
  currentUrl: any;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('medicines')
    );
    this.pharmacyID = sessionStorage.getItem('pharmacyid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.user = sessionStorage.getItem('user');
    var date = new Date();
    this.startdate = new Date();
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var start = new Date();
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale2 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale2);
    this.bsRangeValue = [start, end];

    this.GetPharmacyOrders();
  }

  public async GetPharmacyOrders() {
    this.PharmacyService.GetPatient_TextMedicineDetails(
      this.pharmacyID,
      this.startdate,
      this.enddate,
      this.languageID
    ).subscribe(
      (data) => {
        this.ordersList = data;
        console.log('orders', this.ordersList);
        this.count = this.ordersList.length;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPatient_TextMedicineDetails',
          error
        );
        console.log('Error', error);
        this.loader = false;
      }
    );
  }

  // Pagination
  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }
  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.PharmacyService.GetDates(data[0]);
    this.enddate = this.PharmacyService.GetDates(data[1]);
    this.GetPharmacyOrders();
  }
  typeID: any;
  selectedOrder: any;

  getTypeID(details: any, typeID: any) {
    this.typeID = typeID;
    this.selectedOrder = details;
    this.doSomething();
  }

  doSomething() {
    if (this.typeID == 6) {
      this.formModal.show();
    } else if (this.typeID == 7) {
      this.formModal.show();
    } else if (this.typeID == 8) {
      this.formModal.show();
      this.UploadedPrescriptionComponent?.getPhotos(this.selectedOrder);
    }
  }

  closeModal() {
    this.typeID = 0;
  }

  showLoader() {
    this.loader = true;
  }
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  error(messageid: any) {
    this.showPopup = 1;
    this.typeofPopUp = 2;
    this.messageID = messageid;
    this.loader = false;
  }

  close(messageID: any) {
    this.showPopup = 1;
    this.typeofPopUp = 1;
    this.messageID = messageID;
    this.loader = false;
    this.formModal.hide();
  }
  refresh() {
    // window.location.reload();
    //this.router.navigate([`/Pharmacy/Precriptions/`]);
  }
}
