import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Labels from '../../../Lables/Doctors/myAppointments.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-doctor-chat',
  templateUrl: './doctor-chat.component.html',
  styleUrls: ['./doctor-chat.component.css']
})
export class DoctorChatComponent implements OnInit {

  constructor(private DoctorService: DoctorService,private SharedService:SharedService) { }
  @Input() Details: any = [];
  @Output() closechatMessage: EventEmitter<any> = new EventEmitter();
  loader: boolean | undefined;
  languageID: any;
  doctorID: any;
  patientID: any;
  appointmentID: any;
  chatID: any;
  coversationarray: any = [];
  servertime: any;
  serverdate: any;
  serverdateandtime: any;
  public chatconversation = "";
  labels:any;
  currentUrl:any;


  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorID = sessionStorage.getItem('userid');
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    this.dosendmsg();

    this.oberserableTimer()
  }


  public getserverdateandtime() {

    this.DoctorService.GetServerDateAndTime().subscribe(
      data => {
        this.serverdateandtime = data;
        this.servertime = this.serverdateandtime.presentTime,
          this.serverdate = this.serverdateandtime.todaydate
      }, error => {
         this.SharedService.insertexceptions(this.currentUrl,"GetServerDateAndTime",error);
      }
    )
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
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertChatMaster",error);
    })


  }











  public getPreviousChat() {
    
    this.DoctorService.GetDoctor_ChatDetailsMobileWeb(this.chatID).subscribe(res => {
      let Chatconversation = res;
      this.coversationarray.length = 0;

      for (let i = 0; i < Chatconversation.length; i++) {

        if (Chatconversation[i].sender == 'Patient') {
          this.coversationarray.push({
            chatmsg: Chatconversation[i].mobileMessage, time: Chatconversation[i].mobileTime, user: 'pat', msgtype: Chatconversation[i].messageType
          })
        }

        if (Chatconversation[i].sender == 'Doctor') {
          this.coversationarray.push({ chatmsg: Chatconversation[i].mobileMessage, time: Chatconversation[i].mobileTime, user: 'doc', msgtype: Chatconversation[i].messageType })
        }
      }
    })

    var objDiv = document.getElementById("chatboxdiv") as HTMLElement;
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {

      if (this.chatID != undefined || this.chatID != null) {
        this.getPreviousChat();

  
      }

    });
  }



  public InsertChatDetails() {
    this.getserverdateandtime()
    
    let conversation = '[doc:-' + this.chatconversation + ';time:-' + this.servertime + ']';
    var entity = {
      'ChatID': this.chatID,
      'Message': conversation,
      'SenderID': this.doctorID,
      'Sender': 'Doctor',
      'MessageType': 1,
      'MobileMessage': this.chatconversation,
      'MobileTime': this.servertime
    }
    this.DoctorService.InsertChatDetails(entity).subscribe(data => {

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
