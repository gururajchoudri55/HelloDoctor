import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import Labels from '../../../Lables/Doctors/myAppointments.json';
@Component({
  selector: 'app-diagnosticchat',
  templateUrl: './diagnosticchat.component.html',
  styleUrls: ['./diagnosticchat.component.css']
})
export class DiagnosticchatComponent implements OnInit {

  @Input() Details: any = [];
  @Output() closechatMessage: EventEmitter<any> = new EventEmitter();
  chatID: any;
  coversationarray: any = []
  currentUrl: any;
  languageID: any;
  labels: any;
  constructor(private DiagnosticService: DiagnosticService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    console.log(this.Details)
    this.dosendmsg()
  }



  public dosendmsg() {
    var entity = {
      'DiagnosticID': this.Details[0].diagnosticCenterID,
      'PatientID': this.Details[0].patientID,
      'AppointmentID': this.Details[0].id
      // 'Read_Me': 0
    }
    this.DiagnosticService.InserDiagnostic_ChatMaster(entity).subscribe(data => {
      if (data != 0) {
        this.chatID = data;

        this.getPreviousChat();
        this.oberserableTimer();

        // if (this.languageid == 1) {
        //   var smsdesc = this.user + " is trying to reach you on the chatline. Please open Voiladoc app to respond"
        //   this.SendTwiliSms(this.smsmobileno, smsdesc)
        // }
        // else {
        //   var smsdesc = this.user + " essaie de vous contacter sur la chatline. Veuillez ouvrir l'application Voiladoc pour répondre."
        //   this.SendTwiliSms(this.smsmobileno, smsdesc)
        // }
      }
    })

  }



  public getPreviousChat() {
    this.DiagnosticService.GetDiagnosticChatDetailsWeb(this.chatID).subscribe(res => {
      let Chatconversation = res;

      this.coversationarray.length = 0;

      for (let i = 0; i < Chatconversation.length; i++) {

        if (Chatconversation[i].sender == 'Patient') {
          this.coversationarray.push({
            chatmsg: Chatconversation[i].mobileMessage, time: Chatconversation[i].mobileTime, user: 'pat', msgtype: Chatconversation[i].messageType
          })
        }
        if (Chatconversation[i].sender == 'Diagnostic') {
          this.coversationarray.push({ chatmsg: Chatconversation[i].mobileMessage, time: Chatconversation[i].mobileTime, user: 'doc', msgtype: Chatconversation[i].messageType })
        }
      }
    })
  }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.getPreviousChat();

      // var objDiv = document.getElementById("chatboxdiv");
      // objDiv!.scrollTop = objDiv!.scrollHeight;


    });
  }

  chatconversation: any;
  serverdateandtime: any;
  servertime: any;
  serverdate: any;
  public getserverdateandtime() {

    this.DiagnosticService.GetServerDateAndTime().subscribe(
      data => {

        this.serverdateandtime = data;
        this.servertime = this.serverdateandtime.presentTime,
          this.serverdate = this.serverdateandtime.todaydate
      }, error => {
      }
    )
  }

  public InsertChatDetails() {
    let conversation = '[doc:-' + this.chatconversation + ';time:-' + this.servertime + ']';
    ;

    var entity = {
      'ChatID': this.chatID,
      'Message': conversation,
      'SenderID': this.Details[0].diagnosticCenterID,
      'Sender': 'Diagnostic',
      'MessageType': 1,
      'MobileMessage': this.chatconversation,
      'MobileTime': this.servertime
    }
    this.DiagnosticService.InsertDiagnostic_ChatDetails(entity).subscribe(data => {

      if (data != 0) {

      }
      this.chatconversation = "";

      this.getPreviousChat();



    })

  }


  closeChat() {
    
  this.closechatMessage.emit()
  }
}
