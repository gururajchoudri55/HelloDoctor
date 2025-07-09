import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { async, Subject, Subscription } from 'rxjs';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-pharma-sms',
  templateUrl: './pharma-sms.component.html',
  styleUrls: ['./pharma-sms.component.css']
})
export class PharmaSmsComponent implements OnInit {

  constructor(private SharedService: SharedService, private CommonService: CommonService) { }
  clickEventSubscription1: Subscription | undefined
  languageID: any;
  smsMobileNo: any;
  smsDesc: any;
  emailSubject: any;
  user: any;

  ngOnInit(): void {
    this.languageID = sessionStorage.getItem('LanguageID');
    this.user = sessionStorage.getItem('user');

    // this.clickEventSubscription1 = this.SharedService.getPharmacySMS().subscribe((data) => {
    //   
    //   console.log(data);
    //   this.dosomething(data);
    //   this.SharedService.pharmaOnDestory()
    // })
  }




  async dosomething(data: any) {
    //Doctor
    if (this.languageID == 1) {
      if (data.typeID == 1) {
        this.smsDesc = this.user + "  accepted your medicine order which is being processed. "
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Accepted your Order"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 2) {
        this.smsDesc = this.user + " did not accept your medication order. Please select another pharmacy."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Order not confirmed"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 3) {
        this.smsDesc = " Your medicine is ready for collection at " + this.user
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Medicine Order is ready for collection"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 6) {
        this.smsDesc = " Pharamacy has Updated Available Medicines. Please open Voiladoc App And Order it."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Pharmacy updated Available Medicines"
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }
    }
    else {

      if (data.typeID == 1) {
        
        this.smsDesc = this.user + " a accepté votre commande de médicaments qui est en cours de traitement."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Commande acceptée"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 2) {
        this.smsDesc = this.user + " n'a pas accepté votre commande de médicaments. Merci de sélectionner une autre pharmacie."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Commande non acceptée"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 3) {
        this.smsDesc =  " Votre commande de médicaments est prête, veuillez les retirer à la pharmacie " + this.user
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "L'Ordre des médicaments est prêt pour la collecte"
        await this.sendingSMS(data);
        await this.sendEmail(data);
        await this.notification(data);
      }
      else if (data.typeID == 6) {
        this.smsDesc = this.user +"Pharmacy vous a envoyé une mise à jour sur les médicaments et les prix.  Veuillez ouvrir l'app Voiladoc."
        this.smsMobileNo = data.list.smsmobileno;
        this.emailSubject = "Pharmacie mise à jour Médicaments disponibles"
        await this.sendingSMS(data);
        await this.sendEmail(data);
      }

    }
  }






  async sendingSMS(data: any) {
    
 
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
      'emailto': data.list.patientemail,
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