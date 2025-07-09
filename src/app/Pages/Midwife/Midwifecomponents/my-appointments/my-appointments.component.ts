import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { MidwifeService } from 'src/app/Pages/services/midwife.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Midwife/midwifelables.json';

declare var window: any;
@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader: boolean | undefined;
  midWifeID: any;
  languageID: any;
  user: any;
  appointmentList: any;
  selectedAppointment: any;
  typeID: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  formModal: any;
  serviceName: any;
  Services: any;
  count: any;
  subjective: any;
  objective: any;
  assement: any;
  plan: any;
  followUpPlan: any;
  signature: any;
  notes: any;
  todaydate: any;
  p: any;
  term: any;
  labels: any;


  constructor(private MidwifeService: MidwifeService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("staticBackdrop")
    )

    this.midWifeID = sessionStorage.getItem('midwifeid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.user = sessionStorage.getItem('user');
    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);

    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);

    this.bsRangeValue = [start, end];

    this.oberserableTimer()

  }

  oberserableTimer() {
    const source = timer(1000, 4000);
    const abc = source.subscribe(val => {

      this.getmidwifeappointments();
    })

  }

  public getmidwifeappointments() {
    this.MidwifeService.GetBook_Book_Midwives_Appointment(this.midWifeID, this.startdate, this.enddate, this.languageID).subscribe(
      data => {

        this.appointmentList = data;
        this.count = this.appointmentList.length;
        this.loader = false;


        console.log("appointmentList", this.appointmentList)
      }, error => {
        this.loader = false;
      }
    )
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.MidwifeService.GetDates(data[0]);
    this.enddate = this.MidwifeService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);

    this.getmidwifeappointments();

  }









  //Accept reject


  getDetails(details: any, typeID: any) {


    this.selectedAppointment = details;

    console.log("selected", this.selectedAppointment)
    this.typeID = typeID;
    this.doSomething()
  }




  doSomething() {

    this.typeofPopUp = 0;
    this.showPopup = 0;

    // Accept
    if (this.typeID == 1) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.MidwifeService.UpdateBook_Midwives_AppointmentAcceptedBit(this.selectedAppointment.id).subscribe(async res => {
            let test = res;
            await this.SharedService.sendMidwifeSMs(this.selectedAppointment, this.typeID, 1)
            this.showPopup = 1;
            this.messageID = 50;
            this.typeofPopUp = 1;
            this.loader = false;
            this.getmidwifeappointments()
          }, error => {
            this.loader = false;
          })

        }
      })
    }
    else if (this.typeID == 2) {
      // Cancel Call 
      Swal.fire({
        title: "Reason For Cancel",
        html: `<input type="text" id="Reason" class="swal2-input"  placeholder="Reason For Cancel">`,
        confirmButtonText: 'Submit',
        focusConfirm: false,
        preConfirm: () => {
          
          this.loader = true;
          const Reason: any = document.getElementById('Reason') as HTMLElement
          
          var entity = {
            'ID': this.selectedAppointment.id,
            'ReasonForCancel': Reason.value
          }
          this.MidwifeService.UpdateBook_Midwives_AppointmentReasonForCancel(entity).subscribe(async res => {
            
            let test = res;
            
            console.log(res);
            this.showPopup = 1;
            this.messageID = 51;
            this.typeofPopUp = 1;
            // await this.SharedService.sendMidwifeSMs(this.selectedAppointment, this.typeID, 1)
            this.getmidwifeappointments()
            this.loader = false;
          }, error => {
            this.loader = false;
            console.log("Error", error);
          })
        }

      })
    }
    else if (this.typeID == 3) {
      // services
      this.loader = true;
      this.serviceName == '';
      this.MidwifeService.GetBookAppointment_MidwifeServices(this.selectedAppointment.id).subscribe(
        data => {
          this.formModal.show();
          
          this.Services = data;
          for (let i = 0; i < this.Services.length; i++) {
            if (this.serviceName == '') {
              this.serviceName = this.Services[i].serviceName
            }
            else {
              this.serviceName = ',' + this.Services[i].serviceName
            }
          }
          this.loader = false;
        }, error => {
          this.loader = false;
        }
      )
    }
    else if (this.typeID == 4) {
      //visited
      Swal.fire({
        title: this.labels.title,
        text: this.labels.text1,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.MidwifeService.UpdateBook_Midwives_AppointmentIsVisitedBit(this.selectedAppointment.id).subscribe(async res => {
            let test = res;

            await this.SharedService.sendMidwifeSMs(this.selectedAppointment, this.typeID, 1)
            this.showPopup = 1;
            this.messageID = 65;
            this.typeofPopUp = 1;
            this.getmidwifeappointments()
            this.loader = false;
          }, error => {
            this.loader = false;
          })

        }
      })
    }
    else if (this.typeID == 5) {
      //not visited
      Swal.fire({
        title: this.labels.title,
        text: this.labels.text2,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.MidwifeService.UpdateBook_Midwives_AppointmentNotVisitedBit(this.selectedAppointment.id).subscribe(async res => {
            let test = res;
            await this.SharedService.sendMidwifeSMs(this.selectedAppointment, this.typeID, 1)

            this.showPopup = 1;
            this.messageID = 58;
            this.typeofPopUp = 1;
            this.loader = false;
            this.getmidwifeappointments()

          }, error => {
            this.loader = false;
          })

        }
      })
    }

    else if (this.typeID == 6) {
      //Soap Notes
      if (this.languageID == 1) {
        this.signature = 'Electronically signed by ' + this.user + ' ' + this.todaydate;
      }
      else if (this.languageID == 6) {
        this.signature = 'Signature électronique du ' + this.user + ' ' + this.todaydate;
      }

      this.formModal.show()
    }
    else if (this.typeID == 7) {
      this.formModal.show()
    }
    else if (this.typeID == 10) {
      //visited
      Swal.fire({
        title: this.labels.title,
        text: this.labels.refundAmount,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmbutton,
        cancelButtonText: this.labels.cancelbutton
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.MidwifeService.UpdateRefundForHomeCare(this.selectedAppointment.id, 3).subscribe(async res => {
            let test = res;
            await this.SharedService.sendMidwifeSMs(this.selectedAppointment, this.typeID, 1)
            this.showPopup = 1;
            this.messageID = 65;
            this.typeofPopUp = 1;
            this.loader = false;
          }, error => {
            this.loader = false;
          })

        }
      })
    }

  }









  files1: File[] = [];
  attchmentUrl: any = [];
  onSelectAttchment(event: any) {
    this.loader = true;
    this.showPopup = 0;
    console.log(event);
    
    this.files1.push(...event.addedFiles);
    this.uploadAttachments()
  }


  public uploadAttachments() {
    let folder = this.selectedAppointment.patientID + '/' + 'SoapNotes'
    this.MidwifeService.UploadPatientDocuments(this.files1, folder).subscribe(res => {
      this.attchmentUrl.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    }, error => {

    })
    // this.sendattachment();
  }

  onAttachmentRemove(event: any) {
    console.log(event);
    this.attchmentUrl.splice(this.files1.indexOf(event), 1);
  }
















  //SOap Notes



  public insertSOapNotes() {
    this.loader = true;
    this.showPopup = 0;
    var entity = {
      'NPMID': this.midWifeID,
      'PatientID': this.selectedAppointment.patientID,
      'AppointmentID': this.selectedAppointment.id,
      'AppointmentDate': new Date(),
      'Subjective': this.subjective,
      'Objective': this.objective,
      'Assessment': this.assement,
      'Plan': this.plan,
      'FollowUpPlan': this.followUpPlan,
      'DiagnosisCode': "",
      'Notes': this.notes,
      'LanguageID': this.languageID,
      'ICRCode': "",
      'ICRDescription': "",
      'ICRID': "",
      'AttachmentUrl': this.attchmentUrl[0],
      'Signature': this.signature,
      'TypeID': 3
    }
    this.MidwifeService.InsertNPM_PatientSoapNotesWeb(entity).subscribe(async (data: any) => {

      if (data != 0) {
        await this.SharedService.sendMidwifeSMs(this.selectedAppointment, this.typeID, 1)
        this.messageID = 1;
        this.showPopup = 1;
        this.typeofPopUp = 1
        this.loader = false;
        this.formModal.hide();
        this.getmidwifeappointments()

      }

    }, error => {
      this.loader = false;
    }
    )
  }

  location: any;


  getlocatin(address: any) {
    this.location = address;
  }

  // Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }



  showLoader() {
    this.loader = true;

  }

  closeReceipt(messageID: any) {
    this.showPopup = 1;
    this.typeofPopUp = 1;
    this.messageID = messageID;
    this.formModal.hide();
    this.loader = false;
  }




  updateReceived(app: any, type: number) {
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
        this.MidwifeService.UpdateAmountReceived(app.id, 4).subscribe(data => {
          this.loader = false;

          
          this.SharedService.sendSms(this.selectedAppointment, type, 1);
          console.log(data);
          this.showPopup = 1;
          this.messageID = 53;
          this.typeofPopUp = 1;
          this.getmidwifeappointments();
        }, error => {

        })
      }
    })
  }
}
