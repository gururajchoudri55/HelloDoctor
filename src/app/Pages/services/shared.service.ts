import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private Subject = new Subject<any>();
  private Subject2 = new Subject<any>();
  private Subject3 = new Subject<any>();
  private Subject4 = new Subject<any>();
  private Subject5 = new Subject<any>();
  private Subject6 = new Subject<any>();
  private Subject7 = new Subject<any>();

  private Subject8 = new Subject<any>();
  Emails: any = [];

  languageID: any;
  smsDesc: any;
  smsMobileNo: any;
  emailSubject: any;
  private host = environment.API_URL;

  private url: string = '';

  constructor(private http: HttpClient, private CommonService: CommonService) {
    this.user = sessionStorage.getItem('user');
    // this.Emails = [
    //   {
    //     'name': "rachid",
    //     'email': "r.aitlhaj@telehealth.ma"
    //   },
    //   {
    //     'name': "Gael",
    //     'email': "Gael.t@voiladoc.ma"
    //   },
    //   {
    //     'name': "roumaissa",
    //     'email': "roumaissa.ma@voiladoc.ma"
    //   },
    //   // {
    //   //   'name': "srikanth",
    //   //   'email': "srikanth@amazeinc.in"
    //   // },
    //   {
    //     'name': "emmanuel",
    //     'email': "emmanuel@meridionalhealth.com"
    //   },
    //   {
    //     'name': "Ghita",
    //     'email': "ghita@voiladoc.ma"
    //   },
    //   {
    //     'name': "Widad",
    //     'email': "widad@voiladoc.net"
    //   }
    // ]
  }

  //Doctor SMS

  sendSms(AppointmentList: any, typeID: any, typeOfProvider: any) {
    this.languageID = sessionStorage.getItem('LanguageID');
    this.Subject.closed = false;
    var entity = {
      list: AppointmentList,
      typeID: typeID,
      typeOfProvider: typeOfProvider,
    };
    console.log('before destroy', Subject);
    // this.Subject.next(entity);
    this.sendsmss(entity);
  }

  //doctor all notifications

  async sendsmss(data: any) {
    //Doctor
    if (this.languageID == 1) {
      if (data.typeID == 1) {
        //Doctor Accept
        this.smsDesc =
          data.list.doctorName +
          ' has accepted your ' +
          data.list.appointmentTypeText +
          ' request.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Appointment confirmed';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
        // setTimeout(() => {
        //   this.smsDesc =
        //     'Please pay within 30 minutes    Ref/Appt no :' +
        //     data.list.appointmentID +
        //     'Amount : ' +
        //     data.list.paidAmount +
        //     'Name : ' +
        //     data.list.doctorName +
        //     'Acc no : ' +
        //     data.list.acountNumbers +
        //     'Company : ' +
        //     data.list.paymentCompany;
        //   this.smsMobileNo = data.list.smsmobileno;
        //   this.emailSubject = 'Payment Details';
        //   this.sendingSMS(data);
        //   this.sendEmail(data);
        //   this.notification(data);
        //   this.sendAdminEmails(data);
        // }, 10000);
      } else if (data.typeID == 2) {
        //Cancel Doctor
        if (
          data.list.patientPaid &&
          data.list.amountRecieved &&
          data.list.paymentTypeID != 5 &&
          data.list.paymentTypeID != 6
        ) {
          this.smsDesc =
            data.list.doctorName +
            ' regrets to cancel the appt of ' +
            data.list.notificationdate +
            ' . A refund will be sent back to your account. Please wait for further update on the refund.';
          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'RDV est annulé par le médecin';
        } else if (
          (data.list.paymentTypeID == 6 && data.list.docCancelled == true) ||
          (data.list.paymentTypeID == 5 && data.list.docCancelled == true)
        ) {
          this.smsDesc =
            'The provider has canceled this appointment. A free call will be given to you shortly. If you need help, please contact our support.';

          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'Appointment cancelled by doctor';
        } else {
          this.smsDesc =
            'Your ' +
            data.list.appointmentTypeText +
            ' appoinment with ' +
            data.list.doctorName +
            ' on ' +
            data.list.notificationdate +
            ' has not been confirmed. Please select another time or another doctor.';

          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'Appointment cancelled by doctor';
        }

        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
        // if (this.adminEmail == 1) {
        //   await this.sendCalcelEmails(data);
        // }
      } else if (data.typeID == 6) {
        //early call
        this.smsDesc =
          data.list.doctorName +
          ' is available earlier. Do you want to start the call now? Open the app to accept or reject. Type: teleconsultation';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Early video call request';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 7) {
        //Refund Amount
        this.smsDesc =
          data.list.doctorName +
          ' refunded ' +
          data.list.paidAmount +
          ' Ar, to acc number, ' +
          data.list.patientAccountName +
          '. Please verify your account. Contact Voiladoc support for assistance.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Amount Refunded By ' + data.list.doctorName;
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 8) {
        //Free Call
        this.smsDesc =
          data.list.smsmobileno +
          ' has given you a free call. Please click the notification on Voiladoc app to book your next appt.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'free call has been sent to patient';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 9) {
        //Free Call
        if (data.list.followUpAppointmentTypeID == 1) {
          var followUpappointmentTypeText = 'In Clinic';
        } else if (data.list.followUpAppointmentTypeID == 2) {
          followUpappointmentTypeText = 'video Conference';
        } else {
          followUpappointmentTypeText = 'Home Visit';
        }

        this.smsDesc = `You received a follow-up visit from your provider ${data.list.doctorName} for  ${data.list.patientName}. Type: ${followUpappointmentTypeText}. Please book accordingly`;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Follow Up Visit';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 40) {
        //Prescription
        this.smsDesc =
          'The provider ' +
          data.list.doctorName +
          ' Francis, has sent your medication prescription. It is now available on the Voiladoc app homepage';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject =
          'Following your consultation with Dr ' +
          data.list.doctorName +
          ' added prescription for you';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 41) {
        //Diagnostic Test
        this.smsDesc =
          'Following your consultation with Dr ' +
          data.list.doctorName +
          ' your prescription for lab tests is now available in homepage.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = this.smsDesc;
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 42) {
        //SOAP Notes
        this.smsDesc = data.list.doctorName + ' has added SOAP notes for you. ';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = this.smsDesc;
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 43) {
        //SOAP Notes
        this.smsDesc =
          '(Health professional, ' +
          data.list.doctorName +
          ' has sent you a medical certificate.)';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject =
          '(Health professional, ' +
          data.list.doctorName +
          ' has sent you a medical certificate.) ';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 44) {
        //SOAP Notes
        this.smsDesc =
          ' You have been referred to healthcare professional ' +
          data.list.doctorName +
          ' Click on the notification to book an appointmentment.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = this.smsDesc;
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 45) {
        //video alert

        this.smsDesc =
          'The provider has initiated the call. Please open the Voiladoc app and accept the call. The provider can only wait 5 minutes. Beyond that, you will be charged';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Doctor Started Call';

        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 46) {
        //doctor ended call
        this.smsDesc =
          'Sorry ! The doctor waited over 5 minutes and ended the call. You will be charged for this call in accordance with our terms of service.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Doctor Ended Call';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 36) {
        //doctor ended call
        this.smsDesc =
          data.list.doctorName +
          'has received payment. Please be ready for consultation. Type : ' +
          data.list.appointmentTypeText +
          ' Date/time : ' +
          data.list.notificationdate;

        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Doctor Payment Received';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
    }

    // French Messages
    else {
      if (data.typeID == 1) {
        //Doctor Accept
        this.smsDesc =
          data.list.doctorName +
          ' a accepté votre ' +
          data.list.appointmentTypeText +
          'demande';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'RDV confirmé';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);

        // setTimeout(() => {
        //   this.smsDesc =
        //     'RDV accepté. Veuillez payer dans les 30 minutes. Ref/RDV N° :' +
        //     data.list.appointmentID +
        //     ', Montant : ' +
        //     data.list.paidAmount +
        //     ' Ar,' +
        //     ' Nom : ' +
        //     data.list.doctorName +
        //     ", No d'acc : " +
        //     data.list.acountNumbers +
        //     ' Société : ' +
        //     data.list.paymentCompany;
        //   this.smsMobileNo = data.list.smsmobileno;
        //   this.emailSubject = 'Détails de paiement';
        //   this.sendingSMS(data);
        //   this.sendEmail(data);
        //   this.sendAdminEmails(data);
        //   this.notification(data);
        // }, 10000);
      } else if (data.typeID == 2) {
        //Cancel Doctor
        if (
          data.list.patientPaid &&
          data.list.amountRecieved &&
          data.list.paymentTypeID != 5 &&
          data.list.paymentTypeID != 6
        ) {
          this.smsDesc =
            data.list.doctorName +
            " a le regret d'annuler le RDV de " +
            data.list.notificationdate +
            ' Un remboursement sera renvoyé sur votre compte. Veuillez attendre une nouvelle mise à jour.';
          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'RDV est annulé par le médecin';
        } else if (
          (data.list.paymentTypeID == 6 && data.list.docCancelled == true) ||
          (data.list.paymentTypeID == 5 && data.list.docCancelled == true)
        ) {
          this.smsDesc =
            "Le pretataire a annulé ce RDV. Un appel gratuit vous sera donné sous peu. Si vous avez besoin d'aide, veuillez contacter notre support.";

          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'RDV est annulé par le médecin';
        } else {
          this.smsDesc =
            'Votre RDV ' +
            data.list.appointmentTypeText +
            ' avec ' +
            data.list.doctorName +
            " le n'a pas été confirmé. Veuillez ouvrir l'app Voiladoc pour reporter ou obtenir un remboursement.";
          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'RDV est annulé par le médecin';
        }

        await this.sendingSMS(data);
        this.sendEmail(data);
        await this.notification(data);
        await this.sendCalcelEmails(data);
      } else if (data.typeID == 6) {
        //early call
        this.smsDesc =
          data.list.doctorName +
          " est disponible plus tôt. Voulez-vous commencer l'appel maintenant ? Ouvrez l'app pour accepter ou rejeter. Type : téléconsultation";
        this.smsMobileNo = data.list.smsmobileno;

        this.emailSubject = 'Demande d’avance de RDV';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 7) {
        //Refund Amount
        this.smsDesc =
          data.list.doctorName +
          ' a remboursé ' +
          data.list.paidAmount +
          ' Ar ,  sur le no de compte ' +
          data.list.patientAccountName +
          ". Veuillez vérifier votre compte. Contactez le support Voiladoc pour obtenir de l'aide. ";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Montant remboursé par ' + data.list.doctorName;
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 8) {
        //Free Call
        this.smsDesc =
          'Le ' +
          data.list.doctorName +
          " vous a accordé un rdv gratuit. Veuillez cliquer sur la notification sur l'App Voiladoc pour réserver votre prochain RDV";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = ' un appel gratuit a été envoyé par votre médecin';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 9) {
        //Free Call
        this.smsDesc = `Vous avez reçu une visite de suivi de votre prestataire  ${data.list.doctorName}  pour  ${data.list.patientName}. Type: ${data.list.appointmentTypeText}. Veuillez réserver en conséquence`;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Follow Up Visit';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 40) {
        //Prescription

        this.smsDesc =
          'Le prestataire ' +
          data.list.doctorName +
          "  Francis, a envoyé votre ordonnance de médicaments. Il est désormais disponible sur la page d'accueil de l'app Voiladoc.";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Votre ordonnance médicale';

        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 41) {
        //Diagnostic Test
        this.smsDesc =
          'Suite à votre consultation avec le Dr ' +
          data.list.doctorName +
          ', votre ordonnance pour vos examens médicaux est maintenant disponible dans Accueil.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Ordonnance pour vos examens médicaux';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 42) {
        //SOAP Notes
        this.smsDesc =
          data.list.doctorName +
          'Votre rapport de consultation est maintenant disponible dans Mon dossier médical.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = this.smsDesc;
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 43) {
        //SOAP Notes
        this.smsDesc =
          'Professionnel de santé, ' +
          data.list.doctorName +
          ' vous a adressé un certificat médical. ';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = this.smsDesc;
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 44) {
        //SOAP Notes
        this.smsDesc =
          'Vous avez été référé au professionnel de la santé ' +
          data.list.doctorName +
          '  Cliquer sur la notification pour prendre rendez-vous. ';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Vous avez été référé à ' + data.list.doctorName;
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 45) {
        //video alert
        this.smsDesc =
          "Le prestataire a lancé l'appel. Veuillez ouvrir l'app Voiladoc et accepter l'appel. Le prestataire ne peut attendre que 5 minutes. Au-delà, vous serez facturé.";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Le médecin a commencé l'appel";
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 46) {
        //doctor ended call
        this.smsDesc =
          "Pardon ! Le médecin a attendu plus de 5 minutes et a mis fin à l'appel. Cet appel vous sera facturé conformément à nos conditions d'utilisation.";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Appel terminé par le médecin';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 36) {
        //doctor ended call
        this.smsDesc =
          data.list.doctorName +
          ' a reçu le paiement. Veuillez être prêt pour la consultation. Type : ' +
          data.list.appointmentTypeText +
          '. Date/heure : ' +
          data.list.notificationdate;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Paiement du médecin reçu';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
    }
  }

  cclist: any = [];
  emailattchementurl: any = [];
  bcclist: any = [];

  sendingSMS(data: any) {
    if (this.smsMobileNo.substring(0, 4) == '+212') {
      this.smsMobileNo.slice(3);
      console.log('Sms Success', this.smsMobileNo);
      this.http.get<any[]>(
        'https://www.telma.net/sms_connect/sendsms/login?login=TERRA_INNOV&password=t3rR@_1Nn0V&msisdn_to=' +
          this.smsMobileNo +
          '&body=' +
          this.smsDesc +
          '&oadc=TERRA INNOV'
      );
    } else {
      // this.http.get<any[]>(this.host + '/Doctor/SendTwillioSMS?PhoneNumber=' + this.smsMobileNo + '&Message=' + this.smsDesc)
      //   .subscribe(data => {
      //     console.log("Sms Success")
      //   })
    }
  }

  public async sendEmail(data: any) {
    var entity = {
      emailto: data.list.emailID,
      emailsubject: this.emailSubject,
      emailbody: this.smsDesc,
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

  sendAdminEmails(data: any) {
    if (this.languageID == 1) {
      var sub = 'Provider has accepted an appointment.';
      var body =
        '<br><br>' +
        'Provider has accepted an appointment.<br><br> Provider name : ' +
        data.list.doctorName +
        '<br>Specialicilization :' +
        data.list.departmentname +
        '<br>Telephone : ' +
        data.list.docMobileNumber +
        '<br>Email : ' +
        data.list.docemailid +
        '<br><br>Patient name : ' +
        data.list.pName +
        '<br>Telephone : ' +
        data.list.pMobileNo +
        '<br>Email :' +
        data.list.pEmail +
        '<br>Appointment  no : ' +
        data.list.appointmentID +
        '<br>Date of appointment : ' +
        data.list.appoinmentttdate +
        '<br>Time of appointment: ' +
        data.list.slots +
        '<br><br> Voiladoc system triggered message.';
    } else {
      var sub = 'Le prestataire a accepté un rendez-vous.';
      var body =
        '<br><br>' +
        'Le prestataire a accepté un rendez-vous.<br><br> Nom du prestataire : ' +
        data.list.doctorName +
        '<br>Spécialisation :' +
        data.list.departmentname +
        '<br>Téléphone : ' +
        data.list.docMobileNumber +
        '<br>E-mail : ' +
        data.list.docemailid +
        '<br><br>Nom du patient : ' +
        data.list.pName +
        '<br>Téléphone : ' +
        data.list.pMobileNo +
        '<br>E-mail :' +
        data.list.pEmail +
        '<br>No de RDV : ' +
        data.list.appointmentID +
        '<br>Date de rendez-vous : ' +
        data.list.appoinmentttdate +
        '<br>Heure de rendez-vous : ' +
        data.list.slots +
        '<br><br> Message déclenché par le système Voiladoc.';
    }

    for (let i = 0; i < this.Emails.length; i++) {
      var entity = {
        emailto: this.Emails[i].email,
        emailsubject: sub,
        emailbody: 'Dear ' + this.Emails[i].name + ',' + body,
        attachmenturl: this.emailattchementurl,
        cclist: this.cclist,
        bcclist: this.bcclist,
      };
      this.http.post(this.url, entity).subscribe(
        (data) => {
          console.log('Email Sent');
        },
        (error) => {
          console.log('EMail Error', error);
        }
      );
    }
  }

  sendCalcelEmails(data: any) {
    if (this.languageID == 1) {
      var sub = 'Provider has cancelled this appointment';
      var body =
        '<br><br>' +
        'Provider has cancelled this appointment.<br><br> Provider name : ' +
        data.list.doctorName +
        '<br>Specialicilization :' +
        data.list.departmentname +
        '<br>Telephone : ' +
        data.list.docMobileNumber +
        '<br>Email : ' +
        data.list.docemailid +
        '<br><br>Patient name : ' +
        data.list.pName +
        '<br>Telephone : ' +
        data.list.pMobileNo +
        '<br>Email :' +
        data.list.pEmail +
        '<br>Appointment  no : ' +
        data.list.appointmentID +
        '<br>Date of appointment : ' +
        data.list.appoinmentttdate +
        '<br>Time of appointment: ' +
        data.list.slots +
        '<br><br> Voiladoc system triggered message.';
    } else {
      var sub = 'Le prestataire a annulé ce rendez-vous';
      var body =
        '<br><br>' +
        '  Le prestataire a annulé ce rendez-vous.<br><br> Nom du prestataire : ' +
        data.list.doctorName +
        '<br>Spécialisation :' +
        data.list.departmentname +
        '<br>Téléphone : ' +
        data.list.docMobileNumber +
        '<br>E-mail : ' +
        data.list.docemailid +
        '<br><br>Nom du patient : ' +
        data.list.pName +
        '<br>Téléphone : ' +
        data.list.pMobileNo +
        '<br>E-mail :' +
        data.list.pEmail +
        '<br>No de RDV : ' +
        data.list.appointmentID +
        '<br>Date de rendez-vous : ' +
        data.list.appoinmentttdate +
        '<br>Heure de rendez-vous : ' +
        data.list.slots +
        '<br><br> Message déclenché par le système Voiladoc.';
    }

    for (let i = 0; i < this.Emails.length; i++) {
      var entity = {
        emailto: this.Emails[i].email,
        emailsubject: sub,
        emailbody: 'Dear ' + this.Emails[i].name + ',' + body,
        attachmenturl: this.emailattchementurl,
        cclist: this.cclist,
        bcclist: this.bcclist,
      };
      this.http.post(this.url, entity).subscribe(
        (data) => {
          console.log('Email Sent');
        },
        (error) => {
          console.log('EMail Error', error);
        }
      );
    }
  }

  //doctor ends

  // getClickEVent(): Observable<any> {
  //   ;
  //   return this.Subject.asObservable();
  // }

  // DoctorOnDestroy() {
  //   this.Subject.closed = true;
  // }

  // pharmaOnDestory() {
  //   this.Subject6.closed = true;
  // }

  // diagnosticOnDestory() {
  //   this.Subject7.closed = true;
  // }

  // nurseOnDestroy() {
  //   this.Subject3.closed = true;
  // }

  // phsyiOnDestory() {
  //   this.Subject4.closed = true;
  // }

  // midwifeOnDetsroy() {
  //   this.Subject5.closed = true;
  // }

  // ngOnDestroy(): void {

  //   this.Subject2.closed = true;
  //   this.Subject3.closed = true;
  //   this.Subject4.closed = true;
  //   this.Subject5.closed = true;
  //   this.Subject6.closed = true;
  //   this.Subject7.closed = true;
  //   this.Subject8.closed = true;

  //   console.log("after destroy Called", Subject)
  // }

  //Nurse SMs starts

  sendNuseSms(AppointmentList: any, typeID: any, typeOfProvider: any) {
    this.Subject3.closed = false;
    var entity = {
      list: AppointmentList,
      typeID: typeID,
      typeOfProvider: typeOfProvider,
    };

    this.doSomething(entity);
    // this.Subject3.next(entity);
  }

  async doSomething(data: any) {
    if (this.languageID == 1) {
      if (data.typeID == 1) {
        this.smsDesc =
          data.list.nurseName +
          ' has accepted your request. You will soon receive an SMS with payment details. Click Paid on Voiladoc, once paid.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Appointment confirmed';
        await this.sendingSMS(data);
        await this.sendEmail(data);

        // this.smsDesc =
        //   'Please pay within 30 minutes    Ref/Appt no :' +
        //   data.list.id +
        //   'Amount : ' +
        //   data.list.paidAmount +
        //   'Name: ' +
        //   data.list.nurseName +
        //   'Acc no :' +
        //   data.list.acountNumbers +
        //   'Company :' +
        //   data.list.paymentCompany;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Payment Details';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 2) {
        this.smsDesc =
          'Your appoinment with the nurse ' +
          data.list.nurseName +
          ' on ' +
          data.list.notificationdate +
          ' has not been confirmed.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Appointment not confirmed';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 4) {
        this.smsDesc =
          'Your Appointment with ' +
          data.list.nurseName +
          ' scheduled for ' +
          data.list.notificationdate +
          ' has been Visited.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Patient Visited By Successfully.';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 5) {
        this.smsDesc =
          'You missed your appointment with nurse ' +
          data.list.nurseName +
          ' on ' +
          data.list.notificationdate +
          ' and it was therefore marked as absent. If prepaid, you will be charged.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Patient has Not Visited';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 6) {
        this.smsDesc =
          data.list.nurseName +
          ' has written SOAP notes for you. please open voiladoc app and check';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'SOAP Notes';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 36) {
        //doctor ended call
        this.smsDesc =
          data.list.nurseName +
          'has received payment. Please be ready for consultation.  Date/time : ' +
          data.list.notificationdate;

        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Nurse Payment Received';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 10) {
        //Refund Amount
        this.smsDesc =
          data.list.nurseName +
          ' refunded ' +
          data.list.paidAmount +
          ' Ar, to acc number, ' +
          data.list.patientAccountName +
          '. Please verify your account. Contact Voiladoc support for assistance.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Amount Refunded By ' + data.list.nurseName;
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
    } else {
      if (data.typeID == 1) {
        this.smsDesc =
          // data.list.nurseName +
          // ' a accepté votre Vous recevrez bientôt un SMS avec les détails du paiement. Cliquez sur Payé sur Voiladoc, une fois payé.';
          this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'RDV confirmé';
        await this.sendingSMS(data);
        await this.sendEmail(data);

        this.smsDesc =
          'RDV accepté. Veuillez payer dans les 30 minutes.    Ref/RDV N°  :' +
          data.list.id +
          ' Montant : ' +
          data.list.paidAmount +
          ' Ar' +
          ' Nom : ' +
          data.list.nurseName +
          " No d'acc :" +
          data.list.acountNumbers +
          ' Société :' +
          data.list.paymentCompany;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Détails de paiement';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        // this.smsDesc = "Votre RDV de visite à domicile avec l'infirmière  " + data.list.nurseName + " le " + data.list.notificationdate + " a été confirmé."
        // this.smsMobileNo = data.list.smsmobileno;
        // this.emailSubject = "RDV confirmé"
        // await this.sendingSMS(data);
        // await this.sendEmail(data);
      } else if (data.typeID == 2) {
        this.smsDesc =
          "Votre RDV avec l'infirmier/ère " +
          data.list.nurseName +
          ' le ' +
          data.list.notificationdate +
          " n'a pas été confirmé.Veuillez ouvrir l’app pour reprogrammer ou obtenir un remboursement";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'RDV non confirmé';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 4) {
        this.smsDesc =
          'Votre rendez-vous avec ' +
          data.list.nurseName +
          ' prévu pour ' +
          data.list.notificationdate +
          ' a été visité.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Patient visité par avec succès.';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 5) {
        this.smsDesc =
          "Vous n'étiez pas présent à votre RDV du  " +
          data.list.notificationdate +
          " Par conséquent, le RDV a été marqué comme absent. S'il est prépayé, vous serez facturé.";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Absent au rendez-vous.';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 6) {
        this.smsDesc =
          data.list.nurseName +
          " a écrit des notes SOAP pour vous. veuillez ouvrir l'application voiladoc et vérifier";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'SOAP Notes';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 36) {
        //doctor ended call
        this.smsDesc =
          data.list.nurseName +
          ' a reçu le paiement. Veuillez être prêt pour la consultation. Date/heure : ' +
          data.list.notificationdate;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Paiement du médecin reçu';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 10) {
        //Refund Amount
        this.smsDesc =
          data.list.nurseName +
          ' a remboursé ' +
          data.list.paidAmount +
          ' Ar ,  sur le no de compte ' +
          data.list.patientAccountName +
          ". Veuillez vérifier votre compte. Contactez le support Voiladoc pour obtenir de l'aide. ";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Montant remboursé par ' + data.list.nurseName;
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
    }
  }

  //Physio Sms

  sendPhysioSMS(AppointmentList: any, typeID: any, typeOfProvider: any) {
    this.Subject4.closed = false;
    var entity = {
      list: AppointmentList,
      typeID: typeID,
      typeOfProvider: typeOfProvider,
    };
    // this.Subject4.next(entity);

    this.Physio(entity);
  }

  async Physio(data: any) {
    if (this.languageID == 1) {
      if (data.typeID == 1) {
        // this.smsDesc = "Your appoinment with the Caregiver " + data.list.name + " on " + data.list.notificationdate + " has been accepted."
        // this.smsMobileNo = data.list.smsmobileno;
        // this.emailSubject = "Appointment confirmed"
        // await this.sendingSMS(data);
        // await this.sendEmail(data);

        this.smsDesc = data.list.name + ' has accepted your request.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Appointment confirmed';
        await this.sendingSMS(data);
        await this.sendEmail(data);

        // this.smsDesc =
        //   'Please pay within 30 minutes    Ref/Appt no :' +
        //   data.list.id +
        //   'Amount : ' +
        //   data.list.paidAmount +
        //   'Name: ' +
        //   data.list.name +
        //   'Acc no :' +
        //   data.list.acountNumbers +
        //   'Company :' +
        data.list.paymentCompany;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Payment Details';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 2) {
        if (data.list.patientPaid == 1 && data.list.amountRecieved == 1) {
          this.smsDesc =
            data.list.name +
            ' regrets to cancel the appt of ' +
            data.list.notificationdate +
            ' . A refund will be sent back to your account. Please wait for further update on the refund.';
          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'RDV est annulé par le Caregiver';
        } else {
          this.smsDesc =
            'Your  appoinment with ' +
            data.list.name +
            ' on ' +
            data.list.notificationdate +
            ' has not been confirmed. Please select another time or another doctor.';

          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'Appointment cancelled by Caregiver';
        }
        // this.smsDesc = "Your appoinment with the Caregiver " + data.list.name + " on " + data.list.notificationdate + " has not been confirmed."
        // this.smsMobileNo = data.list.smsmobileno;
        // this.emailSubject = "Appointment not confirmed"
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 4) {
        this.smsDesc =
          'Your Appointment with ' +
          data.list.name +
          ' scheduled for ' +
          data.list.notificationdate +
          ' has been Visited.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Patient Visited By Successfully.';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 5) {
        this.smsDesc =
          'You missed your appointment with caregiver ' +
          data.list.name +
          ' on ' +
          data.list.notificationdate +
          ' and it was therefore marked as absent. If prepaid, you will be charged.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Patient has Not Visited';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 6) {
        this.smsDesc =
          data.list.name +
          ' has written SOAP notes for you. please open voiladoc app and check';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'SOAP Notes';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 36) {
        //doctor ended call
        this.smsDesc =
          data.list.name +
          'has received payment. Please be ready for consultation.  Date/time : ' +
          data.list.notificationdate;

        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Physio Payment Received';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 10) {
        //Refund Amount
        this.smsDesc =
          data.list.name +
          ' refunded ' +
          data.list.paidAmount +
          ' Ar, to acc number, ' +
          data.list.patientAccountName +
          '. Please verify your account. Contact Voiladoc support for assistance.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Amount Refunded By ' + data.list.name;
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
    } else {
      if (data.typeID == 1) {
        // this.smsDesc = "Votre RDV avec le/la soignant(e)  " + data.list.name + " le " + data.list.notificationdate + " a été confirmé."
        // this.smsMobileNo = data.list.smsmobileno;
        // this.emailSubject = "RDV confirmé"
        // await this.sendingSMS(data);
        // await this.sendEmail(data);

        this.smsDesc =
          // data.list.name +
          // ' a accepté votre Vous recevrez bientôt un SMS avec les détails du paiement. Cliquez sur Payé sur Voiladoc, une fois payé.';
          this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'RDV confirmé';
        await this.sendingSMS(data);
        await this.sendEmail(data);

        this.smsDesc =
          'RDV accepté. Veuillez payer dans les 30 minutes.    Ref/RDV N°  :' +
          data.list.id +
          ' Montant : ' +
          data.list.paidAmount +
          ' Ar' +
          ' Nom : ' +
          data.list.name +
          " No d'acc :" +
          data.list.acountNumbers +
          ' Société :' +
          data.list.paymentCompany;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Détails de paiement';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 2) {
        if (data.list.patientPaid == 1 && data.list.amountRecieved == 1) {
          this.smsDesc =
            data.list.name +
            " a le regret d'annuler le RDV de " +
            data.list.notificationdate +
            ' Un remboursement sera renvoyé sur votre compte. Veuillez attendre une nouvelle mise à jour.';
          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'RDV est annulé par le Caregiver';
        } else {
          this.smsDesc =
            'Votre RDV   avec ' +
            data.list.name +
            " le n'a pas été confirmé. Veuillez ouvrir l'app Voiladoc pour reporter ou obtenir un remboursement.";
          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'RDV est annulé par le Caregiver';
        }
        // this.smsDesc = "Votre RDV avec le/la soignant(e)  " + data.list.name + " regrette de devoir annuler le RDV le  " + data.list.notificationdate + " Vous pouvez reprogrammer le RDV ou demander un remboursement."
        // this.smsMobileNo = data.list.smsmobileno;
        // this.emailSubject = "RDV non confirmé"
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 4) {
        this.smsDesc =
          'Votre rendez-vous avec ' +
          data.list.name +
          ' prévu pour ' +
          data.list.notificationdate +
          ' a été visité.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Patient visité par avec succès.';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 5) {
        this.smsDesc =
          'Vous avez manqué votre rendez-vous avec le/la soignant(e) ' +
          data.list.name +
          ' le ' +
          data.list.notificationdate +
          ' et il a donc été marqué comme absent. Si prépayé, vous serez facturé';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Le patient n'a pas visité";
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 6) {
        this.smsDesc =
          data.list.name +
          " a écrit des notes SOAP pour vous. veuillez ouvrir l'application voiladoc et vérifier";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'SOAP Notes';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 36) {
        //doctor ended call
        this.smsDesc =
          data.list.name +
          ' a reçu le paiement. Veuillez être prêt pour la consultation. Date/heure : ' +
          data.list.notificationdate;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Paiement du médecin reçu';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 10) {
        //Refund Amount
        this.smsDesc =
          data.list.name +
          ' a remboursé ' +
          data.list.paidAmount +
          ' Ar ,  sur le no de compte ' +
          data.list.patientAccountName +
          ". Veuillez vérifier votre compte. Contactez le support Voiladoc pour obtenir de l'aide. ";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Montant remboursé par ' + data.list.name;
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
    }
  }

  // getPhysioSMS(): Observable<any> {
  //   ;
  //   return this.Subject4.asObservable();
  // }

  //midwife sms

  sendMidwifeSMs(AppointmentList: any, typeID: any, typeOfProvider: any) {
    this.Subject5.closed = false;
    var entity = {
      list: AppointmentList,
      typeID: typeID,
      typeOfProvider: typeOfProvider,
    };
    this.sendMidwife(entity);
    // this.Subject5.next(entity);
  }

  async sendMidwife(data: any) {
    if (this.languageID == 1) {
      if (data.typeID == 1) {
        this.smsDesc =
          'Your appoinment with the Midwife ' +
          data.list.name +
          ' on ' +
          data.list.notificationdate +
          ' has been accepted.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Appointment confirmed';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 2) {
        // this.smsDesc = "Your appoinment with the Midwife " + data.list.name + " on " + data.list.notificationdate + " has not been confirmed."
        // this.smsMobileNo = data.list.smsmobileno;
        // this.emailSubject = "Appointment not confirmed"

        if (data.list.patientPaid == 1 && data.list.amountRecieved == 1) {
          this.smsDesc =
            data.list.name +
            ' regrets to cancel the appt of ' +
            data.list.notificationdate +
            ' . A refund will be sent back to your account. Please wait for further update on the refund.';
          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'RDV est annulé par le Midwife';
        } else {
          this.smsDesc =
            'Your  appoinment with ' +
            data.list.name +
            ' on ' +
            data.list.notificationdate +
            ' has not been confirmed. Please select another time or another doctor.';

          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'Appointment cancelled by Midwife';
        }
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 4) {
        this.smsDesc =
          'Your Appointment with ' +
          data.list.name +
          ' scheduled for ' +
          data.list.notificationdate +
          ' has been Visited.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Patient Visited By Successfully.';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 5) {
        this.smsDesc =
          'You missed your appointment with midwife ' +
          data.list.name +
          'on ' +
          data.list.notificationdate +
          ' . and it was therefore marked as absent. If prepaid, you will be charged.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Patient has Not Visited';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 6) {
        this.smsDesc =
          'Midwife  ' +
          data.list.name +
          ' has sent you a summary of the home consultation. Please see the Voiladoc homepage for more details.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'SOAP Notes';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 36) {
        //doctor ended call
        this.smsDesc =
          data.list.name +
          'has received payment. Please be ready for consultation.  Date/time : ' +
          data.list.notificationdate;

        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Nurse Payment Received';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 10) {
        //Refund Amount
        this.smsDesc =
          data.list.name +
          ' refunded ' +
          data.list.paidAmount +
          ' Ar, to acc number, ' +
          data.list.patientAccountName +
          '. Please verify your account. Contact Voiladoc support for assistance.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Amount Refunded By ' + data.list.name;
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
    } else {
      if (data.typeID == 1) {
        this.smsDesc =
          'Votre rendez-vous de visite à domicile avec la sage-femme ' +
          data.list.name +
          ' le ' +
          data.list.notificationdate +
          ' a été confirmé.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'RDV confirmé';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 2) {
        // this.smsDesc = "Votre RDV avec la sage-femme le  " + data.list.name + " n'a pas été confirmé. Veuillez ouvrir l'app pour reprogrammer ou obtenir un remboursement."
        // this.smsMobileNo = data.list.smsmobileno;
        // this.emailSubject = "RDV non confirmé"

        if (data.list.patientPaid == 1 && data.list.amountRecieved == 1) {
          this.smsDesc =
            data.list.name +
            ' regrets to cancel the appt of ' +
            data.list.notificationdate +
            ' . A refund will be sent back to your account. Please wait for further update on the refund.';
          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'RDV est annulé par le Midwife';
        } else {
          this.smsDesc =
            'Your  appoinment with ' +
            data.list.name +
            ' on ' +
            data.list.notificationdate +
            ' has not been confirmed. Please select another time or another doctor.';

          this.smsMobileNo = data.list.smsmobileno;
          this.emailSubject = 'Appointment cancelled by Midwife';
        }
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 4) {
        this.smsDesc =
          'Votre rendez-vous avec ' +
          data.list.name +
          ' prévu pour ' +
          data.list.notificationdate +
          ' a été visité.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Patient visité par avec succès.';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 5) {
        this.smsDesc =
          'Vous avez manqué votre rendez-vous avec la sage-femme ' +
          data.list.name +
          ' le ' +
          data.list.notificationdate +
          ' et il a donc été marqué comme absent. Si prépayé, vous serez facturé.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Le patient n'a pas visité";
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 6) {
        this.smsDesc =
          'La sage-femme ' +
          data.list.name +
          " a envoyé un résumé de la consultation à domicile. Veuillez consulter la page d'accueil Voiladoc pour plus de détails.";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'SOAP Notes';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 36) {
        //doctor ended call
        this.smsDesc =
          data.list.name +
          ' a reçu le paiement. Veuillez être prêt pour la consultation. Date/heure : ' +
          data.list.notificationdate;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Paiement du médecin reçu';
        await this.sendingSMS(data);
        await this.sendEmail(data);
      } else if (data.typeID == 10) {
        //Refund Amount
        this.smsDesc =
          data.list.name +
          ' a remboursé ' +
          data.list.paidAmount +
          ' Ar ,  sur le no de compte ' +
          data.list.patientAccountName +
          ". Veuillez vérifier votre compte. Contactez le support Voiladoc pour obtenir de l'aide. ";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Montant remboursé par ' + data.list.name;
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
    }
  }

  // Pharmacy Sms

  sendPharmacySMS(AppointmentList: any, typeID: any, typeOfProvider: any) {
    this.Subject6.closed = false;
    var entity = {
      list: AppointmentList,
      typeID: typeID,
      typeOfProvider: typeOfProvider,
    };
    // this.Subject6.next(entity);
    this.Pharma(entity);
  }

  pharmacyName: any;
  async Pharma(data: any) {
    //Doctor
    this.pharmacyName = sessionStorage.getItem('user');
    if (this.languageID == 1) {
      if (data.typeID == 1) {
        this.smsDesc =
          this.user +
          '  accepted your medicine order which is being processed. ';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Accepted your Order';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 2) {
        this.smsDesc =
          this.user +
          ' did not accept your medication order. Please select another pharmacy.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Order not confirmed';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 3) {
        this.smsDesc = ' Your medicine is ready for collection at ' + this.user;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Medicine Order is ready for collection';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 6) {
        this.smsDesc = `${this.pharmacyName} accepted your Order.Please Wait for further updates`;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Pharmacy updated Available Medicines';

        // setTimeout(() => {
        //   this.smsDesc =
        //     'Please pay within 30 minutes    Ref/Appt no :' +
        //     data.list.id +
        //     'Name : ' +
        //     data.list.pharmacyName +
        //     'Acc no : ' +
        //     data.list.acountNumbers +
        //     'Company : ' +
        //     data.list.paymentCompany;
        //   this.smsMobileNo = data.list.smsmobileno;
        //   this.emailSubject = 'Payment Details';
        //   this.sendingSMS(data);
        //   this.sendEmail(data);
        //   this.notification(data);
        // }, 10000);

        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 15) {
        (this.smsDesc =
          this.user +
          ' is trying to contact on the chatline. Please open the Voiladoc application to respond.'),
          (this.smsMobileNo = data.list.smsmobileno);
        this.emailSubject = 'Pharmacy is trying to contact you';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
    } else {
      if (data.typeID == 1) {
        this.smsDesc =
          this.user +
          ' a accepté votre commande de médicaments qui est en cours de traitement.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Commande acceptée';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 2) {
        this.smsDesc =
          this.user +
          " n'a pas accepté votre commande de médicaments. Merci de sélectionner une autre pharmacie.";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Commande non acceptée';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 3) {
        this.smsDesc =
          ' Votre commande de médicaments est prête, veuillez les retirer à la pharmacie ' +
          this.user;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "L'Ordre des médicaments est prêt pour la collecte";
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 6) {
        this.smsDesc = `${this.pharmacyName} accepté votre commande. Veuillez attendre d'autres mises à jour`;
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Pharmacie mise à jour Médicaments disponibles';

        // setTimeout(() => {
        //   this.smsDesc =
        //     'RDV accepté. Veuillez payer dans les 30 minutes. Ref/RDV N° :' +
        //     data.list.id +
        //     ' Nom : ' +
        //     data.list.pharmacyName +
        //     "No d'acc : " +
        //     data.list.acountNumbers +
        //     'Société : ' +
        //     data.list.paymentCompany;
        //   this.smsMobileNo = data.list.smsmobileno;
        //   this.emailSubject = 'Paiements';
        //   this.sendingSMS(data);
        //   this.sendEmail(data);
        //   this.notification(data);
        // }, 10000);

        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 15) {
        this.smsDesc =
          this.user +
          " essaie de vous contacter sur la chatline. Veuillez ouvrir l'application Voiladoc pour répondre.";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'La pharmacie essaie de vous contacter';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
    }
  }

  //Diagnostic SMS
  user: any;
  sendDiagnosticSMS(
    AppointmentList: any,
    typeID: any,
    typeOfProvider: any,
    slotName: any
  ) {
    this.user = sessionStorage.getItem('user');
    // this.Subject7.closed = false;
    var entity = {
      list: AppointmentList,
      typeID: typeID,
      typeOfProvider: typeOfProvider,
      slotname: slotName,
    };
    // this.Subject7.next(entity);
    this.disgnostic(entity);
  }

  async disgnostic(data: any) {
    if (this.languageID == 1) {
      if (data.typeID == 1 || data.typeID == 9) {
        this.smsDesc =
          'Your appointment with ' +
          this.user +
          ' on ' +
          data.list.slotName +
          '  has been confirmed and is being processed. You will receive an update soon.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Appointment confirmed';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 2) {
        this.smsDesc =
          'We regret but your appointment with ' +
          this.user +
          ' on ' +
          data.list.notificationdate +
          '  has not been accepted. Type : Home sample collection. ';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Appointment Cancelled';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 5) {
        this.smsDesc =
          'The lab has sent your test report. Please open Voiladoc app and book with your doctor if you require further consultation.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Lab Report';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 6) {
        this.smsDesc =
          this.user +
          ' had sent you a price update.  Please open the Voiladoc app to respond.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Lab Sent Price';

        // setTimeout(() => {
        //   this.smsDesc =
        //     'Please pay within 30 minutes    Ref/Appt no :' +
        //     data.list.id +
        //     'Name : ' +
        //     data.list.diagnosticCenterName +
        //     'Acc no : ' +
        //     data.list.acountNumbers +
        //     'Company : ' +
        //     data.list.paymentCompany;
        //   this.smsMobileNo = data.list.smsmobileno;
        //   this.emailSubject = 'Payment Details';
        //   this.sendingSMS(data);
        //   this.sendEmail(data);
        //   this.notification(data);
        // }, 10000);
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 3) {
        this.smsDesc =
          'We noticed that you missed your appointment on ' +
          data.list.notificationdate +
          '. The status of your appointment has been changed to No show.  Please contact the lab if you need assistance.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Patient Not Visited';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 10) {
        this.smsDesc =
          this.user +
          's trying to reach you on the chatline. Please open Voiladoc app to respond';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Chat';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
    } else {
      if (data.typeID == 1 || data.typeID == 9) {
        this.smsDesc = `${data.list.diagnosticCenterName} Voilalabo vous a donné RDV le ${data.list.todaydate} à ${data.list.slotname} Merci d'arriver 15 minutes avant votre RDV. Le rappel apparaîtra sur votre app`;
        // 'Votre RDV avec ' +
        // this.user +
        // ' le ' +
        // data.list.slotName +
        // '  a été confirmé et est en cours de traitement. Vous recevrez bientôt une mise à jour.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Rendez-vous confirmé';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 2) {
        this.smsDesc = `${data.list.diagnosticCenterName} Voilalabo vous a donné RDV le ${data.list.todaydate} à ${data.list.slotname} Merci d'arriver 15 minutes avant votre RDV. Le rappel apparaîtra sur votre app`;
        // 'Votre RDV avec ' +
        // this.user +
        // ' le ' +
        // data.list.slotName +
        // '  a été confirmé et est en cours de traitement. Vous recevrez bientôt une mise à jour.';
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Rendez-vous annulé';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 5) {
        this.smsDesc =
          "Le laboratoire a envoyé votre rapport de test. Veuillez ouvrir l'application Voiladoc et réserver avec votre médecin si vous avez besoin d'une consultation supplémentaire";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Rapport de laboratoire';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 6) {
        this.smsDesc =
          this.user +
          " vous avait envoyé une mise à jour de prix. Veuillez ouvrir l'app Voiladoc pour répondre.";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Prix envoyé au laboratoire';

        // setTimeout(() => {
        //   this.smsDesc =
        //     'RDV accepté. Veuillez payer dans les 30 minutes. Ref/RDV N° :' +
        //     data.list.id +
        //     ' Nom : ' +
        //     data.list.diagnosticCenterName +
        //     "No d'acc : " +
        //     data.list.acountNumbers +
        //     'Société : ' +
        //     data.list.paymentCompany;
        //   this.smsMobileNo = data.list.smsmobileno;
        //   this.emailSubject = 'Paiements';
        //   this.sendingSMS(data);
        //   this.sendEmail(data);
        //   this.notification(data);
        // }, 10000);

        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 3) {
        this.smsDesc =
          'Nous avons remarqué que vous avez manqué votre RDV le ' +
          data.list.notificationdate +
          ". Le statut de votre RDV a été changé en Non présentation. Veuillez contacter le laboratoire si vous avez besoin d'aide.";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Patient Not Visited';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      } else if (data.typeID == 10) {
        this.smsDesc =
          " essaie de vous contacter sur la chatline. Veuillez ouvrir l'application Voiladoc pour répondre.";
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = 'Chat';
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
    }
  }

  insertexceptions(PageUrl: any, ServiceName: any, Exception: any) {
    this.Subject2.closed = false;
    var entity = {
      PageUrl: PageUrl,
      ServiceName: ServiceName,
      LoggendInUser: sessionStorage.getItem('user'),
      Exception: Exception.msg,
    };
    this.Subject2.next(entity);
  }

  getExceptionEvent(): Observable<any> {
    return this.Subject2.asObservable();
  }

  sendAssistanceSMS(deatilsList: any, typeID: any, typeOfProvider: any) {
    this.user = sessionStorage.getItem('user');
    // this.Subject7.closed = false;
    var entity = {
      list: deatilsList,
      typeID: typeID,
      typeOfProvider: typeOfProvider,
    };
    // this.Subject7.next(entity);
    this.assistanceSMS(entity);
  }
  async assistanceSMS(data: any) {
    if (this.languageID == 1) {
      if (data.typeID == 1) {
        //assiant add the child his parant sms
        this.smsDesc =
          data.list.PR_FirstName +
          ' has been added to your family members menu on the Voiladoc app.';
        this.smsMobileNo = data.list.PR_MobileNumber;
        this.emailSubject = 'Family members added';
        await this.sendingSMS(data);
        await this.sendEmails(data);
      } else if (data.typeID == 2) {
        //assiant add the child his parant sms
        this.smsDesc =
          this.user +
          ' has added ' +
          data.list.PR_FirstName +
          ' to your family members menu on the Voiladoc app.';
        this.smsMobileNo = data.list.PR_MobileNumber;
        this.emailSubject = 'Family members added';
        await this.sendingSMS(data);
        await this.sendEmails(data);
      }
    } else {
      if (data.typeID == 1) {
        //assiant add the child his parant sms
        this.smsDesc =
          data.list.PR_FirstName +
          " a été ajouté au menu des membres de votre famille sur l'app Voiladoc.";
        this.smsMobileNo = data.list.PR_MobileNumber;
        this.emailSubject = 'des membres ajouté';
        await this.sendingSMS(data);
        await this.sendEmails(data);
      } else if (data.typeID == 2) {
        //assiant add the child his parant sms
        this.smsDesc =
          this.user +
          ' a ajouté ' +
          data.list.PR_FirstName +
          " au menu des membres de votre famille sur l'app Voiladoc.";
        this.smsMobileNo = data.list.PR_MobileNumber;
        this.emailSubject = 'des membres ajouté';
        await this.sendingSMS(data);
        await this.sendEmails(data);
      }
    }
  }
  public async sendEmails(data: any) {
    var entity = {
      emailto: data.list.PR_EmailID,
      emailsubject: this.emailSubject,
      emailbody: this.smsDesc,
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

  //send password Emails To Providers

  SendEmailSmsToProvider(
    pinno: any,
    userName: any,
    password: any,
    smsmobileno: any,
    email: any,
    name: any
  ) {
    var entity = {
      Pinno: pinno,
      userName: userName,
      password: password,
      smsmobileno: smsmobileno,
      email: email,
      name: name,
    };
    this.Subject8.next(entity);
  }

  getRegisterServiceEmailAndSms(): Observable<any> {
    return this.Subject8.asObservable();
  }

  public async notification(data: any) {
    console.log('data123213' + data);
    var entity = {
      PatientID: data.list.patientID,
      Notification: this.emailSubject,
      Description: this.smsDesc,
      NotificationTypeID: 10,
      Date: new Date(),
      LanguageID: this.languageID,
      AppointmentID: data.list.appointmentID,
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
}
