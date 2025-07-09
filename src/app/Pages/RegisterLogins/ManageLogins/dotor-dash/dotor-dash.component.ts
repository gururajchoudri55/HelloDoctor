import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/Pages/services/common.service';

@Component({
  selector: 'app-dotor-dash',
  templateUrl: './dotor-dash.component.html',
  styleUrls: ['./dotor-dash.component.css'],
})
export class DotorDashComponent implements OnInit {
  loader: boolean | undefined;
  languageid: any;
  pinno: any;
  hospitalclinicid: any;
  currentpwd: any;
  countrymanaerid: any;
  showeditbutton: any;
  doctorloginlist: any;
  Showpassword: any;
  count: any;
  dummdcotorlogins: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  p: any;
  id: any;
  username: any;
  oldpassword: any;
  mypinno: any;
  password: any;
  pp: any;
  Enteredpinno: any;
  entercurrentpwd: any;
  search: any;
  firstname: any;
  lastname: any;
  phoneno: any;
  email: any;
  roleid: any;
  labels: any;
  currentUrl: any;
  showMsg: number = 0;
  filterdata: any;
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
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.currentpwd = sessionStorage.getItem('Password');
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    if (this.countrymanaerid != undefined) {
      this.showeditbutton = 1;
    } else {
      this.showeditbutton = 0;
    }
    this.getdoctorloginfordash();

    this.Showpassword = 1;
  }

  public getdoctorloginfordash() {
    if (this.hospitalclinicid == undefined) {
      this.RegisterService.GetDoctorLoginForDash(this.languageid).subscribe(
        (data) => {
          this.loader = false;
          this.doctorloginlist = data;
          this.activedoctorloginlist = this.doctorloginlist;
          this.filterdata = this.doctorloginlist;
          console.log('doclist', this.doctorloginlist);
          this.count = this.doctorloginlist.length;
        },

        (error) => {
          this.loader = false;
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetDoctorLoginForDash',
            error
          );
        }
      );
    } else if (this.hospitalclinicid != undefined) {
      this.RegisterService.GetDoctorLoginForDash(this.languageid).subscribe(
        (data) => {
          this.loader = false;
          this.dummdcotorlogins = data;
          this.doctorloginlist = this.dummdcotorlogins.filter(
            (x: { hospitalClinicID: any }) =>
              x.hospitalClinicID == this.hospitalclinicid
          );
          this.activedoctorloginlist = JSON.parse(
            JSON.stringify(this.doctorloginlist)
          );
          this.count = this.doctorloginlist.length;
        },
        (error) => {
          this.loader = false;
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetDoctorLoginForDash',
            error
          );
        }
      );
    }
  }

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  public disabledoctor(docid: any) {
    this.showPopup = 0;
    this.loader = true;
    this.RegisterService.DisableDoctorLogin(docid).subscribe(
      (data) => {
        this.loader = false;
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.getdoctorloginfordash();
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'DisableDoctorLogin',
          error
        );
      }
    );
  }

  public enabledoctor(id: any) {
    this.loader = true;
    this.showPopup = 0;
    this.RegisterService.EnableDoctorLogin(id).subscribe(
      (data) => {
        this.loader = false;
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.getdoctorloginfordash();
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'EnableDoctorLogin',
          error
        );
      }
    );
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
    if (this.password != undefined) {
      var valpassword = this.RegisterService.strongpassword(this.password);
      if (valpassword == false) {
        this.pp = 1;
      } else {
        this.loader = true;
        var entity = {
          ID: this.id,
          UserName: this.username,
          Password: this.password,
        };

        this.username = '';
        this.password = '';
        this.RegisterService.UpdateDoctorLogins(entity).subscribe(
          (data) => {
            this.pp = 0;
            this.showPopup = 1;
            this.messageID = 25;
            this.typeofPopUp = 1;
            this.getdoctorloginfordash();
            document.getElementById('close')?.click();
          },
          (error) => {
            this.loader = false;
            this.SharedService.insertexceptions(
              this.currentUrl,
              'UpdateDoctorLogins',
              error
            );
          }
        );
      }
    }
  }

  //Checkpassword
  public CheckPasswordvalidate() {
    this.showPopup = 0;
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

  //Update Details

  public Updatedetails() {
    var entity = {
      ID: this.id,
      FirstName: this.firstname,
      LastName: this.lastname,
      PhoneNo: this.phoneno,
      Email: this.email,
      UserName: this.username,
      Password: this.password,
      RoleID: this.roleid,
    };
    this.RegisterService.UpdateUsers_RoleMapping(entity).subscribe(
      (data) => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdateUsers_RoleMapping',
          error
        );
      }
    );
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
    this.Enteredpinno = '';
    this.entercurrentpwd = '';
  }

  // sendmail(details: any) {
  //   this.showPopup = 0;
  //   this.SharedService.SendEmailSmsToProvider(
  //     details.pinno,
  //     details.userName,
  //     details.password,
  //     details.smsmobileno,
  //     details.emailID,
  //     details.doctorName
  //   );

  //   this.showPopup = 1;
  //   this.typeofPopUp = 1;
  //   this.messageID = 76;
  // }

  removeHash(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode == 35 || charCode == 38) {
      this.showMsg = 1;

      return false;
    }
    this.showMsg = 0;
    return true;
  }
  async searchFor(even: any) {
    this.doctorloginlist = this.filterdata.filter(
      (x: { hidden: any }) => x.hidden == even.target.value
    );
  }
  selectedValue: any;
  activedoctorloginlist: any;
  public GetActiveID(event: any) {
    debugger;
    debugger;
    this.selectedValue = event.target.value;
    this.doctorloginlist = this.activedoctorloginlist?.filter(
      (x: { enabledisble: any }) => x.enabledisble == this.selectedValue
    );
    this.count = this.doctorloginlist.length;
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
