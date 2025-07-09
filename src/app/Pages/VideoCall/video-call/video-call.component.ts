import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PublisherComponent } from '../../../Pages/VideoCall/publisher/publisher.component';
import { SubscriberComponent } from '../../../Pages/VideoCall/subscriber/subscriber.component';
import { OpentokService } from '../opentok.service';
import config from '../../../config';
import { VideocallService } from '../videocall.service';
declare var window: any;
import Labels from '../../Lables/Doctors/myAppointments.json';
import { SharedService } from '../../services/shared.service';
import { Observable, timer } from 'rxjs';
import { DoctorService } from '../../services/Doctor/doctor.service';


@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})

export class VideoCallComponent implements OnInit {
  interval: any;
  typeOfAction: any;
  typeofPopUp: any;
  messageid: any;
  showPopup: any;
  uploadDocuments: any;
  messageID: any;
  dosage: any;
  frequency: any;
  width: any;
  height: any;
  showGeneratePdf: any;
  countDownDate: any;
  FileURL1: any;
  diagnostic: any;
  chatcount: any;
  chatID: any;
  currentUrl: any;
  vitalSigns: any;
  holisticHealth: any;
  cardiovascularRisks: any;
  covidRisk: any;
  scanDate: any;
  viewMedicalHistoryList: any;
  constructor(private ref: ChangeDetectorRef, public opentokService: OpentokService, private VideocallService: VideocallService, private SharedService: SharedService, private DoctorService: DoctorService) {
    this.changeDetectorRef = ref;
  }
  session: OT.Session | undefined;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef | undefined | any;



  doctorID: any;
  patientID: any;
  appointmentID: any;
  showclosebutton: any;
  archiveID: any;
  compltedlist: any;
  play: any;
  count: any;
  time: any;
  selectedAppointment: any;
  object: any;
  languageID: any;
  patientDetails: any;
  formModal: any;
  sendSelectedDetails: any = [];
  drugName: any;
  labels: any;
  treament: any;
  vitalsObject: any;
  vitalsData: any;
  referallist: any;
  ngOnInit(): void {
    this.loader = true;
    this.camera = 1;
    this.audio = 2;
    this.width = "118%";
    this.height = "750px"
    sessionStorage.setItem("height", "750px");
    sessionStorage.setItem("width", "118%");
    // 
    this.sendSelectedDetails.length = 0;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("staticBackdrop")
    )
    this.treament = new window.bootstrap.Modal(
      document.getElementById("treatment")
    )

    this.showGeneratePdf = new window.bootstrap.Modal(
      document.getElementById("generatePDF")
    )


    this.object = sessionStorage.getItem("Details");
    this.object = atob(this.object)
    

    
    
    this.selectedAppointment = JSON.parse(this.object);

    // this.sendSelectedDetails.push(this.selectedAppointment);
    console.log("sendSelectedDetails", this.sendSelectedDetails);
    console.log("selected Appointment", this.selectedAppointment)
    
    document.getElementById("vidiv")!.classList.remove('col-lg-10');
    document.getElementById("vidiv")!.classList.add("col-lg-12");


    let vidiv = document.getElementById("vidiv") as HTMLElement;
    vidiv.style.height = "100vh";


    
    let vidpagehead = document.getElementById("vidpagehead") as HTMLElement;
    vidpagehead.style.display = "none";

    let sidbarid = document.getElementById("sidbarid") as HTMLElement;
    sidbarid.style.display = "none";




    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.appointmentID = this.selectedAppointment.appointmentID
    this.doctorID = this.selectedAppointment.doctorID
    this.patientID = this.selectedAppointment.patientID

    var countDownDate = new Date().getTime();
    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = now - countDownDate;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      document.getElementById("demo")!.innerHTML = minutes + "m " + seconds + "s ";

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo")!.innerHTML = "EXPIRED";
      }
    }, 1000);

    this.opentokService.getsessionandtoken().subscribe((res: any) => {
      
      this.loader = true;
      config.SESSION_ID = res['sessionid'];
      config.TOKEN = res['token'];

      this.insertvedioeconferencedetails();

      this.VideocallService.UpdateAlertbit(this.appointmentID).subscribe(
        data => {
          this.SharedService.sendSms(this.selectedAppointment, 45, 1)
        }, error => {
          this.loader = false;
        }
      )
    }, error => {

      

    })


    this.oberserableTimer();

    this.vitalsdetails(this.appointmentID);
  }


  vitalsdetails(id: any) {
    ;
    this.VideocallService.GetPatientVitalsByAppID(id).subscribe(res => {
      this.vitalsObject = res;
      console.log('vitalsObject', this.vitalsObject.length, this.vitalsObject)
      this.scanDate = this.vitalsObject[0].modified;
      this.vitalsData = JSON.parse(res[0].vitalDetails)

      this.vitalSigns = this.vitalsData?.vitalSigns;
      this.holisticHealth = this.vitalsData?.holisticHealth;
      this.cardiovascularRisks = this.vitalsData?.risks?.cardiovascularRisks;
      this.covidRisk = this.vitalsData?.risks?.covidRisk;


    })


  }
  oberserableTimer() {

    const source1 = timer(1000, 2000);
    const abc1 = source1.subscribe(val => {
      this.showPopup = 0;
      this.dosendmsg();
      this.endsession();
    })
  }


  public insertvedioeconferencedetails() {
    
    var entity = {
      'DoctorID': this.doctorID,
      'PatientID': this.patientID,
      'AppointmentID': this.appointmentID,
      'Token': config.TOKEN,
      'SessionID': config.SESSION_ID
    }
    this.VideocallService.InsertBook_DoctorPatientBookedVideoConference(entity).subscribe((data: any) => {
      ;
      if (data != 0) {
        this.opentokService.initSession().then((session: OT.Session) => {
          this.session = session;

          this.session.on('streamCreated', (event) => {
            ;
            this.streams.push(event.stream);
            this.showclosebutton = 1;

            document.getElementById('stoprecoring')!.style.display = 'block';

            // document.getElementById('stoprecoring_forshow').style.display = 'none';

            this.startarchive();
            this.changeDetectorRef.detectChanges();
          });
          this.session.on('streamDestroyed', (event) => {
            this.stoparchive();
            const idx = this.streams.indexOf(event.stream);

            if (idx > -1) {
              this.streams.splice(idx, 1);
              this.changeDetectorRef.detectChanges();
            }
          });
          this.session.on('archiveStarted', (event) => {

            this.archiveID = event.id;
            this.updatearchiveid(this.archiveID);
          });
          this.session.on('archiveStopped', (event) => {
            ;

            this.archiveID = event.id;

          });
        })
          .then(() => this.opentokService.connect())
          .catch((err) => {
            console.error(err);
            alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
          });
      }
      else {
        this.updatearchiveid(this.archiveID)

        this.opentokService.initSession().then((session: OT.Session) => {
          this.session = session;
          this.session.on('streamCreated', (event) => {
            this.streams.push(event.stream);
            this.showclosebutton = 1;
            document.getElementById('stoprecoring')!.style.display = 'block';
            // document.getElementById('stoprecoring_forshow').style.display = 'none';
            this.startarchive();

            this.changeDetectorRef.detectChanges();
          });
          this.session.on('streamDestroyed', (event) => {
            ;
            this.stoparchive();


            const idx = this.streams.indexOf(event.stream);
            if (idx > -1) {
              this.streams.splice(idx, 1);
              this.changeDetectorRef.detectChanges();
            }
          });
          this.session.on('archiveStarted', (event) => {

            this.archiveID = event.id;
            this.updatearchiveid(this.archiveID);
          });
          this.session.on('archiveStopped', (event) => {

            this.archiveID = event.id;
          });
        })
          .then(() => this.opentokService.connect())
          .catch((err) => {

            console.error(err);
            alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
          });

      }
    })

    this.getPatientDetails();
  }





  public startarchive() {
    this.play = true;
    this.interval = setInterval(() => {
      this.time++;
    }, 1000)
      ;
    this.opentokService.startArchive().subscribe(res => {
      ;
      let result = JSON.parse(res.toString());
      
      console.log(result)
      this.archiveID = result.id;
    })

  }


  public updatearchiveid(archiveID: any) {

    var entity = {
      'DoctorID': this.doctorID,
      'PatientID': this.patientID,
      'AppointmentID': this.appointmentID,
      'ArchiveID': archiveID,
      'Token': config.TOKEN,
      'SessionID': config.SESSION_ID
    }
    this.VideocallService.UpdateBook_DoctorPatientBookedVideoConference(entity).subscribe(res => {

    })
  }





  //patient Details
  allergies: any;
  genderid: any;
  gender: any;
  photoexist: any;
  videoexist: any
  reportURl: any;
  getPatientDetails() {
    this.VideocallService.GetBookAppointmentByPatientID(this.patientID, this.appointmentID, this.languageID).subscribe(data => {
      this.patientDetails = data[0];
      this.drugName = data[0].drugName;
      this.dosage = data[0].dosage;
      this.frequency = data[0].frequency;
      this.allergies = data[0].knownAllergies,
        this.genderid = data[0].genderID,
        this.gender = data[0].gender,
        this.photoexist = data[0].photoexist,
        this.videoexist = data[0].videoexist,
        this.reportURl = data[0].reportUrl


      this.loader = false;
    }, error => {
      this.loader = false;
    })

  }













  endsession() {

    this.VideocallService.GetVideoStatus(this.appointmentID).subscribe(res => {
      this.compltedlist = res;
      if (this.compltedlist[0].completed == 2 && this.compltedlist[0].endSessionStatus == 'Patient') {
        this.count = this.count + 1
        alert('Patient Ended The Call');
        window.close();
      }

    })
  }

  // End Session

  public stoparchive() {

    this.VideocallService.GetVideoStatus(this.appointmentID).subscribe(res => {
      this.compltedlist = res;
      if (this.compltedlist[0].completed == 2 && this.compltedlist[0].endSessionStatus == 'Patient') {
        this.count = this.count + 1
        alert('Patient Ended The Call');
        window.close();
      }
      else {
        this.VideocallService.GetBookAppointmentCompletedSession(this.appointmentID).subscribe(
          data => {

            window.close();

          }, error => {
          }
        )
      }
    })



    this.opentokService.stoparchive(this.archiveID).subscribe(res => {

      let result = res;
      this.opentokService.disconnect_1();
      document.getElementById('stoprecoring')!.style.display = 'none';
      // document.getElementById('viewrecoring').style.display = 'block';
      document.getElementById('subscibre')!.style.display = 'none';

      window.close();
    })



  }


  public closewindow() {
    
    this.VideocallService.UpdateAlertBitsBack(this.appointmentID).subscribe(
      async data => {
        
        this.SharedService.sendSms(this.selectedAppointment, 46, 1)
        
        this.stoparchive()
      }, error => {
      }
    )

  }






  typeID: any;

  getTypeID(even: any) {
    this.sendSelectedDetails.length = 0;
    // sessionStorage.setItem("height", "750px");
    // sessionStorage.setItem("width", "60%");
    
    this.typeID = 0;
    this.typeID = even;
    this.selectedAppointment = this.selectedAppointment

    console.log("details1", this.sendSelectedDetails);


    if (this.typeID == 1 || this.typeID == 2 || this.typeID == 3 || this.typeID == 4 || this.typeID == 5 || this.typeID == 26 || this.typeID == 27) {
      this.formModal.show();
      console.log("details", this.selectedAppointment);


    }
    else if (this.typeID == 10) {
      //Previous Prescriptions
      
      this.formModal.show();
      this.typeOfAction = 10;
    }
    else if (this.typeID == 11) {
      //Previous Diagnostic Tests
      
      this.formModal.show();
      this.typeOfAction = 11;
    }
    else if (this.typeID == 12) {
      //Previous SOap Notes
      
      this.formModal.show();
      this.typeOfAction = 12;
    }
    else if (this.typeID == 13) {
      //Previous Medical Certificate
      
      this.formModal.show();
      this.typeOfAction = 13;
    }

  }



  // child pop ups


  loader: boolean | undefined
  close(messageid: any) {
    this.formModal.hide();
    // this.uploadDocuments.hide();
    this.showPopup = 1;
    this.messageID = messageid
    this.typeofPopUp = 1
    this.loader = false;
    this.typeID = 0;
  }

  Message(messageid: any) {
    this.showPopup = 1;
    this.messageID = messageid
    this.typeofPopUp = 1
    this.loader = false;
  }
  closeDocumentsModal() {
    this.formModal.hide()
  }

  showLoader() {
    this.loader = true;
  }

  StopLoader() {
    this.loader = false;
  }
  closeModal() {
    // this.formModal.show();
    this.formModal.hide();
    // this.followupModal.hide();
    this.typeID = 0;
  }


  medicalQuestinare() {
    this.typeID = 16;
    this.formModal.show();
    this.typeOfAction = 13;
  }

  treatment() {
    this.typeID = 25;
    this.formModal.show();
    this.typeOfAction = 25;
  }

  Vitals() {
    this.typeID = 28;
    this.formModal.show();
    this.typeOfAction = 28;
  }

  chat() {
    this.typeID = 20;
    this.selectedAppointment = this.selectedAppointment
  }



  closechatMessage() {
    
    this.typeID = 0;
  }




  showTreatment() {
    this.treament.show();
  }

  checkedList: any = []

  sendEmail(array: any) {
    
    this.formModal.hide();
    this.typeID = 18;
    this.checkedList = array;
    this.showGeneratePdf.show();
    
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
    this.showPopup = 1
    this.typeofPopUp = 1;
    this.messageID = even;
    this.loader = false;

  }



  public getDiagnosticReport() {
    location.href = "#/Shared/view/" + btoa(this.reportURl)

  }

  showimages: any;


  public GetImagesID() {
    this.VideocallService.GetPatient_Illnessphotos(this.appointmentID).subscribe(
      data => {

        this.showimages = data;

      }, error => {
      }
    )
  }

  showvedioes: any;

  public GetVedioID() {
    this.VideocallService.GetPatient_IllnessVedioes(this.appointmentID).subscribe(
      data => {

        this.showvedioes = data;

      }, error => {
      }
    )
  }

  public getReport(pdf: any) {
    location.href = "#/Shared/view/" + btoa(pdf)

  }



  CloseVaccinePopUp(even: any) {
    this.formModal.hide();
    this.showPopup = 1;
    this.messageID = even;
    this.typeofPopUp = 1

  }



  camera: any;
  audio: any;

  //camera controls
  switchOffCamera(type: any) {
    this.camera = 3
    this.opentokService.SwitchonCamera(type)
  }

  SwitchOnCamera(type: any) {
    this.camera = 1;
    this.opentokService.SwitchonCamera(type)
  }

  turnOffAudio(type: any) {
    this.audio = 4;
    this.opentokService.SwitchonCamera(type)
  }

  turnOnAudio(type: any) {
    this.audio = 2;
    this.opentokService.SwitchonCamera(type)
  }

  public getDiagnosticReportlab() {
    ;
    this.VideocallService.GetPatient_DiagnosticUploadsByDoctorIDPatientID(this.doctorID, this.patientID).subscribe(
      data => {

        this.FileURL1 = data[0].fileURL1;
        for (let i = 0; i < data.length; i++) {
          let fjkjhafd = data[i].fileURL1.split('.');
          let one = fjkjhafd[fjkjhafd.length - 2].split('/');
          var re = /\\/gi;
          var path2 = one[one.length - 1].replace(/\\/g, "-");
          let two = path2.split('-');
          data[i].docname = two[two.length - 2];
          if (fjkjhafd[fjkjhafd.length - 1] == 'pdf') {
            this.diagnostic = true
            console.log('diagnostic', this.diagnostic)
          }
          if (fjkjhafd[fjkjhafd.length - 1] == 'png' || fjkjhafd[fjkjhafd.length - 1] == 'jpg') {
            this.diagnostic = false
            console.log('diagnostic', this.diagnostic)
          }

        }


      }, error => {
      }
    )
  }
  public GetPdf() {
    ;
    location.href = "#/Shared/view/" + btoa(this.FileURL1)

  }


  public dosendmsg() {
    
    var entity = {
      'DoctorID': this.doctorID,
      'PatientID': this.patientID,
      'AppointmentID': this.appointmentID
    }
    this.DoctorService.InsertChatMaster(entity).subscribe(data => {
      
      if (data != 0) {
        this.chatID = data;
        console.log("chat ID", this.chatID)
        this.getPreviousChat();

      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertChatMaster", error);
    })


  }
  public getPreviousChat() {
    
    this.VideocallService.GetDoctor_ChatDetailsMobileWeb(this.chatID).subscribe(res => {
      
      let Chatconversation = res;
      this.chatcount = Chatconversation.length;
      console.log('Chatconversation', Chatconversation);
      // this.coversationarray.length = 0; 
    })

  }

  referralhistory() {
    
    this.typeID = 29;
    this.formModal.show();
    this.typeOfAction = 29;
    this.VideocallService.GetPatientReferalHistory(this.patientID, this.languageID).subscribe(
      data => {
        this.referallist = data
      }, error => {
      }
    )
  }
  showmedicalHoistory(re:any){
    
    this.viewMedicalHistoryList = re;

  }

}
