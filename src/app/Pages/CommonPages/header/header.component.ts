import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../Lables/Login/loginlabels.json'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  time: any;
  hh: any;
  mm: any;
  ampm: any;
  page: any;
  LanguageID: any;
  showSidebar: any;
  pharmacyid: any;
  roleid: any;
  doctorid: any;
  nurseid: any;
  midwifeid: any;
  physioid: any;
  supportid: any;
  countrymanagersid: any;
  diagnosticcenterid: any;
  recpid: any;
  temp: any;
  doctorNotifications: any;
  notificationcount: any;
  loader: boolean | undefined;
  dateList: any;
  hours: any;
  minutes: any;
  seconds: any;
  labels: any;
  isMobileResolution: boolean | undefined;
  isDescktopResolution: boolean | undefined;
  melodySound: boolean = true;
  showIcon: boolean | undefined

  constructor(private CommonService: CommonService, private DoctorService: DoctorService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.notificationcount = 0;
    this.LanguageID = sessionStorage.getItem('LanguageID');
    this.labels = this.LanguageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.showSidebar = 1;
    sessionStorage.setItem('showSidebar', '1');
    this.temp = sessionStorage.getItem('temp');
    if (this.temp == '1') {
      this.pharmacyid = sessionStorage.getItem('pharmacyid');
      this.roleid = sessionStorage.getItem('roleid');
      this.doctorid = sessionStorage.getItem('userid');
      this.nurseid = sessionStorage.getItem('nurseid');
      this.midwifeid = sessionStorage.getItem('midwifeid');
      this.physioid = sessionStorage.getItem('physioid');
      this.supportid = sessionStorage.getItem('supportid');
      this.countrymanagersid = sessionStorage.getItem('Commacountryid');
      this.recpid = sessionStorage.getItem('recpid');
      this.diagnosticcenterid = sessionStorage.getItem('diagnosticid');

      this.oberserableTimer();
      this.notification()
    }


  }



  notification() {
    if (this.doctorid != null && this.doctorid != undefined) {
      const source = timer(1000, 10000);
      const abc = source.subscribe(val => {
        this.GetDocnoti();
        this.GetShowPopupNotiFications()

      })
    }
  }



  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {

      this.getserverdateandtime()
      if (this.doctorid != null && this.doctorid != undefined) {
        this.showIcon = true;
        this.GetDoctorNotifications();


        // this.GetDoctorNotifications();
      }
      else if (this.nurseid != null && this.nurseid != undefined) {

        this.DoctorService.GetNotifications_NPMWebCOunt(this.nurseid, 25, this.LanguageID).subscribe
          (datas => {

            this.doctorNotifications = datas;
            this.notificationcount = this.doctorNotifications.length;
          })
      }
      else if (this.midwifeid != null && this.midwifeid != undefined) {
        this.DoctorService.GetNotifications_NPMWebCOunt(this.midwifeid, 27, this.LanguageID).subscribe
          (datas => {
            this.doctorNotifications = datas;
            console.log(datas)
            this.notificationcount = this.doctorNotifications.length;
          })
      }
      else if (this.physioid != null && this.physioid != undefined) {
        this.DoctorService.GetNotifications_NPMWebCOunt(this.physioid, 26, this.LanguageID).subscribe
          (datas => {
            this.doctorNotifications = datas;
            this.notificationcount = this.doctorNotifications.length;
          })
      }
      else if (this.supportid != null && this.supportid != undefined) {
        this.DoctorService.GetSupportForWebNotifications(this.LanguageID).subscribe
          (datas => {
            this.doctorNotifications = datas;
            this.notificationcount = this.doctorNotifications.length;
          })
      }
      else if (this.diagnosticcenterid != null && this.diagnosticcenterid != undefined) {
        this.showIcon = true;
        this.DoctorService.GetNotificationssss(this.diagnosticcenterid).subscribe
          (datas => {

            this.doctorNotifications = datas;
            console.log("souds", this.doctorNotifications)
            this.notificationcount = this.doctorNotifications.length;
          })
      }
      // else if (this.pharmacyid != null && this.pharmacyid != undefined) {
      //   this.docservice.GetNotification_Pharmacy(this.pharmacyid).subscribe
      //     (datas => {
      //       this.notificationcount = 0;
      //       this.doctorNotifications = datas;
      //       this.notificationcount = Number(this.pharmcunoti[0].notifycount);
      //       // Swal.fire('New Notifications');
      //     })
      // }
      else if (this.countrymanagersid != null && this.countrymanagersid != undefined) {
        this.CommonService.GetNotifications(this.countrymanagersid, this.LanguageID).subscribe
          (datas => {
            this.notificationcount = 0;
            this.doctorNotifications = datas;
            this.notificationcount = this.doctorNotifications.length;
            this.loader = false
            // Swal.fire('New Notifications');
          })
      }
      else if (this.pharmacyid != null && this.pharmacyid != undefined) {
        this.showIcon = true;
        this.GetPharmacyNotifications()
      }

    });
  }


  public GetPharmacyNotifications() {

    this.CommonService.GetNotification_Pharmacy(this.pharmacyid).subscribe
      (datas => {

        this.notificationcount = 0;
        this.doctorNotifications = datas;
        this.notificationcount = this.doctorNotifications.length;

        let list = datas.filter(x => x.soundSeen == 0)


        for (let i = 0; i < list.length; i++) {
          if (this.melodySound == true) {
            let audio = new Audio();
            audio.src = "assets/music/noti.mp3";
            audio.load();
            audio.play();
          }

          this.toastrService.success(
            list[0].description,
            list[0].notification);

          this.CommonService.UpdateSoundSeen(list[i].id).subscribe(data => {

          })

        }



      })


  }



  public GetDoctorNotifications() {
    this.DoctorService.GetNotifications_DoctorByDoctorID(this.doctorid).subscribe(data => {
      this.doctorNotifications = data;
      this.notificationcount = this.doctorNotifications.length;

      // this.toastrService.success(
      //   'this.message',
      //  ''
      // );

    })
  }



  logOut() {
    let loginid = sessionStorage.getItem('loginid');
    if (loginid != undefined || loginid != null) {
      this.updateProvidersAuditReport()
    }
    else {
      sessionStorage.clear()
      sessionStorage.clear()
      location.href = '#/login';
      location.reload();
    }

  }


  updateProvidersAuditReport() {
    this.CommonService.UpdateProvidersAuditReport(sessionStorage.getItem('loginid')).subscribe(data => {
      sessionStorage.clear();
      sessionStorage.clear();
      location.href = "#/login";
      location.reload();

    })
  }



  open() {
    this.showSidebar = 1;
    sessionStorage.setItem('showSidebar', this.showSidebar);
  }

  close() {
    this.showSidebar = 0;
    sessionStorage.setItem('showSidebar', this.showSidebar);
  }





  changeLanguageID(even: any) {
    this.loader = true;
    this.LanguageID = even.target.value;
    sessionStorage.setItem('LanguageID', this.LanguageID);
    location.reload();
    this.loader = false;
  }


  docnotificationList: any;


  public GetDocnoti() {


    this.CommonService.GetNotifications_DoctorByDoctorIDTop1(this.doctorid).subscribe(data => {
      this.docnotificationList = data;
    })


  }



  public GetShowPopupNotiFications() {

    this.CommonService.GetNotifications_DoctorByDoctorIDShowNoti(this.doctorid).subscribe(data => {
      var data = data;

      console.log("dataaaa", data)

      for (let i = 0; i < data.length; i++) {

        if (this.melodySound == true) {
          let audio = new Audio();
          audio.src = "assets/music/notification.mpeg";
          audio.load();
          audio.play();
        }

        this.toastrService.success(
          data[0].description,
          data[0].notification);

        this.CommonService.UpdateNotifications_DoctorNotiSeen(data[i].id).subscribe(data => {

        })

      }

      // this.notificationcount = data[0].notifycount;
    })


  }


  //doctor seen notification

  public updateseenbit(id: any) {
    
    this.DoctorService.UpdateNotifications_DoctorSeenBit(id).subscribe(
      data => {
        

        this.oberserableTimer()


      }, error => {
      }
    )
  }


  public getserverdateandtime() {

    this.CommonService.GetServerDateAndTime().subscribe(
      data => {
        this.dateList = data;

        this.hours = this.dateList.hours,
          this.minutes = this.dateList.minutes,
          this.seconds = this.dateList.seconds
      }, error => {
      }
    )
  }


  public updateseenbitcontrymanager(id: any) {
    
    this.loader = true;
    this.CommonService.updateseenbitcontrymanager(id).subscribe(data => {

    })
  }
  enableMelody(value: boolean) {
    this.melodySound = value;
    this.GetShowPopupNotiFications()
  }
}


