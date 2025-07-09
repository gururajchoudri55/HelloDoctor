import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { SharedService } from '../../services/shared.service';
import Labels from '../../Lables/Login/loginlabels.json';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loader: boolean | undefined;

  constructor(private CommonService: CommonService, private SharedService: SharedService) { }
  rolelist: any;
  languageid: any;
  labels: any;
  pinno: any;
  public uname: any;
  result: any;
  id: any;
  emailid: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  currentUrl: any;
  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getroletypemaster()
  }


  public dummrolelist: any;

  public getroletypemaster() {

    this.CommonService.GetRoleTypesMasterBYIDForgotpassword(this.languageid).subscribe(
      data => {
        this.rolelist = data;
        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetRoleTypesMasterBYIDForgotpassword", error);
        this.loader = false;
      }
    )
  }
  roleid: any;
  public onchangeFunction(even: any) {

    this.roleid = even.target.value;

  }

  name: any;
  smsmobileno: any;



  public login() {
    this.showPopup = 0;
    if (this.roleid == null || this.roleid == undefined || this.roleid == "") {

      this.showPopup = 1;
      this.messageID = 2;
      this.typeofPopUp = 2;
    }
    else if (this.uname == null || this.pinno == undefined) {
      this.showPopup = 1;
      this.messageID = 43;
      this.typeofPopUp = 2;
    }
    else {

      if (this.roleid == "2") {
        this.loader = true;

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.CommonService.Authenicate(entity).subscribe((data: any) => {

          if (data['requestMessage'] != undefined || null) {

            sessionStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.CommonService.GetAllProvidersByPinAndUname(this.pinno, this.uname, 1).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = this.CommonService.generateRandomPassword();
                  console.log("password", this.password)

                  var smsdesc = "Your New Password is : " + this.password
                  // this.SendTwiliSms(smsdesc)

                  this.sendmail(1)
                  // location.reload();
                } else {

                  this.showPopup = 1;
                  this.messageID = 43;
                  this.typeofPopUp = 2;
                  this.uname = "";
                  this.pinno = "";
                  this.loader = false

                }
              }, error => {
                this.SharedService.insertexceptions(this.currentUrl, "GetAllProvidersByPinAndUname", error);
              }
            )
          }
        })
      }
      if (this.roleid == "3") {
        this.loader = true;
        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.CommonService.Authenicate(entity).subscribe((data: any) => {

          if (data['requestMessage'] != undefined || null) {

            sessionStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.CommonService.GetAllProvidersByPinAndUname(this.pinno, this.uname, 8).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = this.CommonService.generateRandomPassword();
                  console.log("password", this.password)
                  var smsdesc = "Your New Password is : " + this.password

                  this.password = this.CommonService.generateRandomPassword();
                  console.log("password", this.password)

                  this.SendTwiliSms(smsdesc)
                  this.sendmail(8)
                  // location.reload();
                } else {

                  this.showPopup = 1;
                  this.messageID = 43;
                  this.typeofPopUp = 2;
                  this.uname = "";
                  this.pinno = "";
                  this.loader = false;
                }
              }, error => {
                this.SharedService.insertexceptions(this.currentUrl, "GetAllProvidersByPinAndUname", error);
              }
            )
          }
        })
      }

      if (this.roleid == "4") {
        this.loader = true;

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.CommonService.Authenicate(entity).subscribe((data: any) => {

          if (data['requestMessage'] != undefined || null) {

            sessionStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.CommonService.GetAllProvidersByPinAndUname(this.pinno, this.uname, 6).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name,
                    this.smsmobileno = this.result[0].smsmobileno
                    this.password = this.CommonService.generateRandomPassword();
                    console.log("password", this.password)
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.sendmail(6)
                  // location.reload();
                } else {

                  this.showPopup = 1;
                  this.messageID = 43;
                  this.typeofPopUp = 2;
                  this.uname = "";
                  this.pinno = "";
                  this.loader = false;

                }
              }, error => {
                this.SharedService.insertexceptions(this.currentUrl, "GetAllProvidersByPinAndUname", error);
              }
            )
          }
        })
      }
      if (this.roleid == "5") {
        this.loader = true;
        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.CommonService.Authenicate(entity).subscribe((data: any) => {

          if (data['requestMessage'] != undefined || null) {

            sessionStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.CommonService.GetAllProvidersByPinAndUname(this.pinno, this.uname, 5).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = this.CommonService.generateRandomPassword();
                  console.log("password", this.password)
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.sendmail(5)
                  // location.reload();
                } else {
                  this.showPopup = 1;
                  this.messageID = 43;
                  this.typeofPopUp = 2;
                  this.uname = "";
                  this.pinno = "";
                  this.loader = false;

                }
              }, error => {
                this.SharedService.insertexceptions(this.currentUrl, "GetAllProvidersByPinAndUname", error);
              }
            )
          }
        })
      }

      if (this.roleid == "7") {
        this.loader = true;

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.CommonService.Authenicate(entity).subscribe((data: any) => {

          if (data['requestMessage'] != undefined || null) {

            sessionStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.CommonService.GetAllProvidersByPinAndUname(this.pinno, this.uname, 2).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = this.CommonService.generateRandomPassword();
                  console.log("password", this.password)
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)

                  this.sendmail(2)
                  // location.reload();
                } else {
                  this.showPopup = 1;
                  this.messageID = 43;
                  this.typeofPopUp = 2;
                  this.uname = "";
                  this.pinno = "";
                  this.loader = false;
                }
              }, error => {
                this.SharedService.insertexceptions(this.currentUrl, "GetAllProvidersByPinAndUname", error);
              }
            )
          }
        })
      }

      if (this.roleid == "8") {
        this.loader = true;

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.CommonService.Authenicate(entity).subscribe((data: any) => {

          if (data['requestMessage'] != undefined || null) {

            sessionStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.CommonService.GetAllProvidersByPinAndUname(this.pinno, this.uname, 4).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = this.CommonService.generateRandomPassword();
                  console.log("password", this.password)
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.sendmail(4)
                  // location.reload();
                } else {
                  this.showPopup = 1;
                  this.messageID = 43;
                  this.typeofPopUp = 2;
                  this.uname = "";
                  this.pinno = "";
                  this.loader = false;


                }
              }, error => {
                this.SharedService.insertexceptions(this.currentUrl, "GetAllProvidersByPinAndUname", error);
              }
            )
          }
        })
      }

      if (this.roleid == "9") {
        this.loader = true;

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.CommonService.Authenicate(entity).subscribe((data: any) => {

          if (data['requestMessage'] != undefined || null) {

            sessionStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.CommonService.GetAllProvidersByPinAndUname(this.pinno, this.uname, 3).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = this.CommonService.generateRandomPassword();
                  console.log("password", this.password)
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.sendmail(3)
                  // location.reload();
                } else {
                  this.showPopup = 1;
                  this.messageID = 43;
                  this.typeofPopUp = 2;
                  this.uname = "";
                  this.pinno = "";
                  this.loader = false;
                }
              }, error => {
                this.SharedService.insertexceptions(this.currentUrl, "GetAllProvidersByPinAndUname", error);
              }
            )
          }
        })
      }

      if (this.roleid == "10") {
        this.loader = true;

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.CommonService.Authenicate(entity).subscribe((data: any) => {

          if (data['requestMessage'] != undefined || null) {

            sessionStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.CommonService.GetAllProvidersByPinAndUname(this.pinno, this.uname, 7).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = this.CommonService.generateRandomPassword();
                  console.log("password", this.password)
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.sendmail(7)
                  // location.reload();
                } else {
                  this.showPopup = 1;
                  this.messageID = 43;
                  this.typeofPopUp = 2;
                  this.uname = "";
                  this.pinno = "";
                  this.loader = false;
                }
              }, error => {
                this.SharedService.insertexceptions(this.currentUrl, "GetAllProvidersByPinAndUname", error);
              }
            )
          }
        })
      }
      if (this.roleid == "14") {
        this.loader = true;

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.CommonService.Authenicate(entity).subscribe((data: any) => {

          if (data['requestMessage'] != undefined || null) {

            sessionStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.CommonService.GetAllProvidersByPinAndUname(this.pinno, this.uname, 9).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = this.CommonService.generateRandomPassword();
                  console.log("password", this.password)
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.recpsendmail(1)
                  // location.reload();
                } else {
                  this.showPopup = 1;
                  this.messageID = 43;
                  this.typeofPopUp = 2;
                  this.uname = "";
                  this.pinno = "";
                  this.loader = false;


                }
              }, error => {
                this.SharedService.insertexceptions(this.currentUrl, "GetAllProvidersByPinAndUname", error);
              }
            )
          }
        })
      }
      if (this.roleid == "24") {
        this.loader = true;

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.CommonService.Authenicate(entity).subscribe((data: any) => {

          if (data['requestMessage'] != undefined || null) {

            sessionStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.CommonService.GetAllProvidersByPinAndUname(this.pinno, this.uname, 10).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = this.CommonService.generateRandomPassword();
                  console.log("password", this.password)
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)

                  this.recpsendmail(2)
                  // location.reload();
                } else {
                  this.showPopup = 1;
                  this.messageID = 43;
                  this.typeofPopUp = 2;
                  this.uname = "";
                  this.pinno = "";
                  this.loader = false;

                }
              }, error => {
                this.SharedService.insertexceptions(this.currentUrl, "GetAllProvidersByPinAndUname", error);
              }
            )
          }
        })
      }
    }

  }

  public updatepssword(typeid: any) {
    this.showPopup = 0;
    var entity = {
      'ID': this.id,
      'Password': this.password,
      'TypeID': typeid
    }
    this.CommonService.UpdateForgotPsswords(entity).subscribe(data => {



      this.showPopup = 1;
      this.messageID = 45;
      this.typeofPopUp = 1;
      this.uname = "";
      this.pinno = "";
      this.loader = false;
      location.href = '#/login';


      // location.reload();
    })
  }

  emailattchementurl = []
  password: any;


  public sendmail(typeid: any) {

    if (this.languageid == 1) {
      var entity = {
        'emailto': this.emailid,
        'emailsubject': "Reset Password",
        'emailbody': 'Dear ' + this.name + ",<br><br>" + 'Your New Password is : ' + this.password + "<br><br>" + 'For data safety and that of your patients, do not share your password and change it regularly!  If you need help, please contact our support team.' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
        'attachmenturl': this.emailattchementurl,
        'cclist': 0,
        'bcclist': 0
      }
      this.CommonService.sendemail(entity).subscribe(data => {
        if (data == 'Success') {
          this.updatepssword(typeid)
        }
        else {
          // Swal.fire("Error", "Your Email is not valid. Can not send mail");
          this.loader = false;
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "sendemail", error);
      })
    }
    else {
      var entity = {
        'emailto': this.emailid,
        'emailsubject': "Reset Password",
        'emailbody': 'Cher  ' + this.name + ",<br><br>" + 'Votre nouveau mot de passe est : ' + this.password + "<br><br>" + 'Pour votre sécurité et celle de vos patients, ne partagez pas votre mot de passe et changez-le régulièrement !' + "<br><br>" + "Si vous avez besoin d'aide, veuillez contacter notre équipe d'assistance." + "<br><br>" + 'Amicalement,' + "<br>" + "L'équipe de Voiladoc",
        'attachmenturl': this.emailattchementurl,
        'cclist': 0,
        'bcclist': 0
      }
      this.CommonService.sendemail(entity).subscribe(data => {

        if (data == 'Success') {

          this.updatepssword(typeid)
        }
        else {
          // Swal.fire("Error", "Your Email is not valid. Can not send mail");
          this.loader = false;
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "sendemail", error);
      })
    }

  }






  public recpsendmail(typeid: any) {
    if (this.languageid == 1) {
      var entity = {
        'emailto': this.emailid,
        'emailsubject': "Reset Password",
        'emailbody': 'Dear ' + this.name + ",<br><br>" + 'Your New Password is : ' + this.password + "<br><br>" + 'For data safety and that of your patients, do not share your password and change it regularly!  If you need help, please contact our support team.' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
        'attachmenturl': this.emailattchementurl,
        'cclist': 0,
        'bcclist': 0
      }
      this.CommonService.sendemail(entity).subscribe(data => {

        if (data == 'Success') {

          this.updatepssword(typeid)
        }
        else {
          // Swal.fire("Error", "Your Email is not valid. Can not send mail");
          this.loader = false;
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "sendemail", error);
      })
    }
    else {
      var entity = {
        'emailto': this.emailid,
        'emailsubject': "Reset Password",
        'emailbody': 'Cher  ' + this.name + ",<br><br>" + 'Votre nouveau mot de passe est : ' + this.password + "<br><br>" + 'Pour votre sécurité et celle de vos patients, ne partagez pas votre mot de passe et changez-le régulièrement !' + "<br><br>" + "Si vous avez besoin d'aide, veuillez contacter notre équipe d'assistance." + "<br><br>" + 'Amicalement,' + "<br>" + "L'équipe de Voiladoc",
        'attachmenturl': this.emailattchementurl,
        'cclist': 0,
        'bcclist': 0
      }
      this.CommonService.sendemail(entity).subscribe(data => {

        if (data == 'Success') {

          this.updatepssword(typeid)
        }
        else {
          this.loader = false;
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "sendemail", error);
      })
    }

  }



  public SendTwiliSms(smsdesc: any) {
    if (this.languageid == 1) {
      var smstext = "Your New Password is : " + this.password
    }
    else {
      var smstext = "Votre nouveau mot de passe : " + this.password
    }
    this.CommonService.SendTwillioSMS(this.smsmobileno, smstext).subscribe(data => {

    })
  }


  public updaterecppwd(typeid: any) {
    var entity = {
      'ID': this.id,
      'Password': this.password,
      'TypeID': typeid
    }
    this.CommonService.UpdateRecpPsswords(entity).subscribe(data => {
      this.showPopup = 1;
      this.messageID = 45;
      this.typeofPopUp = 1;
      this.uname = "";
      this.pinno = "";
      this.loader = false;
      location.href = '#/login';

      // location.reload();
    })
  }


  numberOnly(event: { which: any; keyCode: any; }): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
