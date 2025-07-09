import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/Pages/services/common.service';

@Component({
  selector: 'app-pharmacy-dash',
  templateUrl: './pharmacy-dash.component.html',
  styleUrls: ['./pharmacy-dash.component.css'],
})
export class PharmacyDashComponent implements OnInit {
  loader: boolean | undefined;
  languageid: any;
  pinno: any;
  currentpwd: any;
  countrymanaerid: any;
  showeditbutton: any;
  pharmacyList: any;
  search: any;
  p: any;
  id: any;
  username: any;
  oldpassword: any;
  mypinno: any;
  Showpassword: any;
  showPopup: any;
  password: any;
  pp: any;
  messageID: any;
  typeofPopUp: any;
  Enteredpinno: any;
  entercurrentpwd: any;
  count: any;
  firstname: any;
  lastname: any;
  phoneno: any;
  email: any;
  roleid: any;
  labels: any;
  currentUrl: any;
  showMsg: number = 0;

  constructor(
    private RegisterService: RegisterService,
    private SharedService: SharedService,
    private CommonService: CommonService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.pinno = sessionStorage.getItem('Pinno');
    this.currentpwd = sessionStorage.getItem('Password');
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    if (this.countrymanaerid != undefined) {
      this.showeditbutton = 1;
    } else {
      this.showeditbutton = 0;
    }
    this.getpharmacyloginfordash();
  }

  public getpharmacyloginfordash() {
    this.RegisterService.GetPharmacyLoginForDash(this.languageid).subscribe(
      (data) => {
        this.loader = false;
        this.pharmacyList = data;
        this.count = this.pharmacyList.length;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPharmacyLoginForDash',
          error
        );
      }
    );
  }

  public disablepharmacy(id: any) {
    this.showPopup = 0;
    this.RegisterService.DisablePharmacyLogin(id).subscribe(
      (data) => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.getpharmacyloginfordash();
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'DisablePharmacyLogin',
          error
        );
      }
    );
  }
  public enablepharmacy(id: any) {
    this.RegisterService.EnablePharmacyLogin(id).subscribe(
      (data) => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.getpharmacyloginfordash();
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'EnablePharmacyLogin',
          error
        );
      }
    );
  }

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  public GetDeatsils(details: any) {
    (this.id = details.id),
      (this.username = details.userName),
      (this.oldpassword = details.password),
      (this.mypinno = details.pinno);
    this.Showpassword = 0;
  }

  public insertdetails() {
    this.showPopup = 0;
    this.loader = true;
    if (this.password != undefined) {
      var valpassword = this.RegisterService.strongpassword(this.password);
      if (valpassword == false) {
        this.pp = 1;
        this.loader = false;
      } else {
        var entity = {
          ID: this.id,
          UserName: this.username,
          Password: this.password,
        };

        this.username = '';
        this.password = '';
        this.RegisterService.UpdatePharmacyAdminRegistration(entity).subscribe(
          (data) => {
            this.pp = 0;
            this.showPopup = 1;
            this.messageID = 25;
            this.typeofPopUp = 1;
            this.getpharmacyloginfordash();
            document.getElementById('close')?.click();
          },
          (error) => {
            this.loader = false;
            this.SharedService.insertexceptions(
              this.currentUrl,
              'UpdatePharmacyAdminRegistration',
              error
            );
          }
        );
      }
    }
  }

  //Checkpassword

  public CheckPasswordvalidate() {
    if (this.Enteredpinno == '' || this.entercurrentpwd == '') {
      this.entercurrentpwd = '';
      this.Enteredpinno = '';
      this.showPopup = 1;
      this.messageID = 26;
      this.typeofPopUp = 2;
    } else {
      if (
        this.pinno == this.Enteredpinno &&
        this.currentpwd == this.entercurrentpwd
      ) {
        this.Showpassword = 1;
        this.Enteredpinno = '';
        this.entercurrentpwd = '';
      } else {
        this.showPopup = 1;
        this.messageID = 27;
        this.typeofPopUp = 2;
      }
    }
  }

  //Get Password
  public getpassword(details: any) {
    (this.oldpassword = details.password),
      (this.mypinno = details.pinno),
      (this.id = details.id),
      (this.firstname = details.firstName),
      (this.lastname = details.lastName),
      (this.phoneno = details.phoneNo),
      (this.email = details.email),
      (this.username = details.userName),
      (this.roleid = details.roleID);
    this.Showpassword = 0;
  }

  removeHash(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode == 35 || charCode == 38) {
      this.showMsg = 1;

      return false;
    }
    this.showMsg = 0;
    return true;
  }

  emailSubject: any;
  smsDesc: any;
  emailattchementurl: any = [];
  cclist: any = [];
  bcclist: any = [];
  emailDesc: any;
  UserName: any;
  Password: any;
  smsmobileno: any;
  EmailID: any;
  Doctorname: any;
  public sendmail(details: any) {
    this.loader = true;
    debugger;
    (this.pinno = details.pinno),
      (this.UserName = details.userName),
      (this.Password = details.password),
      (this.smsmobileno = details.smsmobileno),
      (this.EmailID = details.emailID),
      (this.Doctorname = details.doctorName);
    if (this.languageid == 1) {
      this.emailSubject = 'Welcome to Voiladoc';
      this.emailDesc =
        'Dear ' +
        this.UserName +
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
        this.UserName +
        '<br>' +
        'Password : ' +
        this.Password +
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
        this.UserName +
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
        this.UserName +
        '<br>' +
        'Mot de passe : ' +
        this.Password +
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
      emailto: this.EmailID,
      emailsubject: this.emailSubject,
      emailbody: this.emailDesc,
      attachmenturl: this.emailattchementurl,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.CommonService.sendemail(entity).subscribe(
      async (data) => {
        console.log('email respone', data);
        this.messageID = 76;
        this.showPopup = 1;
        this.typeofPopUp = 1;
        this.loader = false;
      },
      (error) => {
        console.log('email respone', error);
      }
    );
  }
  public sendingSMS() {
    if (this.languageid == 1) {
      var sub = `Welcome to Voiladoc  Pin code: ${this.pinno}  UserName:${this.UserName}  Password:${this.Password}`;
    } else {
      var sub = `Bienvenue sur Voialdoc  Code PIN:${this.pinno}  Nom dutilisateur:${this.UserName} Mot de passe:${this.Password}`;
    }
    // return true;
    this.CommonService.SendTwillioSMS(this.phoneno, sub).subscribe(
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
