import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';
import { DoctorService } from '../../../services/Doctor/doctor.service';
declare var window: any;
import { SharedService } from '../../../services/shared.service';
import Lables from '../../../Lables/Doctors/myAppointments.json';
import { formatDate } from '@angular/common';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';

@Component({
  selector: 'app-recp-appointments',
  templateUrl: './recp-appointments.component.html',
  styleUrls: ['./recp-appointments.component.css'],
})
export class RecpAppointmentsComponent implements OnInit {
  p: any;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}
  bsRangeValue: Date[] | undefined;
  bsValue = new Date();
  maxDate = new Date();
  startdate: any;
  enddate: any;
  doctorID: any;
  languageID: any;
  loader: any;
  appointmentList: any;
  count: any;
  search: any;
  showModal: any;
  typeID: any;
  selectedAppointment: any;
  typeOfAction: any;

  formModal: any;

  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  earlyCallNotes: any;
  followupModal: any;
  uploadDocuments: any;
  labels: any;

  followupAppointmentTypeID: any;
  checkedList: any;
  showGeneratePdf: any;
  ngOnInit(): void {
    this.loader = true;
    this.typeID = 0;
    // this.formModal = new window.bootstrap.Modal(
    //   document.getElementById("staticBackdrop")
    // )

    // this.followupModal = new window.bootstrap.Modal(
    //   document.getElementById("followUp")
    // )
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Lables['en'][0] : Lables['fr'][0];
    this.uploadDocuments = new window.bootstrap.Modal(
      document.getElementById('uploadDocuments')
    );

    this.showGeneratePdf = new window.bootstrap.Modal(
      document.getElementById('generatePDF')
    );

    // date.getFullYear(), date.getMonth(), 1
    var date = new Date();
    this.startdate = new Date();
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var start = new Date();
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);
    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);
    this.doctorID = sessionStorage.getItem('userid');

    this.bsRangeValue = [start, end];

    this.oberserableTimer();
  }

  oberserableTimer() {
    const source = timer(1000, 4000);
    const abc = source.subscribe((val) => {
      this.getBookAppointmentByDoctorID();
    });
  }
  public getBookAppointmentByDoctorID() {
    this.DoctorService.GetBookAppointmentByDoctorID(
      this.doctorID,
      this.startdate,
      this.enddate,
      this.languageID
    ).subscribe((data) => {
      this.loader = false;
      this.appointmentList = data.filter(
        (x) => x.noShow != 1 && x.docCancelled != 1 && x.cancelled != 1
      );
      this.count = this.appointmentList.length;
      console.log('AppointmentList', this.appointmentList);
    });
  }

  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    this.getBookAppointmentByDoctorID();
  }

  // Pagination
  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  //Child Component Functions

  close(messageid: any) {
    // this.formModal.hide();
    this.uploadDocuments.hide();
    this.showPopup = 1;
    this.messageID = messageid;
    this.typeofPopUp = 1;
    this.loader = false;
    this.typeID = 0;
  }

  Message(messageid: any) {
    this.showPopup = 1;
    this.messageID = messageid;
    this.typeofPopUp = 1;
    this.loader = false;
  }

  showLoader() {
    this.loader = true;
  }

  generatePDF(array: any) {
    this.checkedList = array;
    // this.loader = false;
    this.uploadDocuments.hide();

    this.typeID = 18;
    this.loader = false;
    this.showGeneratePdf.show();
  }

  closeGeneratePopUP(even: any) {
    this.showGeneratePdf.hide();
    this.showPopup = 1;
    this.typeofPopUp = 1;
    this.messageID = even;
    this.loader = false;
  }

  closechatMessage() {
    this.typeID = 0;
  }

  closeReceipt(messageID: any) {
    this.showGeneratePdf.hide();
    this.showPopup = 1;
    this.typeofPopUp = 1;
    this.messageID = messageID;
    this.loader = false;
  }

  //select acceppt cancel
  pEmail: any;
  doctorName: any;
  getSelectedDetails(details: any, tyepOfAction: any) {
    // this.loader = true;

    this.showPopup = 0;
    this.pEmail = details.pEmail;
    this.selectedAppointment = details;
    this.doctorName = details.doctorName;
    this.typeOfAction = tyepOfAction;

    this.doSomething();
  }

  //  End

  getTypeID(even: any, details: any) {
    this.typeID = 0;
    this.typeID = even.target.value;

    this.selectedAppointment = details;

    if (
      this.typeID == 1 ||
      this.typeID == 2 ||
      this.typeID == 3 ||
      this.typeID == 4 ||
      this.typeID == 5
    ) {
      this.formModal.show();
      console.log('details', details);
    } else if (this.typeID == 6) {
      // early Call Request

      this.typeOfAction = 6;
      this.doSomething();
    } else if (this.typeID == 7) {
      // Refund Amount

      this.typeOfAction = 7;
      this.doSomething();
    } else if (this.typeID == 8) {
      // Rejoin the Call

      this.typeOfAction = 8;
      this.doSomething();
    } else if (this.typeID == 9) {
      //follow up Visit

      this.followupModal.show();
      this.typeOfAction = 9;
    } else if (this.typeID == 10) {
      //Previous Prescriptions

      this.formModal.show();
      this.typeOfAction = 10;
    } else if (this.typeID == 11) {
      //Previous Diagnostic Tests

      this.formModal.show();
      this.typeOfAction = 11;
    } else if (this.typeID == 12) {
      //Previous SOap Notes

      this.formModal.show();
      this.typeOfAction = 12;
    } else if (this.typeID == 13) {
      //Previous Medical Certificate

      this.formModal.show();
      this.typeOfAction = 13;
    } else if (this.typeID == 14) {
      // not visited
      this.typeOfAction = 14;
      this.doSomething();
    } else if (this.typeID == 15) {
      // upload documents;

      this.uploadDocuments.show();
      this.typeOfAction = 15;
    } else if (this.typeID == 17) {
      this.uploadDocuments.show();
    } else if (this.typeID == 19) {
      this.showGeneratePdf.show();
    } else if (this.typeID == 22) {
      this.showGeneratePdf.show();
    }
  }

  //Accept reject

  doSomething() {
    if (this.typeOfAction == 1) {
      //Accept call

      Swal.fire({
        title: this.labels.areYouSure,
        text: this.labels.warningText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.DoctorService.UpdateAcceptedBitByDoctor(
            this.selectedAppointment.appointmentID
          ).subscribe(
            (res) => {
              this.SharedService.sendSms(
                this.selectedAppointment,
                this.typeOfAction,
                1
              );
              let test = res;
              this.showPopup = 1;
              this.messageID = 50;
              this.typeofPopUp = 1;

              this.getBookAppointmentByDoctorID();
            },
            (error) => {
              this.loader = false;
            }
          );
        }
      });
    } else if (this.typeOfAction == 2) {
      // Cancel Call
      Swal.fire({
        title: this.labels.reasonForcancel,
        html: `<input type="text" id="Reason" class="swal2-input"  placeholder="Reason For Cancel">`,
        confirmButtonText: 'Submit',
        focusConfirm: false,
        preConfirm: () => {
          this.loader = true;
          const Reason: any = document.getElementById('Reason') as HTMLElement;
          var entity = {
            ID: this.selectedAppointment.appointmentID,
            ReasonForCancel: Reason.value,
          };
          this.DoctorService.UpdateBookAppointmentReasonForCancel(
            entity
          ).subscribe(
            (res) => {
              let test = res;
              this.SharedService.sendSms(
                this.selectedAppointment,
                this.typeOfAction,
                1
              );

              console.log(res);
              this.showPopup = 1;
              this.messageID = 51;
              this.typeofPopUp = 1;
              this.getBookAppointmentByDoctorID();
              this.loader = false;
            },
            (error) => {
              this.loader = false;
              console.log('Error', error);
            }
          );
        },
      });
    } else if (this.typeOfAction == 6) {
      //Early call
      if (this.languageID == 1) {
        this.earlyCallNotes =
          this.selectedAppointment.doctorName +
          ' is available at this moment. Do you want to start the call now ?Type : Video call.';
      } else if (this.languageID == 6) {
        this.earlyCallNotes =
          this.selectedAppointment.doctorName +
          " est disponible plus tôt. Voulez-vous commencer l'appel maintenant ? Type : téléconsultation";
      }
      Swal.fire({
        title: this.labels.earlyCalltext,
        text: this.earlyCallNotes,
        // html: `<input type="textarea" id="earyCall" style="width:350px;height:200px"  class="swal2-input"  placeholder=" "> `,
        confirmButtonText: this.labels.submit,
        focusConfirm: false,
        preConfirm: () => {
          this.loader = true;
          this.DoctorService.GetBookAppointmentEarlyCallbit(
            this.selectedAppointment.appointmentID
          ).subscribe(
            (res) => {
              let test = res;
              this.loader = false;
              this.SharedService.sendSms(
                this.selectedAppointment,
                this.typeOfAction,
                1
              );

              console.log(res);
              this.showPopup = 1;
              this.messageID = 1;
              this.typeofPopUp = 1;
              this.getBookAppointmentByDoctorID();
            },
            (error) => {
              this.loader = false;
              console.log('Error', error);
            }
          );
        },
      });
    } else if (this.typeOfAction == 7) {
      //Refund  Amount

      Swal.fire({
        title: this.labels.refundAmount,
        html:
          '<label>   Remboursement au patient : ' +
          this.selectedAppointment.paidAmount +
          '</label> <br> <input type="textarea" id="notes" style="width:350px;height:150px"  class="swal2-input"  placeholder="Notes">',
        confirmButtonText: this.labels.submit,
        focusConfirm: false,
        preConfirm: () => {
          const notes: any = document.getElementById('notes') as HTMLElement;
          this.loader = true;
          var entity = {
            AppointmentID: this.selectedAppointment.appointmentID,
            RefundComments: notes.value,
          };
          this.DoctorService.UpdateBookAppointmentRefund(entity).subscribe(
            (res) => {
              let test = res;
              var entity1 = {
                PatientID: this.selectedAppointment.patientID,
                WalletAmount: this.selectedAppointment.paidAmount,
              };
              this.DoctorService.UpdatePatientWalletAmountDetailsLoadWallet(
                entity1
              ).subscribe(
                (data) => {
                  this.loader = false;

                  this.SharedService.sendSms(
                    this.selectedAppointment,
                    this.typeOfAction,
                    1
                  );
                  console.log(res);
                  this.showPopup = 1;
                  this.messageID = 1;
                  this.typeofPopUp = 1;
                  this.getBookAppointmentByDoctorID();
                },
                (error) => {
                  this.loader = false;
                  console.log('Error', error);
                }
              );
            },
            (error) => {
              this.loader = false;
              console.log('Error', error);
            }
          );
        },
      });
    } else if (this.typeOfAction == 8) {
      //rejoin call
      Swal.fire({
        title: this.labels.areYouSure,
        text: this.labels.freeCallText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#322b6b',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.DoctorService.UpdateBookVideoCallRejoinbit(
            this.selectedAppointment.appointmentID
          ).subscribe(
            (data) => {
              this.loader = false;
              this.SharedService.sendSms(
                this.selectedAppointment,
                this.typeOfAction,
                1
              );

              console.log(data);
              this.showPopup = 1;
              this.messageID = 53;
              this.typeofPopUp = 1;
              this.getBookAppointmentByDoctorID();
            },
            (error) => {}
          );
        }
      });
    } else if (this.typeOfAction == 9) {
      Swal.fire({
        title: this.labels.areYouSure,
        text: this.labels.followUpText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#322b6b',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.DoctorService.UpdateBookAppointmentFollowupVisit(
            this.selectedAppointment.appointmentID,
            this.followupAppointmentTypeID
          ).subscribe(
            (data) => {
              this.loader = false;

              console.log(data);
              this.SharedService.sendSms(
                this.selectedAppointment,
                this.typeOfAction,
                1
              );
              this.showPopup = 1;
              this.messageID = 1;
              this.typeofPopUp = 1;
              this.getBookAppointmentByDoctorID();
            },
            (error) => {}
          );
        }
      });
    } else if (this.typeOfAction == 14) {
      Swal.fire({
        title: this.labels.areYouSure,
        text: this.labels.patientNotVisited,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.DoctorService.UpdateBookAppointmentNoShow(
            this.selectedAppointment.appointmentID
          ).subscribe(
            (res) => {
              let test = res;
              this.showPopup = 1;
              this.messageID = 58;
              this.typeofPopUp = 1;
              this.getBookAppointmentByDoctorID();
            },
            (error) => {
              this.loader = false;
            }
          );
        }
      });
    } else if (this.typeOfAction == 16) {
      this.formModal.show();
      this.typeID = 16;
    }
  }

  closeModal() {
    this.formModal.show();
    this.followupModal.hide();
    this.typeID = 0;
  }

  //start early call

  startEarlyVideoCall(details: any) {
    sessionStorage.setItem('Details', btoa(JSON.stringify(details)));
    window.open('#/VideoCall', '_blank');
  }

  // generatePDF(array: any) {
  //   this.typeID = 18;
  //
  //   this.checkedList = array;
  //   // this.loader = false;
  //   this.uploadDocuments.hide();
  //
  //   this.showGeneratePdf.show();
  //   this.loader = false;

  // }

  sendEmail(array: any) {
    this.formModal.hide();
    this.typeID = 18;
    this.checkedList = array;
    this.showGeneratePdf.show();
  }

  public getReport(pdf: any) {
    location.href = '#/Shared/view/' + btoa(pdf);
  }

  patientID: any;
  appointmentID: any;
  appointmentTypeID: any;
  doctorslotid: any;
  feeslist: any;
  PaidAmount: any;

  public GetDetails(details: any) {
    (this.patientID = details.patientID),
      (this.appointmentID = details.appointmentID);
    this.doctorID = details.doctorID;
    (this.appointmentTypeID = details.appointmentTypeID),
      (this.doctorslotid = details.doctorSlotID);

    this.DoctorService.GetDoctorCommissionFeesByDoctorID(
      this.doctorslotid,
      this.appointmentTypeID
    ).subscribe((data) => {
      this.feeslist = data;
      if (details.followApp == 1) {
        this.PaidAmount = 0;
      } else {
        this.PaidAmount = this.feeslist[0].doctorFees;
      }
    });
  }

  PaymentTypeID: any;

  public GetPaymentTypeID(even: any) {
    this.PaymentTypeID = even.target.value;
  }

  public insertpaymentDetails() {
    this.loader = true;
    this.showPopup = 0;
    var entity = {
      PatientID: this.patientID,
      AppointmentID: this.appointmentID,
      DoctorID: this.doctorID,
      PaymentType: this.PaymentTypeID,
      PaidAmount: this.PaidAmount,
      TotalFeesOfDoctor: this.PaidAmount,
      PaymentDate: new Date(),
      Reason: 'Payment Made For Appointment By Receptionst',
    };
    this.DoctorService.InsertPatientPaymentDetailsWeb(entity).subscribe(
      (data) => {
        if (data != 0) {
          this.UpdateBookAppointmentPaidStatusBit();
          this.showPopup = 1;
          this.messageID = 61;
          this.typeofPopUp = 1;
          this.loader = false;
        }
        this.loader = false;
        this.getBookAppointmentByDoctorID();
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  public UpdateBookAppointmentPaidStatusBit() {
    this.loader = true;
    this.DoctorService.UpdateBookAppointmentPaidStatusBit(
      this.appointmentID
    ).subscribe(
      (data) => {
        this.loader = false;
        this.getBookAppointmentByDoctorID();
      },
      (error) => {}
    );
  }

  getAllAppts() {
    this.loader = true;
    var date = new Date();
    this.startdate = new Date();
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 6, 0);

    var start = new Date();
    var end = new Date(date.getFullYear(), date.getMonth() + 6, 0);
    this.bsRangeValue = [start, end];
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);
    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);
    this.oberserableTimer();
  }

  getTodayAppts() {
    this.loader = true;
    var date = new Date();
    this.startdate = new Date();

    var start = new Date();
    var end = new Date();
    this.bsRangeValue = [start, end];
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);
    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.startdate, format, locale);

    this.oberserableTimer();
  }

  public getWebPanelAppointmentDetails(details: any, tyepOfAction: any) {
    debugger;
    this.showPopup = 0;
    this.selectedAppointment = details;
    this.pEmail = details.pEmail;
    this.doctorName = details.doctorName;
    this.typeOfAction = tyepOfAction;
    Swal.fire({
      title: this.labels.areYouSure,
      text: this.labels.warningText,
      icon: 'warning',
      customClass: 'swal-wide',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.yes,
      cancelButtonText: this.labels.no,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader = true;
        this.DoctorService.UpdateAcceptedBitByDoctor(
          this.selectedAppointment.appointmentID
        ).subscribe(
          (res) => {
            // this.SharedService.sendSms(
            //   this.selectedAppointment,
            //   this.typeOfAction,
            //   1
            // );
            let test = res;
            this.showPopup = 1;
            this.messageID = 50;
            this.typeofPopUp = 1;
            this.sendWebPanelAppointmentEmail();
            this.getBookAppointmentByDoctorID();
          },
          (error) => {
            this.loader = false;
          }
        );
      }
    });
  }
  emailattchementurl: any = [];
  emaildesc: any;
  cclist: any = [];
  bcclist: any = [];
  sub1: any;
  sendWebPanelAppointmentEmail() {
    debugger;
    if (this.languageID == 1) {
      this.emaildesc = `Your healthcare provider ${this.doctorName}  has accepted your appointment`;
    } else {
      this.emaildesc = `Votre prestataire de soins de santé ${this.doctorName}  a accepté votre rendez-vous`;
    }
    if (this.languageID == 1) {
      this.sub1 = `Appointment confirmation`;
    } else {
      this.sub1 = `Confirmation de rendez-vous`;
    }
    var entity = {
      emailto: this.pEmail,
      emailsubject: this.sub1,
      emailbody: this.emaildesc,
      attachmenturl: this.emailattchementurl,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.DoctorService.sendemail(entity).subscribe(
      async (data) => {
        //this.close.emit(this.messageID = 52);
        // this.closeGeneratePopUP.emit((this.messageID = 1));
        console.log('email Sent Succesfully');
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(this.pEmail, 'Email Erroe', error);
        this.loader = false;
        console.log('Email Failed');
      }
    );
  }
}
