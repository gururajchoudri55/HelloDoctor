import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';
import { DoctorService } from '../../services/Doctor/doctor.service';
declare var window: any;
import { SharedService } from '../../services/shared.service';
import Lables from '../../Lables/Doctors/myAppointments.json';
import { PaymentRecepitComponent } from '../payment-recepit/payment-recepit.component';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css'],
})
export class MyAppointmentsComponent implements OnInit {
  p: any;
  @ViewChild(PaymentRecepitComponent, { static: false })
  PaymentRecepitComponent: PaymentRecepitComponent | undefined;
  vitalsObject: any;
  scanDate: any;
  vitalsData: any;
  vitalSigns: any;
  holisticHealth: any;
  cardiovascularRisks: any;
  covidRisk: any;
  viewMedicalHistoryList: any;
  private host1: string = environment.API_URL;
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
  AllergiesModal: any;
  description: any;
  referallist: any;
  patientDetails = {};
  drugName: string = '';
  dosage: string = '';
  frequency: string = '';
  printbutton: boolean = false;
  doctorName: any;
  showname: any;
  signatureUrl: any;
  stamp: any;

  ngOnInit(): void {
    this.loader = true;
    this.getServerDate();
    this.typeID = 0;
    this.formModal = 0;
    // this.signatureUrl = this.Details[0].signatureURL,
    // this.stamp = this.Details[0].stampURL
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('staticBackdrop')
    );

    this.followupModal = new window.bootstrap.Modal(
      document.getElementById('followUp')
    );

    this.uploadDocuments = new window.bootstrap.Modal(
      document.getElementById('uploadDocuments')
    );

    this.showGeneratePdf = new window.bootstrap.Modal(
      document.getElementById('generatePDF')
    );
    this.AllergiesModal = new window.bootstrap.Modal(
      document.getElementById('AllergiesModal')
    );

    // date.getFullYear(), date.getMonth(), 1
    var date = new Date();
    this.startdate = new Date();
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 6, 0);

    var start = new Date();
    var end = new Date(date.getFullYear(), date.getMonth() + 6, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);
    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);
    this.doctorID = sessionStorage.getItem('userid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Lables['en'][0] : Lables['fr'][0];
    console.log(this.labels, 'labelsList');
    this.bsRangeValue = [start, end];

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

  getAllAppts() {
    debugger;
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

  oberserableTimer() {
    debugger;
    const source = timer(1000, 30000);
    const abc = source.subscribe((val) => {
      this.showPopup = 0;
      this.getBookAppointmentByDoctorID();
    });
    const source1 = timer(1000, 2000);
    const abc1 = source1.subscribe((val) => {
      this.showPopup = 0;
    });
  }
  public async getBookAppointmentByDoctorID() {
    await this.DoctorService.GetBookAppointmentByDoctorID(
      this.doctorID,
      this.startdate,
      this.enddate,
      this.languageID
    ).subscribe(async (data) => {
      this.appointmentList = data;
      // .filter(x => x.noShow != 1 && x.docCancelled != 1 && x.cancelled != 1);

      this.loader = false;
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
    this.showPopup = 0;
    this.formModal.hide();
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

  closePopUp(description: any) {
    this.formModal.hide();
    this.description = description;
    this.AllergiesModal.show();
    this.typeID = 29;
  }
  closeDocumentsModal() {
    this.formModal.hide();
  }
  showLoader() {
    this.loader = true;
  }

  StopLoader() {
    this.loader = false;
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

  openAllergies(type: any) {
    this.formModal.hide();
    this.typeID = type;
    this.AllergiesModal.show();
  }

  //select acceppt cancel
  pEmail: any;
  getSelectedDetails(details: any, tyepOfAction: any) {
    // this.loader = true;
    debugger;
    this.showPopup = 0;

    this.selectedAppointment = details;
    this.pEmail = details.pEmail;
    this.doctorName = details.doctorName;
    this.typeOfAction = tyepOfAction;

    this.doSomething();
  }

  //  End

  getTypeID(even: any, details: any) {
    debugger;
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
      //  this.showGeneratePdf.show();

      setTimeout(() => {
        this.PaymentRecepitComponent?.gettest(true);
      }, 100);
      this.showGeneratePdf.show();
    } else if (this.typeID == 35) {
      // early Call Request

      this.typeOfAction = 35;
      this.doSomething();
    } else if (this.typeID == 24) {
      // early Call Request

      this.typeOfAction = 24;
      this.referralhistory(details.patientID);
      this.doSomething();
    }

    console.log(this.selectedAppointment, 'selectedAppointmentList');
  }

  referralhistory(id: any) {
    // this.typeID = 29;
    // this.formModal.show();
    // this.typeOfAction = 29;
    this.DoctorService.GetPatientReferalHistory(id, this.languageID).subscribe(
      (data) => {
        this.referallist = data;
        console.log(this.referallist, 'referallist');
      },
      (error) => {}
    );
  }

  //Accept reject

  doSomething() {
    debugger;
    if (this.typeOfAction == 1) {
      //Accept call

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
      debugger;
      Swal.fire({
        title: this.labels.reasonForcancel,
        html: `<input type="text" id="Reason" class="swal2-input"  placeholder="Raison de l'annulation">`,
        confirmButtonText: this.labels.submit,
        confirmButtonColor: '#f18235',
        focusConfirm: false,
        preConfirm: () => {
          debugger;
          this.loader = true;
          const Reason: any = document.getElementById('Reason') as HTMLElement;
          if (
            Reason.value == '' ||
            Reason.value == null ||
            Reason.value == undefined
          ) {
            this.showPopup = 1;
            this.messageID = 92;
            this.typeofPopUp = 2;
          } else {
            var entity = {
              ID: this.selectedAppointment.appointmentID,
              ReasonForCancel: Reason.value,
            };
            this.DoctorService.UpdateBookAppointmentReasonForCancel(
              entity
            ).subscribe(
              async (res) => {
                let test = res;
                this.sendCancelEmail();
                if (
                  this.host1 ==
                  'https://madagascar.voiladoc-eastafrica.com/MadagascarWebAPI'
                ) {
                  this.sendAdminCancelEmail();
                  this.sendAdmin1CancelEmail();
                }
                //this.sendAdminCancelEmail();
                //this.sendAdmin1CancelEmail();
                this.DoctorService.GetBookAppointmentByDoctorID(
                  this.doctorID,
                  this.startdate,
                  this.enddate,
                  this.languageID
                ).subscribe(async (data) => {
                  this.appointmentList = data;
                  this.selectedAppointment
                    ? (this.selectedAppointment = this.appointmentList.filter(
                        (x: { appointmentID: any }) =>
                          x.appointmentID ==
                          this.selectedAppointment.appointmentID
                      )[0])
                    : '';
                  this.SharedService.sendSms(
                    this.selectedAppointment,
                    this.typeOfAction,
                    2
                  );
                  console.log(res);
                  this.showPopup = 1;
                  this.messageID = 51;
                  this.typeofPopUp = 1;

                  this.loader = false;
                });
              },
              (error) => {
                this.loader = false;
                console.log('Error', error);
              }
            );
          }
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
          ' Voulez-vous que nous demandions au patient si il veut commencer la téléconsultation tout de suite ? ';
      }
      Swal.fire({
        title: this.labels.earlyCalltext,
        text: this.earlyCallNotes,
        // html: `<input type="textarea" id="earyCall" style="width:350px;height:200px"  class="swal2-input"  placeholder=" "> `,
        confirmButtonText: this.labels.submit,
        confirmButtonColor: '#f18235',
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
              this.SharedService.sendSms(
                this.selectedAppointment,
                this.typeOfAction,
                1
              );

              this.showPopup = 1;
              this.messageID = 1;
              this.typeofPopUp = 1;
              this.loader = false;
              this.getBookAppointmentByDoctorID();
              // var entity1 = {
              //   'PatientID': this.selectedAppointment.patientID,
              //   'WalletAmount': this.selectedAppointment.paidAmount
              // }

              // this.DoctorService.UpdatePatientWalletAmountDetailsLoadWallet(entity1).subscribe(data => {
              //   this.loader = false;
              //

              //   console.log(res);

              // }, error => {
              //   this.loader = false;
              //   console.log("Error", error);
              // })
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
              this.DoctorService.GetBookAppointmentByDoctorID(
                this.doctorID,
                this.startdate,
                this.enddate,
                this.languageID
              ).subscribe(async (data) => {
                this.appointmentList = data;
                // .filter(x => x.noShow != 1 && x.docCancelled != 1 && x.cancelled != 1);
                this.loader = false;
                this.count = this.appointmentList.length;
                this.SharedService.sendSms(
                  this.appointmentList[0],
                  this.typeOfAction,
                  1
                );
                this.showPopup = 1;
                this.messageID = 1;
                this.typeofPopUp = 1;
                console.log('AppointmentList', this.appointmentList);
              });
              // this.getBookAppointmentByDoctorID();
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
    } else if (this.typeOfAction == 35) {
      //rejoin call
      Swal.fire({
        title: this.labels.areYouSure,
        text: this.labels.youwanttomark,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#322b6b',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.DoctorService.UpdateVisitedBitByDoctor(
            this.selectedAppointment.appointmentID
          ).subscribe(
            (data) => {
              this.loader = false;
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
    } else if (this.typeOfAction == 36) {
      //rejoin call

      Swal.fire({
        title: this.labels.areYouSure,
        text: this.labels.receivedAmount,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#322b6b',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.DoctorService.UpdateAmountReceived(
            this.selectedAppointment.appointmentID,
            1
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
    } else if (this.typeOfAction == 50) {
      this.typeID = 50;
      this.followupModal.show();
    } else if (this.typeOfAction == 16) {
      this.formModal.show();
      this.typeID = 16;
    } else if (this.typeOfAction == 24) {
      this.formModal.show();
      this.typeID = 24;
    }
  }

  closeModal() {
    this.formModal.show();
    this.followupModal.hide();
    this.typeID = 0;
  }

  dateList: any;
  serverTime: any;
  serverDate: any;
  public getServerDate() {
    this.DoctorService.GetServerDateAndTime().subscribe(
      (data) => {
        this.dateList = data;
        this.serverTime = this.dateList.presentTime;
        this.serverDate = this.dateList.todaydate;
        // this.availabletime = this.dateList.presentTime,
        // this.checktime = this.dateList.presentTime
      },
      (error) => {}
    );
  }

  //start early call

  startEarlyVideoCall(details: any) {
    if (details.completed == 2) {
      Swal.fire(this.labels.sessionEnded);
    } else {
      sessionStorage.setItem('Details', btoa(JSON.stringify(details)));
      window.open('#/VideoCall', '_blank');
    }
  }

  async normalVideoCall(details: any) {
    debugger;
    this.showPopup = 0;
    this.getServerDate();
    console.log('avc', this.serverTime);
    console.log('avc', this.serverDate);

    if (details.completed == 2) {
      Swal.fire(this.labels.sessionEnded);
    } else {
      if (this.serverDate == details.appdate) {
        this.showPopup = 0;
        if (this.serverTime >= details.slots.replace(/\s/g, '')) {
          this.showPopup = 0;

          if (this.serverTime <= details.endTime) {
            sessionStorage.setItem('Details', btoa(JSON.stringify(details)));
            window.open('#/VideoCall', '_blank');
            // if (details.amountRecieved == 1) {
            //   sessionStorage.setItem("Details", btoa(JSON.stringify(details)))
            //   window.open("#/VideoCall", "_blank");
            // }
            // else {
            //   this.showPopup = 1;
            //   this.messageID = 87;
            //   this.typeofPopUp = 2;
            // }
          } else {
            this.showPopup = 1;
            this.messageID = 81;
            this.typeofPopUp = 2;
          }
        } else {
          this.showPopup = 1;
          this.messageID = 82;
          this.typeofPopUp = 2;
        }
      } else {
        this.showPopup = 1;
        this.messageID = 82;
        this.typeofPopUp = 2;
      }
    }
  }

  async onDemandVideo(details: any) {
    this.showPopup = 0;
    await this.getServerDate();
    if (details.completed == 2) {
      Swal.fire(this.labels.sessionEnded);
    } else {
      if (this.serverDate == details.appdate) {
        this.showPopup = 0;
        if (this.serverTime >= details.slots) {
          this.showPopup = 0;

          if (this.serverTime <= details.endTime) {
            sessionStorage.setItem('Details', btoa(JSON.stringify(details)));
            window.open('#/VideoCall', '_blank');
          } else {
            // this.showPopup = 1;
            // this.messageID = 81;
            // this.typeofPopUp = 2;
          }
        } else {
          // this.showPopup = 1;
          // this.messageID = 82;
          // this.typeofPopUp = 2;
        }
      } else {
        // this.showPopup = 1;
        // this.messageID = 82;
        // this.typeofPopUp = 2;
      }
    }
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
    debugger;
    window.open(pdf, '_blank');
    // location.href = "#/Shared/view/" + btoa(pdf)
  }

  public getDiagnosticReport(reportURl: any) {
    location.href = '#/Shared/view/' + reportURl;
  }
  showimages: any;
  public GetImagesID(id: any) {
    this.loader = true;
    this.DoctorService.GetPatient_Illnessphotos(id).subscribe(
      (data) => {
        this.showimages = data;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  showvedioes: any;

  public GetVedioID(id: any) {
    this.loader = true;
    this.DoctorService.GetPatient_IllnessVedioes(id).subscribe(
      (data) => {
        this.loader = false;
        this.showvedioes = data;
      },
      (error) => {}
    );
  }

  CloseVaccinePopUp(even: any) {
    this.AllergiesModal.hide();
    this.showPopup = 1;
    this.messageID = even;
    this.typeofPopUp = 1;
  }

  GetMedications(details: any) {
    this.DoctorService.GetBookAppointmentByPatientID(
      details.patientID,
      details.appointmentID,
      this.languageID
    ).subscribe(
      (data) => {
        this.patientDetails = data[0];
        this.drugName = data[0].drugName;
        this.dosage = data[0].dosage;
        this.frequency = data[0].frequency;

        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }
  vitalsdetails(id: any) {
    this.DoctorService.GetPatientVitalsByAppID(id).subscribe((res) => {
      this.vitalsObject = res;
      console.log('vitalsObject', this.vitalsObject.length, this.vitalsObject);
      this.scanDate = this.vitalsObject[0].modified;
      this.vitalsData = JSON.parse(res[0].vitalDetails);

      this.vitalSigns = this.vitalsData?.vitalSigns;
      this.holisticHealth = this.vitalsData?.holisticHealth;
      this.cardiovascularRisks = this.vitalsData?.risks?.cardiovascularRisks;
      this.covidRisk = this.vitalsData?.risks?.covidRisk;
    }),
      this.formModal.show();
    this.typeID = 51;
  }

  showmedicalHoistory(re: any) {
    this.viewMedicalHistoryList = re;
  }
  downloadpdf() {
    this.loader = true;
    this.printbutton = true;
    let data = document.getElementById('medicalhistory1');
    html2canvas(data!).then((canvas) => {
      this.loader = true;
      const imgWidth = 190;
      const pageHeight = 275;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;
      heightLeft -= pageHeight - 20;
      const doc = new jspdf('p', 'mm');
      doc.addImage(
        canvas,
        'PNG',
        10,
        position,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      );
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        doc.addPage();
        doc.addImage(
          canvas,
          'PNG',
          10,
          position,
          imgWidth,
          imgHeight,
          '',
          'FAST'
        );
        heightLeft -= pageHeight - 20;
      }
      doc.save('referral.pdf');
      location.reload();
      console.log(doc);
      this.loader = false;
    });
  }

  location: any;

  getlocatin(address: any) {
    this.location = address;
  }
  sub: any;
  emaildesc: any;
  cclist: any = [];
  bcclist: any = [];
  sendCancelEmail() {
    debugger;
    this.emaildesc = `Doctor ${this.doctorName} cancelled yout Appointmet`;
    var entity = {
      emailto: this.pEmail,
      emailsubject: this.sub,
      emailbody: this.emaildesc,
      attachmenturl: '',
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
  sendAdminCancelEmail() {
    debugger;
    this.emaildesc = `Doctor ${this.doctorName} cancelled yout Appointmet`;
    var entity = {
      emailto: 'emmanuel@meridionalhealth.com',
      emailsubject: this.sub,
      emailbody: this.emaildesc,
      attachmenturl: '',
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
  sendAdmin1CancelEmail() {
    debugger;
    this.emaildesc = `Doctor ${this.doctorName} cancelled yout Appointmet`;
    var entity = {
      emailto: 'haja.ranaivoarissoa@voiladoc.mg',
      emailsubject: this.sub,
      emailbody: this.emaildesc,
      attachmenturl: '',
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
  paidStatue: boolean = false;
  public insertpaymentDetails() {
    debugger;
    this.loader = true;
    this.paidStatue == true;
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
}
