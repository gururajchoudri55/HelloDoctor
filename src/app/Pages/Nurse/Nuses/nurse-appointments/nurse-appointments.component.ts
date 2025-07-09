import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Nurse/nurselabels.json';



declare var window: any;
@Component({
  selector: 'app-nurse-appointments',
  templateUrl: './nurse-appointments.component.html',
  styleUrls: ['./nurse-appointments.component.css']
})
export class NurseAppointmentsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader: boolean | undefined;
  nurseID: any;
  languageID: any;
  user: any;
  appointmentList: any;
  term: any;
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
  labels: any;


  constructor(private NurseService: NurseService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;

    this.formModal = new window.bootstrap.Modal(
      document.getElementById("staticBackdrop")
    )


    const format2 = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale1 = 'en-US';
    this.todaydate = formatDate(myDate, format2, locale1);

    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);



    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale2 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale2);

    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);
    this.nurseID = sessionStorage.getItem('nurseid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.user = sessionStorage.getItem('user');

    this.bsRangeValue = [start, end];


    this.oberserableTimer();


  }

  oberserableTimer() {
    const source = timer(1000, 4000);
    const abc = source.subscribe(val => {

      this.getNurseList();
    })

  }


  public getNurseList() {
    this.NurseService.GetBook_Nurse_Appointment(this.nurseID, this.startdate, this.enddate, this.languageID).subscribe(
      data => {

        this.appointmentList = data;
        this.count = this.appointmentList.length;
        console.log("list", this.appointmentList)
        this.loader = false;
      }, error => {
        this.loader = false;
      }
    )
  }


  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.NurseService.GetDates(data[0]);
    this.enddate = this.NurseService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.getNurseList();

  }









  //Accept reject


  getDetails(details: any, typeID: any) {


    this.selectedAppointment = details;

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
        confirmButtonText: this.labels.confirmbutton,
        cancelButtonText: this.labels.cancelbutton
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.NurseService.UpdateBook_Nurse_AppointmentAcceptedBit(this.selectedAppointment.id).subscribe(async res => {
            let test = res;


            await this.SharedService.sendNuseSms(this.selectedAppointment, this.typeID, 1)

            this.showPopup = 1;
            this.messageID = 50;
            this.typeofPopUp = 1;
            this.loader = false;
            this.getNurseList()
          }, error => {
            this.loader = false;
          })

        }
      })
    }
    else if (this.typeID == 2) {
      // Cancel Call 
      Swal.fire({
        title: this.labels.reasonfor,
        html: `<input type="text" id="Reason" class="swal2-input"  placeholder="Raison de l'annulation">`,
        confirmButtonText: this.labels.submit,
        focusConfirm: false,
        preConfirm: () => {
          
          this.loader = true;
          const Reason: any = document.getElementById('Reason') as HTMLElement
          var entity = {
            'ID': this.selectedAppointment.id,
            'ReasonForCancel': Reason.value
          }
          this.NurseService.UpdateBook_Nurse_AppointmentReasonForCancelBit(entity).subscribe(async res => {
            let test = res;

            
            console.log(res);
            this.showPopup = 1;
            this.messageID = 51;
            this.typeofPopUp = 1;
            await this.SharedService.sendNuseSms(this.selectedAppointment, this.typeID, 1)
            this.getNurseList()
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
      this.NurseService.GetBookAppointment_NurseServices(this.selectedAppointment.id).subscribe(
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
        text: this.labels.thePatient,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmbutton,
        cancelButtonText: this.labels.cancelbutton
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.NurseService.UpdateBook_Nurse_AppointmentVisitedBit(this.selectedAppointment.id).subscribe(async res => {
            let test = res;

            await this.SharedService.sendNuseSms(this.selectedAppointment, this.typeID, 1)
            this.showPopup = 1;
            this.messageID = 65;
            this.typeofPopUp = 1;
            this.getNurseList()
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
        text: this.labels.patientNotVisit,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmbutton,
        cancelButtonText: this.labels.cancelbutton
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.NurseService.UpdateBook_Nurse_AppointmentNotVisitedBit(this.selectedAppointment.id).subscribe(async res => {
            let test = res;
            await this.SharedService.sendNuseSms(this.selectedAppointment, this.typeID, 1)

            this.showPopup = 1;
            this.messageID = 58;
            this.typeofPopUp = 1;
            this.loader = false;
            this.getNurseList()

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
          this.NurseService.UpdateRefundForHomeCare(this.selectedAppointment.id, 1).subscribe(async res => {
            let test = res;
            await this.SharedService.sendNuseSms(this.selectedAppointment, this.typeID, 1)
            this.showPopup = 1;
            this.messageID = 65;
            this.typeofPopUp = 1;
            this.getNurseList()
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
    this.NurseService.UploadPatientDocuments(this.files1, folder).subscribe(res => {
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
      'NPMID': this.nurseID,
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
      'TypeID': 1
    }
    this.NurseService.InsertNPM_PatientSoapNotesWeb(entity).subscribe(async (data: any) => {

      if (data != 0) {
        await this.SharedService.sendNuseSms(this.selectedAppointment, this.typeID, 1)
        this.messageID = 1;
        this.showPopup = 1;
        this.typeofPopUp = 1
        this.loader = false;
        this.formModal.hide();
        this.getNurseList()

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
        this.NurseService.UpdateAmountReceived(app.id, 2).subscribe(data => {
          this.loader = false;

          
          this.SharedService.sendSms(this.selectedAppointment, type, 1);
          console.log(data);
          this.showPopup = 1;
          this.messageID = 53;
          this.typeofPopUp = 1;
          this.getNurseList();
        }, error => {

        })
      }
    })
  }

}
