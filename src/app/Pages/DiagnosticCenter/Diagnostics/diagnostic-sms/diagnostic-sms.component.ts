import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { CommonService } from '../../../services/common.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-diagnostic-sms',
  templateUrl: './diagnostic-sms.component.html',
  styleUrls: ['./diagnostic-sms.component.css']
})
export class DiagnosticSmsComponent implements OnInit {
  clickNurseEventSUbscription: Subscription | undefined
  constructor(private SharedService: SharedService, private CommonService: CommonService) { }

  languageID: any;
  smsMobileNo: any;
  emailSubject: any;
  smsDesc: any;
  user: any;

  ngOnInit(): void {
    this.user = sessionStorage.getItem('user');
    this.languageID = sessionStorage.getItem('LanguageID');
    // this.clickNurseEventSUbscription = this.SharedService.getDiagnosticSMS().subscribe(data => {
    //   console.log(data);
    //   // alert("Nurse Sms Called")
    //   // debugge

    //   this.doSomething(data)
    //   // this.SharedService.diagnosticOnDestory()


    // })
  }

  async doSomething(data: any) {

    if (this.languageID == 1) {
      if (data.typeID == 1||data.typeID==9) {
        this.smsDesc = "Your appointment with " + this.user + " on " + data.list.slotName + "  has been confirmed and is being processed. You will receive an update soon."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Appointment confirmed"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
     else if (data.typeID == 2) {
        this.smsDesc = "We regret but your appointment with " + this.user + " on " + data.list.notificationdate + "  has not been accepted. Type : Home sample collection. "
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Appointment Cancelled"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 5) {
        this.smsDesc = "The lab has sent your test report. Please open Voiladoc app and book with your doctor if you require further consultation."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Lab Report"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 6) {
        this.smsDesc = "The lab has responded with price. Please open the Voiladoc app to view and confirm."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Lab Sent Price"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
    }
    else {
      if (data.typeID == 1||data.typeID==9) {
        this.smsDesc = "Votre RDV avec " + this.user + " le " + data.list.slotName + "  a été confirmé et est en cours de traitement. Vous recevrez bientôt une mise à jour."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Rendez-vous confirmé"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 2) {
        this.smsDesc = "Votre RDV avec " + this.user + " le " + data.list.slotName + "  a été confirmé et est en cours de traitement. Vous recevrez bientôt une mise à jour."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Rendez-vous annulé"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);

      }
      else if (data.typeID == 5) {
        this.smsDesc = "Le laboratoire a envoyé votre rapport de test. Veuillez ouvrir l'application Voiladoc et réserver avec votre médecin si vous avez besoin d'une consultation supplémentaire"
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Rapport de laboratoire"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 6) {
        this.smsDesc = "Le laboratoire a répondu avec des prix. Veuillez ouvrir l'application Voiladoc pour voir et confirmer."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Prix envoyé au laboratoire"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
    }
  }




  async sendingSMS(data: any) {
    
    // return true;
    this.CommonService.SendTwillioSMS(this.smsMobileNo, this.smsDesc).subscribe(async data => {
      console.log("Sms success", data)
      return true;


    }, error => {
      console.log("sms failure", error)
    })

  }






  emailattchementurl: any = [];
  cclist: any = [];
  bcclist: any = [];

  public async sendEmail(data: any) {
    var entity = {
      'emailto': data.list.emailID,
      'emailsubject': this.emailSubject,
      'emailbody': this.smsDesc,
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.CommonService.sendemail(entity).subscribe(async data => {
      console.log("email respone", data);
    }, error => {
      console.log("email respone", data);
    })
  }

  public async notification(data: any) {
    var entity = {

      'PatientID': data.list.patientID,
      'Notification': this.emailSubject,
      'Description': this.smsDesc,
      'NotificationTypeID': 10,
      'Date': new Date(),
      'LanguageID': this.languageID,
      'AppointmentID': data.list.appointmentID
    }
    this.CommonService.InsertNotifications(entity).subscribe(async data => {
      console.log("notication", data);
    }, error => {
      console.log("notication respone", error);
    })
  }

}

