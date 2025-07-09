import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Prescriptions/prescriptionlabels.json';
declare var window: any;
import { SharedService } from 'src/app/Pages/services/shared.service';
import { UploadedPrescriptionComponent } from '../uploaded-prescription/uploaded-prescription.component';
import { OrderedMedicinesComponent } from '../ordered-medicines/ordered-medicines.component';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/Pages/services/common.service';
import { environment } from 'src/environments/environment';
import { PharmacyPaymentReceiptComponent } from '../pharmacy-payment-receipt/pharmacy-payment-receipt.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-precriptions',
  templateUrl: './precriptions.component.html',
  styleUrls: ['./precriptions.component.css'],
})
export class PrecriptionsComponent implements OnInit {
  p: any;
  @ViewChild(PharmacyPaymentReceiptComponent, { static: false })
  PharmacyPaymentReceiptComponent: PharmacyPaymentReceiptComponent | undefined;
  @ViewChild(UploadedPrescriptionComponent, { static: false })
  UploadedPrescriptionComponent: UploadedPrescriptionComponent | undefined;
  @ViewChild(OrderedMedicinesComponent, { static: false })
  OrderedMedicinesComponent: OrderedMedicinesComponent | undefined;
  constructor(
    private PharmacyService: PharmacyService,
    private SharedService: SharedService,
    private http: HttpClient,
    private CommonService: CommonService,
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
  typeID: any;
  selectedOrder: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  formModal: any;
  count: any;
  labels: any;
  currentUrl: any;
  firsttime: any;
  pharmacyName: any;
  emailSubject: any;
  cclist: any = [];
  emailattchementurl: any = [];
  bcclist: any = [];
  private url: string = '';
  private host = environment.API_URL;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('medicines')
    );
    this.pharmacyID = sessionStorage.getItem('pharmacyid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.pharmacyName = sessionStorage.getItem('user');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.firsttime = sessionStorage.getItem('firsttime');
    if (
      sessionStorage.getItem('firsttime') == null ||
      sessionStorage.getItem('firsttime') == undefined
    ) {
      this.firsttime = 'true';
      Swal.fire(this.labels.msgimpot, this.labels.acknowledged);
      sessionStorage.setItem('firsttime', 'true');
    } else {
    }
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
    this.oberserableTimer();
  }

  oberserableTimer() {
    const source = timer(1000, 4000);
    const abc = source.subscribe((val) => {
      this.GetPharmacyOrders();
    });
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.PharmacyService.GetDates(data[0]);
    this.enddate = this.PharmacyService.GetDates(data[1]);
    this.GetPharmacyOrders();
    this.loader = false;
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

  emailid: any;

  getTypeID(details: any, typeID: any) {
    debugger;
    this.typeID = typeID;
    this.phoneno = details.mobileNumber;
    this.emailid = details.emailID;
    this.patientid = details.patientID;
    this.id = details.id;
    this.selectedOrder = details;
    if (this.languageID == 1) {
      this.msg = `${this.pharmacyName} accepted your Order.Please Wait for further updates`;
    } else {
      this.msg = `${this.pharmacyName} accepté votre commande. Veuillez attendre d'autres mises à jour`;
    }

    console.log('details', this.selectedOrder);
    this.doSomething();
  }

  doSomething() {
    debugger;
    if (this.typeID == 1) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.PharmacyService.ApprovedPatientMedicineDetails(
            this.selectedOrder.id
          ).subscribe(
            async (res) => {
              let test = res;
              await this.sendingSMSPharmacy(this.phoneno, this.msg);
              await this.sendEmailPharmacy();
              this.notification();
              // this.SharedService.sendPharmacySMS(this.selectedOrder, this.typeID, 1)
              this.showPopup = 1;
              this.messageID = 66;
              this.typeofPopUp = 1;
              this.GetPharmacyOrders();
              this.loader = false;
            },
            (error) => {
              this.loader = false;
              this.SharedService.insertexceptions(
                this.currentUrl,
                'sendPharmacySMS',
                error
              );
            }
          );
        }
      });
    } else if (this.typeID == 2) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.canceltitle,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText,
      }).then((result) => {
        if (result.value) {
          this.PharmacyService.PharCancelledPatientMedicineDetails(
            this.selectedOrder.id
          ).subscribe(
            async (res) => {
              let test = res;
              await this.SharedService.sendPharmacySMS(
                this.selectedOrder,
                this.typeID,
                2
              );

              this.showPopup = 1;
              this.messageID = 67;
              this.typeofPopUp = 1;
              this.loader = false;
              this.GetPharmacyOrders();
            },
            (error) => {
              this.SharedService.insertexceptions(
                this.currentUrl,
                'sendPharmacySMS',
                error
              );
            }
          );
        }
      });
    } else if (this.typeID == 3) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.orderconformation,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText,
      }).then((result) => {
        if (result.value) {
          this.PharmacyService.UpdateOrderOrderPaidBit(
            this.selectedOrder.id
          ).subscribe(
            async (res) => {
              let test = res;
              await this.SharedService.sendPharmacySMS(
                this.selectedOrder,
                this.typeID,
                3
              );
              this.showPopup = 1;
              this.messageID = 68;
              this.typeofPopUp = 1;
              this.loader = false;
              this.GetPharmacyOrders();
            },
            (error) => {
              this.SharedService.insertexceptions(
                this.currentUrl,
                'sendPharmacySMS',
                error
              );
            }
          );
        }
      });
    } else if (this.typeID == 4) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.assignOrder,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText,
      }).then((result) => {
        if (result.value) {
          this.PharmacyService.GetDeliveredPatnerAssignReadyForAvailable(
            this.selectedOrder.id
          ).subscribe(
            async (res) => {
              let test = res;
              await this.SharedService.sendPharmacySMS(
                this.selectedOrder,
                this.typeID,
                4
              );
              this.showPopup = 1;
              this.messageID = 69;
              this.typeofPopUp = 1;
              this.loader = false;
              this.GetPharmacyOrders();
            },
            (error) => {
              this.SharedService.insertexceptions(
                this.currentUrl,
                'sendPharmacySMS',
                error
              );
            }
          );
        }
      });
    } else if (this.typeID == 5) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.deliverymsg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText,
      }).then(
        (result) => {
          if (result.value) {
            this.PharmacyService.UpdateOrderReadyBit(
              // this.PharmacyService.DeliveredPatientMedicineDetails(
              this.selectedOrder.id
            ).subscribe((res) => {
              let test = res;
              this.showPopup = 1;
              this.messageID = 70;
              this.typeofPopUp = 1;
              this.loader = false;
              this.GetPharmacyOrders();
            });
          }
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'DeliveredPatientMedicineDetails',
            error
          );
          this.loader = false;
        }
      );
    } else if (this.typeID == 6) {
      this.formModal.show();
      setTimeout(() => {
        this.OrderedMedicinesComponent?.getMedicines(this.selectedOrder.id);
      }, 100);

      ``;
    } else if (this.typeID == 7) {
      this.formModal.show();
      this.UploadedPrescriptionComponent?.getPhotos();
    } else if (this.typeID == 22) {
      debugger;
      setTimeout(() => {
        debugger;
        this.PharmacyPaymentReceiptComponent?.gettest(1);
      });
      this.formModal.show();
    } else if (this.typeID == 8) {
      debugger;
      this.formModal.show();
      this.UploadedPrescriptionComponent?.getPhotos(this.selectedOrder);
    } else if (this.typeID == 9) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.deliverymsg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText,
      }).then(
        (result) => {
          if (result.value) {
            // this.PharmacyService.UpdateOrderReadyBit(
            this.PharmacyService.DeliveredPatientMedicineDetails(
              this.selectedOrder.id
            ).subscribe((res) => {
              let test = res;
              this.showPopup = 1;
              this.messageID = 70;
              this.typeofPopUp = 1;
              this.loader = false;
              this.GetPharmacyOrders();
            });
          }
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'DeliveredPatientMedicineDetails',
            error
          );
          this.loader = false;
        }
      );
    }
  }

  closeModal() {
    this.typeID = 0;
  }

  showLoader() {
    this.loader = true;
  }

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

  location: any;

  getAddress(address: any) {
    this.location = address;
  }

  closechatMessage() {
    this.typeID = 0;
  }

  phoneno: any;
  msg: any;
  smslistList: any;
  // sendingSMSPharmacy(){
  //   debugger
  //   if(this.languageID==1){
  //      this.msg='Habib has accepted your medication order which is being processed.'
  //   }
  //   else{
  //     this.msg='Habib a accepté votre commande de médicaments qui est en cours de traitement.'
  //   }
  //   if((this.phoneno .substring (0, 4)) == '+212'){
  //     this.phoneno.slice(3)
  //     console.log("Sms Success", this.phoneno);

  //     this.PharmacyService.SendTwillioSMS(this.phoneno,this.msg).subscribe(
  //       data=>{
  //         this.smslistList = data;
  //         console.log("smslistList", this.smslistList);
  //         // this.http.get<any[]>("https://www.telma.net/sms_connect/sendsms/login?login=TERRA_INNOV&password=t3rR@_1Nn0V&msisdn_to="+this.PhoneNumber+"&body="+this.Message+"&oadc=TERRA INNOV");
  //       }
  //     )
  //     //  this.http.get<any[]>("https://www.telma.net/sms_connect/sendsms/login?login=TERRA_INNOV&password=t3rR@_1Nn0V&msisdn_to="+this.smsMobileNo+"&body="+this.smsDesc+"&oadc=TERRA INNOV");
  //     //   }
  //     //   else{
  //   // this.http.get<any[]>(this.host + '/Doctor/SendTwillioSMS?PhoneNumber=' + this.smsMobileNo + '&Message=' + this.smsDesc)
  //   //   .subscribe(data => {
  //   //     console.log("Sms Success")
  //   //   })
  //   }
  // }

  async sendingSMSPharmacy(phoneno: any, msg: any) {
    debugger;
    // return true;
    this.CommonService.SendTwillioSMS(this.phoneno, this.msg).subscribe(
      async (data) => {
        console.log('Sms success', data);
        return true;
      },
      (error) => {
        console.log('sms failure', error);
      }
    );
  }

  public async sendEmailPharmacy() {
    if ((this, this.languageID == 1)) {
      this.emailSubject = `Pharmacy Update`;
    } else {
      this.emailSubject = `Pharmacy Update`;
    }
    var entity = {
      emailto: this.emailid,
      emailsubject: this.emailSubject,
      emailbody: this.msg,
      attachmenturl: this.emailattchementurl,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.url = this.host + '/Doctor/sendemail';
    this.http.post(this.url, entity).subscribe(
      (data) => {
        console.log('Email Sent');
      },
      (error) => {
        console.log('EMail Error', error);
      }
    );
  }

  patientid: any;
  id: any;
  public async notification() {
    debugger;
    var entity = {
      PatientID: this.patientid,
      Notification: this.emailSubject,
      Description: this.msg,
      NotificationTypeID: 10,
      Date: new Date(),
      LanguageID: this.languageID,
      AppointmentID: this.id,
    };
    this.CommonService.InsertNotifications(entity).subscribe(
      async (data) => {
        console.log('notication', data);
      },
      (error) => {
        console.log('notication respone', error);
      }
    );
  }
  closeReceipt(messageID: any) {
    this.showPopup = 1;
    this.typeofPopUp = 1;
    this.messageID = messageID;
    this.formModal.hide();
    this.loader = false;
  }
  refresh() {
    this.router.navigate([`/Pharmacy/Precriptions/`]);
  }
}
