import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import Labels from '../../../Lables/Doctors/myAppointments.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
@Component({
  selector: 'app-pharmacy-chat',
  templateUrl: './pharmacy-chat.component.html',
  styleUrls: ['./pharmacy-chat.component.css']
})
export class PharmacyChatComponent implements OnInit {

  constructor(private PharmacyService: PharmacyService,private SharedService:SharedService) { }

  @Input() Details: any;
  @Output() closechatMessage: EventEmitter<any> = new EventEmitter();
  pharmacyID: any;
  chatID: any;
  coversationarray: any = [];
  chatconversation: any;
  image: any = 0;
  public imageurl: any;
  serverdateandtime: any;
  servertime: any;
  serverdate: any;
  languageID: any;
  labels: any;

  ngOnInit(): void {
    this.pharmacyID = sessionStorage.getItem('pharmacyid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getChat();
    this.getserverdateandtime();
    this.oberserableTimer();
    this.SharedService.sendPharmacySMS(this.Details, 15, 4)
    
  }



  public getserverdateandtime() {

    this.PharmacyService.GetServerDateAndTime().subscribe(
      data => {

        this.serverdateandtime = data;
        this.servertime = this.serverdateandtime.presentTime,
          this.serverdate = this.serverdateandtime.todaydate
      }, error => {
      }
    )
  }


  public getChat() {
  
    this.PharmacyService.GetPharmacyChatID(this.pharmacyID, this.Details.patientID, this.Details.id).subscribe(res => {
      
      if (res.length > 0) {
        this.chatID = res[0].chatID;
        // this.InsertChatDetails();
        this.getPreviousChat();
      }
      else {
        var entity = {
          'PharmacyID': this.pharmacyID,
          'PatientID': this.Details.patientID,
          'AppointmentID': this.Details.id
        }
        this.PharmacyService.InserPharmacy_ChatMaster(entity).subscribe(data => {

          if (data != 0) {
            this.chatID = data;
            // this.InsertChatDetails();
            this.getPreviousChat();
          }
        })
      }
    })
  }




  public getPreviousChat() {
    this.PharmacyService.GetPharmacy_ChatDetails(this.chatID).subscribe(res => {
      let Chatconversation = res;

      this.coversationarray.length = 0;
      this.coversationarray = [];

      for (let i = 0; i < Chatconversation.length; i++) {

        if (Chatconversation[i].chatConversation.includes('[doc:-')) {

          var msg = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("[doc:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf(";")
          );
          var chattime = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 7 + 8
          );

          this.coversationarray.push({ user: 'doc', chatmsg: msg, time: chattime, msgtype: Chatconversation[i].messageType })
        }
        else if (Chatconversation[i].chatConversation.includes('[pat:-')) {

          var msg = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("[pat:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf(";")
          );
          var chattime = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 7 + 8
          );
          this.coversationarray.push({ user: 'pat', chatmsg: msg, time: chattime, msgtype: Chatconversation[i].messageType })
        }
        else {

          if (Chatconversation[i].sender == 'Patient') {
            this.coversationarray.push({ user: 'pat', chatmsg: Chatconversation[i].chatConversation, time: chattime, msgtype: Chatconversation[i].messageType })
          }
          if (Chatconversation[i].sender == 'Pharmacy') {
            this.coversationarray.push({ user: 'doc', chatmsg: Chatconversation[i].chatConversation, time: chattime, msgtype: Chatconversation[i].messageType })
          }
        }
      }

    })
  }




  public InsertChatDetails() {
    let conversation = '[doc:-' + this.chatconversation + ';time:-' + this.servertime + ']';


    var entity = {
      'ChatID': this.chatID,
      'Message': conversation,
      'SenderID': this.pharmacyID,
      'Sender': 'Pharmacy',
      'MessageType': 1,
      'MobileMessage': this.chatconversation,
      'MobileTime': this.servertime
    }
    this.PharmacyService.InsertPharmacy_ChatDetails(entity).subscribe(data => {

      if (data != 0) {

      }


      this.chatconversation = "";
      this.image = 0;
      this.getPreviousChat();

    })
  }

  closeChat() {
    
    this.closechatMessage.emit()
  }
  
  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.getPreviousChat();

      // var objDiv = document.getElementById("chatboxdiv");
      // objDiv!.scrollTop = objDiv!.scrollHeight;


    });
  }


}
