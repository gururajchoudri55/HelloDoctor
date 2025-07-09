import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { async, Subject, Subscription } from 'rxjs';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-doctor-sms',
  templateUrl: './doctor-sms.component.html',
  styleUrls: ['./doctor-sms.component.css']
})
export class DoctorSmsComponent implements OnInit {
  clickEventSubscription: Subscription | undefined
  languageID: any;
  smsMobileNo: any;
  smsDesc: any;
  emailSubject: any;
  Emails: any = []
  constructor(private SharedService: SharedService, private CommonService: CommonService) { }

  ngOnInit(): void {
    // this.languageID = sessionStorage.getItem('LanguageID');
    // this.clickEventSubscription = this.SharedService.getClickEVent().subscribe((data) => {
    //   
    //   console.log(data);
    //   this.sendSms(data);
    //   this.SharedService.DoctorOnDestroy()
    // })


    this.Emails = [
      {
        'name': "rachid",
        'email': "r.aitlhaj@telehealth.ma"
      },
      {
        'name': "Gael",
        'email': "Gael.t@voiladoc.ma"
      },
      {
        'name': "roumaissa",
        'email': "roumaissa.ma@voiladoc.ma"
      },
      {
        'name': "srikanth",
        'email': "srikanth@amazeinc.in"
      },
      {
        'name': "emmanuel",
        'email': "emmanuel@meridionalhealth.com"
      }
    ]
  }



  async sendSms(data: any) {
    //Doctor
    if (this.languageID == 1) {
      if (data.typeID == 1) {
        //Doctor Accept
        this.smsDesc = "Your " + data.list.appointmentTypeText + "  appoinment with " + data.list.doctorName + "On " + data.list.notificationdate + " has been accepted.";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Appointment confirmed"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.sendAdminEmails(data);
        await this.notification(data)
      }
      else if (data.typeID == 2) {
        //Cancel Doctor
        this.smsDesc = "Your " + data.list.appointmentTypeText + " appoinment with " + data.list.doctorName + " on " + data.list.notificationdate + " has not been confirmed. Please select another time or another doctor."

        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Appointment cancelled by doctor";
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.sendCalcelEmails(data);
        await this.notification(data);
      }

      else if (data.typeID == 6) {
        //early call
        this.smsDesc = data.list.doctorName + " is available earlier. Do you want to start the call now? Open the app to accept or reject. Type: teleconsultation"
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Early video call request";
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }

      else if (data.typeID == 7) {
        //Refund Amount
        this.smsDesc = "We like to inform you that" + data.list.doctorName + " has refunded " + data.list.paidAmount + "MAD to your Voiladoc Wallet  "
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Amount Refunded By " + data.list.doctorName;
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 8) {
        //Free Call
        this.smsDesc = data.list.smsmobileno + " has given you a free call. Please click the notification on Voiladoc app to book your next appt."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "free call has been sent to patient"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 40) {
        //Prescription
        this.smsDesc = "Following your consultation with Dr " + data.list.doctorName + " added prescription for you"
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Following your consultation with Dr " + data.list.doctorName + " added prescription for you"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 41) {
        //Diagnostic Test
        this.smsDesc = "Following your consultation with Dr " + data.list.doctorName + " your prescription for lab tests is now available in homepage."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = this.smsDesc
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 42) {
        //SOAP Notes
        this.smsDesc = data.list.doctorName + " has added SOAP notes for you. "
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = this.smsDesc
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 43) {
        //SOAP Notes
        this.smsDesc = "(Health professional, " + data.list.doctorName + " has sent you a medical certificate.)"
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "(Health professional, " + data.list.doctorName + " has sent you a medical certificate.) "
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 44) {
        //SOAP Notes
        this.smsDesc = " You have been referred to healthcare professional " + data.list.doctorName + " Click on the notification to book an appointmentment."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = this.smsDesc
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 45) {
        //video alert
        
        this.smsDesc = "The doctor has started the call. Please open Voiladoc app and accept now. The doctor cannot wait more than 5 minutes. Beyond that you will be billed in accordance with our terms of use."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Doctor Started Call";

        await this.sendingSMS(data);
        await this.sendEmail(data)
        

      }
      else if (data.typeID == 46) {
        //doctor ended call
        this.smsDesc = "Sorry ! The doctor waited over 5 minutes and ended the call. You will be charged for this call in accordance with our terms of service."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Doctor Ended Call";
        await this.sendingSMS(data);
        await this.sendEmail(data)

      }

    }

    // French Messages

    else {
      if (data.typeID == 1) {
        
        //Doctor Accept
        this.smsDesc = "Votre RDV " + data.list.appointmentTypeText + " avec " + data.list.doctorName + " le  " + data.list.notificationdate + " a été confirmé."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "RDV confirmé"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.sendAdminEmails(data);
        await this.notification(data);
      }
      else if (data.typeID == 2) {
        
        //Cancel Doctor
        this.smsDesc = "Votre RDV " + data.list.appointmentTypeText + " avec " + data.list.doctorName + " le n'a pas été confirmé. Veuillez ouvrir l'app Voiladoc pour reporter ou obtenir un remboursement."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "RDV est annulé par le médecin";

        await this.sendingSMS(data);
        this.sendEmail(data);
        await this.sendCalcelEmails(data);
        await this.notification(data);
      }
      else if (data.typeID == 6) {
        //early call
        this.smsDesc = data.list.doctorName + " est disponible plus tôt. Voulez-vous commencer l'appel maintenant ? Ouvrez l'app pour accepter ou rejeter. Type : téléconsultation"
        this.smsMobileNo = data.list.smsmobileno;

        this.emailSubject = "Demande d’avance de RDV";
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
      else if (data.typeID == 7) {
        //Refund Amount
        this.smsDesc = "Nous vous informons que " + data.list.doctorName + " a remboursé " + data.list.paidAmount + " MAD . sur votre portefeuille Voiladoc."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Montant remboursé par " + data.list.doctorName;
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 8) {
        //Free Call
        this.smsDesc = "Le " + data.list.doctorName + " vous a accordé une RDV gratuite. Veuillez cliquer sur la notification sur l'App Voiladoc pour réserver votre prochain RDV."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "free call has been sent to patient";
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 40) {
        //Prescription
        
        this.smsDesc = "Suite à votre consultation avec le Dr " + data.list.doctorName + "  votre ordonnance pour vos médicaments est maintant disponible dans Accueil"
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Votre ordonnance médicale"
        
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 41) {
        //Diagnostic Test
        this.smsDesc = "Suite à votre consultation avec le Dr " + data.list.doctorName + ", votre ordonnance pour vos examens médicaux est maintant disponible dans Accueil."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Ordonnance pour vos examens médicaux"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 42) {
        //SOAP Notes
        this.smsDesc = data.list.doctorName + "Votre rapport de consultation est maintenant disponible dans Mon dossier médical."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = this.smsDesc
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 43) {
        //SOAP Notes
        this.smsDesc = "Professionnel de santé, " + data.list.doctorName + " vous a adressé un certificat médical. "
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = this.smsDesc
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }

      else if (data.typeID == 44) {
        //SOAP Notes
        this.smsDesc = "Vous avez été référé au professionnel de la santé " + data.list.doctorName + "  Cliquer sur la notification pour prendre rendez-vous. "
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Vous avez été référé à " + data.list.doctorName
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 45) {
        
        //video alert
        this.smsDesc = "Le médecin a lancé l'appel. Veuillez ouvrir l'app Voiladoc et accepter l'appel. Le médecin ne peut attendre que 5 minutes. Au-delà, vous serez facturé selon nos conditions d'utilisation."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Le médecin a commencé l'appel";
        await this.sendingSMS(data);
        await this.sendEmail(data)

      }
      else if (data.typeID == 46) {
        //doctor ended call
        this.smsDesc = "Pardon ! Le médecin a attendu plus de 5 minutes et a mis fin à l'appel. Cet appel vous sera facturé conformément à nos conditions d'utilisation."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Appel terminé par le médecin";
        await this.sendingSMS(data);
        await this.sendEmail(data)

      }
    }
    
  }




  async sendingSMS(data: any) {
    
    console.log("Sms success", data)
    //  return true;
    this.CommonService.SendTwillioSMS(this.smsMobileNo, this.smsDesc).subscribe(async data => {
      console.log("Sms success", data)
      // return true;

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
      console.log("email respone", error);
    })
  }










  sendAdminEmails(data: any) {
    if (this.languageID == 1) {
      var sub = "Provider has accepted an appointment."
      var body = "<br><br>" + "Provider has accepted an appointment.<br><br> Provider name : " + data.list.doctorName + "<br>Specialicilization :" + data.list.departmentname + "<br>Telephone : " + data.list.docMobileNumber + "<br>Email : " + data.list.docemailid + "<br><br>Patient name : " + data.list.pName + "<br>Telephone : " + data.list.pMobileNo + "<br>Email :" + data.list.pEmail + "<br>Appointment  no : " + data.list.appointmentID + "<br>Date of appointment : " + data.list.appoinmentttdate + "<br>Time of appointment: " + data.list.slots + "<br><br> Voiladoc system triggered message."
    }
    else {
      var sub = "Le prestataire a accepté un rendez-vous."
      var body = "<br><br>" + "Le prestataire a accepté un rendez-vous.<br><br> Nom du prestataire : " + data.list.doctorName + "<br>Spécialisation :" + data.list.departmentname + "<br>Téléphone : " + data.list.docMobileNumber + "<br>E-mail : " + data.list.docemailid + "<br><br>Nom du patient : " + data.list.pName + "<br>Téléphone : " + data.list.pMobileNo + "<br>E-mail :" + data.list.pEmail + "<br>No de RDV : " + data.list.appointmentID + "<br>Date de rendez-vous : " + data.list.appoinmentttdate + "<br>Heure de rendez-vous : " + data.list.slots + "<br><br> Message déclenché par le système Voiladoc."
    }

    for (let i = 0; i < this.Emails.length; i++) {
      var entity = {
        'emailto': this.Emails[i].email,
        'emailsubject': sub,
        'emailbody': "Dear " + this.Emails[i].name + "," + body,
        'attachmenturl': this.emailattchementurl,
        'cclist': this.cclist,
        'bcclist': this.bcclist
      }
      this.CommonService.sendemail(entity).subscribe(async data => {
        console.log("Accept Message", data);
      }, error => {
        console.log("Accept Message", error);
      })
    }

  }




  sendCalcelEmails(data: any) {
    if (this.languageID == 1) {
      var sub = "Provider has cancelled this appointment"
      var body = "<br><br>" + "Provider has cancelled this appointment.<br><br> Provider name : " + data.list.doctorName + "<br>Specialicilization :" + data.list.departmentname + "<br>Telephone : " + data.list.docMobileNumber + "<br>Email : " + data.list.docemailid + "<br><br>Patient name : " + data.list.pName + "<br>Telephone : " + data.list.pMobileNo + "<br>Email :" + data.list.pEmail + "<br>Appointment  no : " + data.list.appointmentID + "<br>Date of appointment : " + data.list.appoinmentttdate + "<br>Time of appointment: " + data.list.slots + "<br><br> Voiladoc system triggered message."
    }
    else {
      var sub = "Le prestataire a annulé ce rendez-vous"
      var body = "<br><br>" + "  Le prestataire a annulé ce rendez-vous.<br><br> Nom du prestataire : " + data.list.doctorName + "<br>Spécialisation :" + data.list.departmentname + "<br>Téléphone : " + data.list.docMobileNumber + "<br>E-mail : " + data.list.docemailid + "<br><br>Nom du patient : " + data.list.pName + "<br>Téléphone : " + data.list.pMobileNo + "<br>E-mail :" + data.list.pEmail + "<br>No de RDV : " + data.list.appointmentID + "<br>Date de rendez-vous : " + data.list.appoinmentttdate + "<br>Heure de rendez-vous : " + data.list.slots + "<br><br> Message déclenché par le système Voiladoc."
    }

    for (let i = 0; i < this.Emails.length; i++) {
      var entity = {
        'emailto': this.Emails[i].email,
        'emailsubject': sub,
        'emailbody': "Dear " + this.Emails[i].name + "," + body,
        'attachmenturl': this.emailattchementurl,
        'cclist': this.cclist,
        'bcclist': this.bcclist
      }
      this.CommonService.sendemail(entity).subscribe(async data => {
        console.log("Accept Message", data);
      }, error => {
        console.log("Accept Message", error);
      })
    }

  }
  
  public async notification(data: any) {
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
