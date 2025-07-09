import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { CommonService } from 'src/app/Pages/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctor-dash-details',
  templateUrl: './doctor-dash-details.component.html',
  styleUrls: ['./doctor-dash-details.component.css'],
})
export class DoctorDashDetailsComponent implements OnInit {
  constructor(
    private RegisterService: RegisterService,
    private SharedService: SharedService,
    private CommonService: CommonService
  ) {}

  doctorID: any;
  languageid: any;
  hospitalclinicid: any;
  doctorList: any;
  docdd: any;
  dummdoctorList: any;
  password: any;
  userName: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  labels: any;
  selectdoctor: any;
  search: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.selectdoctor = this.labels.selectDoctor;
    this.search = this.labels.search;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    if (this.hospitalclinicid == undefined) {
      this.RegisterService.GetDoctorRegistratingLogins(
        this.languageid
      ).subscribe(
        (data) => {
          this.doctorList = data;
          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetDoctorRegistratingLogins',
            error
          );
        }
      );
    } else if (this.hospitalclinicid != undefined) {
      this.RegisterService.GetDoctorRegistratingLogins(
        this.languageid
      ).subscribe(
        (data) => {
          this.dummdoctorList = data;
          this.doctorList = this.dummdoctorList.filter(
            (x: { hospitalClinicID: any }) =>
              x.hospitalClinicID == this.hospitalclinicid
          );

          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetDoctorRegistratingLogins',
            error
          );
        }
      );
    }

    // this.getdoctorloginfordash();
  }

  public GetDoctorID(item2: any) {
    this.doctorID = item2.id;
  }

  public async insertDetails() {
    debugger;
    this.showPopup = 0;
    this.password = this.RegisterService.generateRandomPassword();
    console.log('password', this.password);

    if (this.doctorID == undefined) {
      this.showPopup = 1;
      this.messageID = 16;
      this.typeofPopUp = 2;
    } else {
      var entity = {
        DoctorID: this.doctorID,
        UserName: this.userName,
        Password: this.password,
      };
      this.RegisterService.InsertDoctorLogin(entity).subscribe(
        async (data) => {
          if (data != 0) {
            this.showPopup = 1;
            this.messageID = 1;
            this.typeofPopUp = 1;
            location.href = '#/Registerlogins/DotorDash';
            await this.getdoctorloginfordash();
          } else {
            this.showPopup = 1;
            this.messageID = 15;
            this.typeofPopUp = 2;
          }
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'InsertDoctorLogin',
            error
          );
        }
      );
    }
  }

  pinno: any;
  email: any;
  doctorname: any;
  smsmobileno: any;
  async getdoctorloginfordash() {
    debugger;
    this.RegisterService.GetDoctorLoginForDash(this.languageid).subscribe(
      async (data) => {
        var list = data.filter(
          (x: { doctorID: any }) => x.doctorID == this.doctorID
        );
        (this.pinno = list[0].pinno),
          (this.email = list[0].emailID),
          (this.doctorname = list[0].doctorName),
          (this.smsmobileno = list[0].smsmobileno);
        // await this.sendmail();
        // await this.SendTwiliSms()
        this.sendmail();
        this.sendingSMS();

        // this.SharedService.SendEmailSmsToProvider(
        //   this.pinno,
        //   this.userName,
        //   this.password,
        //   this.smsmobileno,
        //   this.email,
        //   this.doctorname
        // );
        return true;
      },
      (error) => {}
    );
  }
  emailSubject: any;
  smsDesc: any;
  emailattchementurl: any = [];
  cclist: any = [];
  bcclist: any = [];
  emailDesc: any;

  public sendmail() {
    if (this.languageid == 1) {
      this.emailSubject = 'Welcome to Voiladoc';
      this.emailDesc =
        'Dear ' +
        this.userName +
        ',' +
        '<br><br>' +
        'Thank You For Registering Voiladoc Plaform. Here are your login details. ' +
        '<br><br>' +
        'Voiladoc pro web link : ' +
        (environment.production
          ? ' ://madagascar.voiladoc-eastafrica.com/#/'
          : 'https://madagascar.voiladoc-eastafrica.com/madagascarLatest/') +
        '<br>' +
        'Pin code  : ' +
        this.pinno +
        '<br>' +
        'UserName :' +
        this.userName +
        '<br>' +
        'Password : ' +
        this.password +
        '<br><br>' +
        'Please do not share your login credentials with anyone. Contact our helpline on +261 340795048 or Email us at support@voiladoc.mg ';
      '<br><br>' +
        'Regards,' +
        '<br>' +
        'Voiladoc Team' +
        '<br>' +
        'www.voiladoc.mg';
    } else {
      this.emailSubject = 'Bienvenue sur Voialdoc ';
      this.emailDesc =
        'Cher ' +
        this.userName +
        ',' +
        '<br><br>' +
        'Merci de vous être inscrit sur Voiladoc. Voici vos identifiants de connexion. ' +
        '<br><br>' +
        'Lien web Voiladoc pro : ' +
        (environment.production
          ? 'https://madagascar.voiladoc-eastafrica.com/#/'
          : 'https://madagascar.voiladoc-eastafrica.com/madagascarLatest/') +
        '<br>' +
        'Code PIN  : ' +
        this.pinno +
        '<br>' +
        "Nom d'utilisateur :" +
        this.userName +
        '<br>' +
        'Mot de passe : ' +
        this.password +
        '<br><br>' +
        "Veuillez ne pas partager vos identifiants de connexion avec qui que ce soit. Contactez notre ligne d'assistance au +261 340795048 ou envoyez-nous un e-mail à support@voiladoc.mg" +
        '<br><br>' +
        'Meilleures salutations,' +
        '<br>' +
        'Team Voiladoc' +
        '<br>' +
        'www.voiladoc.mg';
    }
    var entity = {
      emailto: this.email,
      emailsubject: this.emailSubject,
      emailbody: this.emailDesc,
      attachmenturl: this.emailattchementurl,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.CommonService.sendemail(entity).subscribe(
      async (data) => {
        console.log('email respone', data);
      },
      (error) => {
        console.log('email respone', error);
      }
    );
  }
  public sendingSMS() {
    if (this.languageid == 1) {
      var sub = `Welcome to Voiladoc  Pin code: ${this.pinno}  UserName:${this.userName}  Password:${this.password}`;
    } else {
      var sub = `Bienvenue sur Voialdoc  Code PIN:${this.pinno}  Nom dutilisateur:${this.userName} Mot de passe:${this.password}`;
    }
    // return true;
    this.CommonService.SendTwillioSMS(this.smsmobileno, sub).subscribe(
      async (data) => {
        console.log('Sms success', data);
        return true;
      },
      (error) => {
        console.log('sms failure', error);
      }
    );
  }
}
