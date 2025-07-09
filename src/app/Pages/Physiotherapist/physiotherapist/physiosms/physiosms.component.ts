import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../services/shared.service';
import { CommonService } from '../../../services/common.service';
@Component({
  selector: 'app-physiosms',
  templateUrl: './physiosms.component.html',
  styleUrls: ['./physiosms.component.css']
})
export class PhysiosmsComponent implements OnInit {
  clickPhysioventSUbscription: Subscription | undefined
  constructor(private SharedService: SharedService, private CommonService: CommonService) { }
  languageID: any;
  smsMobileNo: any;
  emailSubject: any;
  smsDesc: any;
  ngOnInit(): void {
    this.languageID = sessionStorage.getItem('LanguageID');
    // this.clickPhysioventSUbscription = this.SharedService.getPhysioSMS().subscribe(data => {
    //   console.log(data);
    //   // alert("Nurse Sms Called")
    //   // 
    //   this.doSomething(data)
    //   // this.SharedService.phsyiOnDestory()


    // })
  }

  async doSomething(data: any) {

    if (this.languageID == 1) {
      if (data.typeID == 1) {
        this.smsDesc = "Your appoinment with the Caregiver " + data.list.name + " on " + data.list.notificationdate + " has been accepted."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Appointment confirmed"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
     else if (data.typeID == 2) {
        this.smsDesc = "Your appoinment with the Caregiver " + data.list.name + " on " + data.list.notificationdate + " has not been confirmed."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Appointment not confirmed"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 4) {
        this.smsDesc = "Your Appointment with " + data.list.name + " scheduled for " + data.list.notificationdate + " has been Visited."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Patient Visited By Successfully."
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
      else if (data.typeID == 5) {
        this.smsDesc = "You missed your appointment with caregiver " + data.list.name + " on " + data.list.notificationdate + " and it was therefore marked as absent. If prepaid, you will be charged."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Patient has Not Visited"
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
      else if (data.typeID == 6) {
        this.smsDesc =  data.list.name + " has written SOAP notes for you. please open voiladoc app and check"
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "SOAP Notes"
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
    }
    else{

      if (data.typeID == 1) {
        this.smsDesc = "Votre RDV avec le/la soignant(e)  " + data.list.name + " le " + data.list.notificationdate + " a été confirmé."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "RDV confirmé"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 2) {
        this.smsDesc = "Votre RDV avec le/la soignant(e)  " + data.list.name + " regrette de devoir annuler le RDV le  " + data.list.notificationdate + " Vous pouvez reprogrammer le RDV ou demander un remboursement."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "RDV non confirmé"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 4) {
        this.smsDesc = "Votre rendez-vous avec " + data.list.name + " prévu pour " + data.list.notificationdate + " a été visité."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Patient visité par avec succès."
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
      else if (data.typeID == 5) {
        this.smsDesc = "Vous avez manqué votre rendez-vous avec le/la soignant(e) " + data.list.name + " le " + data.list.notificationdate + " et il a donc été marqué comme absent. Si prépayé, vous serez facturé"
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Le patient n'a pas visité"
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
      else if (data.typeID == 6) {
        this.smsDesc =  data.list.name + " a écrit des notes SOAP pour vous. veuillez ouvrir l'application voiladoc et vérifier"
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "SOAP Notes"
        await this.sendingSMS(data);
        await this.sendEmail(data);
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
    console.log("data123213" + data)
    ;
    var entity = {

      'PatientID': data.list.patientID,
      'Notification': this.emailSubject,
      'Description': this.smsDesc,
      'NotificationTypeID': 10,
      'Date': '',
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
