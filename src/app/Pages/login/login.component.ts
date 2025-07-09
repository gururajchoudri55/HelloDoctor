import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NgToastService } from 'ng-angular-popup';
import Labels from '../Lables/Login/loginlabels.json';
import {
  bounceOutDownOnLeaveAnimation,
  bounceOutOnLeaveAnimation,
  collapseAnimation,
  fadeInOnEnterAnimation,
  fadeInUpOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  jackInTheBoxOnEnterAnimation,
  rubberBandAnimation,
} from 'angular-animations';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'enter', duration: 2000, delay: 100 }),
    fadeOutOnLeaveAnimation({ anchor: 'leave', duration: 500, delay: 200 }),
  ],
})
export class LoginComponent implements OnInit {
  path: any;
  ProviderPin: any;
  constructor(
    private CommonService: CommonService,
    private toast: NgToastService
  ) {}
  languageList: any;
  LanguageID: any;
  roleList: any;
  roleID: any;
  pinno: any;
  userName: any;
  password: any;
  result: any;
  loginid: any;
  loader: boolean | undefined;
  showPopup: any;
  typeOfPopup: any;
  messageID: any;
  languageid: any;
  labels: any;
  showPassword: any;

  loginType: number = 1;
  dummyRoleList: any = [];
  ngOnInit(): void {
    this.loader = true;
    this.LanguageID = sessionStorage.getItem('LanguageID')
      ? sessionStorage.getItem('LanguageID')
      : 6;
    this.changeLanguageID(this.LanguageID);
    //this.chalgeType();
    //sessionStorage.setItem('LanguageID', '6');
    //this.LanguageID = 6
    // this.languageid = sessionStorage.getItem('LanguageID');
    //this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getLanguage();
    this.type = 'password';
    this.imgUrl = 'assets/Icons/closeeye.png';
    this.path = 'assets/Icons/Prestaraire_108.png';
    this.getRoleTypeMaster();
  }
  changeLanguageID(even: any) {
    this.loader = true;
    if (even == '6' || even == '1') {
      this.LanguageID = even;
    } else {
      this.LanguageID = even.target.value;
    }
    sessionStorage.setItem('LanguageID', this.LanguageID);
    this.LanguageID = sessionStorage.getItem('LanguageID');
    this.labels = this.LanguageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.loader = false;
    this.getRoleTypeMaster();
  }
  getLanguage() {
    this.CommonService.GetLanguageMaster().subscribe(
      (data) => {
        this.loader = false;
        this.languageList = data;
      },
      (error) => {}
    );
  }

  chalgeType() {
    if (this.loginType == 1 && this.ProviderPin == '050600') {
      this.path = 'assets/Icons/Admin_108.png';
      this.loginType = 2;
      this.ProviderPin = '';
    } else if (this.loginType == 2) {
      this.path =
        this.LanguageID == 6
          ? 'assets/Icons/Prestaraire_108.png'
          : 'assets/Icons/Prestaraire_108.png';
      this.loginType = 1;
    } else {
      Swal.fire('You do not have access!');
      this.ProviderPin = '';
    }

    this.roleList = this.dummyRoleList.filter(
      (x: { providerType: number }) => x.providerType == this.loginType
    );
  }
  GetLanguageID(even: any) {
    this.LanguageID = even.target.value;
    sessionStorage.setItem('LanguageID', this.LanguageID);
    this.labels = this.LanguageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.getRoleTypeMaster();
  }

  getRoleTypeMaster() {
    this.CommonService.GetRoleTypesMasterBYID(this.LanguageID).subscribe(
      (data) => {
        this.dummyRoleList = data;
        this.roleList = data.filter((x) => x.providerType == 1);
      },
      (error) => {}
    );
  }

  getRoleID(even: any) {
    this.roleID = even.target.value;
    sessionStorage.setItem('roleid', this.roleID);
  }

  public login() {
    debugger;
    sessionStorage.setItem('countryID', 'madagascar');
    if (this.roleID == null || this.roleID == undefined) {
      this.typeOfPopup = 2;
      this.messageID = 2;
      this.showPopup = true;
    }
    if (this.userName == null || this.password == undefined) {
      this.typeOfPopup = 2;
      this.messageID = 2;
      this.showPopup = true;
    } else {
      if (this.roleID == '2') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };

        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );

            this.CommonService.GetDoctorLogin(
              this.userName,
              this.password,
              this.LanguageID,
              this.pinno
            ).subscribe(
              (data) => {
                this.result = data;

                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].doctorName);
                  sessionStorage.setItem('roleid', '2');
                  sessionStorage.setItem('temp', '1');
                  sessionStorage.setItem(
                    'MobileNumber',
                    this.result[0].mobileNumber
                  );
                  sessionStorage.setItem(
                    'Hospital_ClinicName',
                    this.result[0].hospital_ClinicName
                  );
                  sessionStorage.setItem('userid', this.result[0].doctorID);
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.password);
                  sessionStorage.setItem(
                    'hospitalClinicID',
                    this.result[0].hospitalClinicID
                  );
                  sessionStorage.setItem(
                    'hospitalType',
                    this.result[0].hospital_ClinicID
                  );
                  sessionStorage.setItem(
                    'departmentid',
                    this.result[0].departmentID
                  );
                  sessionStorage.setItem(
                    'hospitalid',
                    this.result[0].hospital_ClinicID
                  );
                  this.insertProvidersAuditReport(this.result[0].doctorID, 1);
                } else {
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.showPopup = 1;
                  this.userName = '';
                  this.password = '';

                  this.loader = false;
                }
              },
              (error) => {
                this.loader = false;
              }
            );
          }
        });
      }

      if (this.roleID == '3') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );

            this.CommonService.GetHospitalAdminRegistrationLogin(
              this.userName,
              this.password,
              this.LanguageID,
              this.pinno
            ).subscribe(
              (data: any) => {
                this.result = data;
                if (this.result.length != '0') {
                  sessionStorage.setItem(
                    'user',
                    this.result[0].hospital_ClinicName
                  );
                  sessionStorage.setItem('roleid', '3');
                  sessionStorage.setItem(
                    'hospitalid',
                    this.result[0].hospital_ClinicID
                  );
                  sessionStorage.setItem(
                    'hospitaltype',
                    this.result[0].hospitalType
                  );
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.password);
                  sessionStorage.setItem('temp', '1');
                  this.insertProvidersAuditReport(
                    this.result[0].hospital_ClinicID,
                    5
                  );
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';

                  this.loader = false;
                }
              },
              (error) => {
                this.loader = false;
              }
            );
          }
        });
      }
      if (this.roleID == '4') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetDiagnosticCenterAdminRegistrationLogin(
              this.userName,
              this.password,
              this.LanguageID,
              this.pinno
            ).subscribe(
              (data: any) => {
                this.result = data;
                if (this.result.length != '0') {
                  sessionStorage.setItem(
                    'user',
                    this.result[0].diagnosticCenterName
                  );
                  sessionStorage.setItem('roleid', '4');
                  sessionStorage.setItem(
                    'diagnosticid',
                    this.result[0].diagnosticCenterID
                  );
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.password);
                  sessionStorage.setItem('temp', '1');
                  this.insertProvidersAuditReport(
                    this.result[0].diagnosticCenterID,
                    6
                  );
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';

                  this.loader = false;
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '5') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetPharmacyAdminRegistrationLogin(
              this.userName,
              this.password,
              this.LanguageID,
              this.pinno
            ).subscribe(
              (data: any) => {
                this.result = data;

                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].pharmacyName);
                  sessionStorage.setItem('roleid', '5');
                  sessionStorage.setItem(
                    'pharmacyid',
                    this.result[0].pharmacyID
                  );
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.password);
                  sessionStorage.setItem('temp', '1');
                  this.insertProvidersAuditReport(this.result[0].pharmacyID, 7);
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';

                  this.loader = false;
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '7') {
        this.loader = true;
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetNurseLogin(
              this.userName,
              this.password,
              this.LanguageID,
              this.pinno
            ).subscribe(
              (data) => {
                this.result = data;

                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].nurseName);
                  sessionStorage.setItem('roleid', '7');
                  sessionStorage.setItem('nurseid', this.result[0].nurseID);
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem(
                    'hospitalid',
                    this.result[0].hospitalClinicID
                  );

                  sessionStorage.setItem('Password', this.password);
                  sessionStorage.setItem('temp', '1');

                  this.insertProvidersAuditReport(this.result[0].nurseID, 2);
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';

                  this.loader = false;
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '8') {
        this.loader = true;
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetPhysiotherapistLogin(
              this.userName,
              this.password,
              this.LanguageID,
              this.pinno
            ).subscribe(
              (data: any) => {
                this.result = data;

                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].name);
                  sessionStorage.setItem('roleid', '8');
                  sessionStorage.setItem(
                    'physioid',
                    this.result[0].physiotherapistID
                  );
                  sessionStorage.setItem(
                    'hospitalid',
                    this.result[0].hospitalClinicID
                  );
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.password);
                  sessionStorage.setItem('temp', '1');
                  this.insertProvidersAuditReport(
                    this.result[0].physiotherapistID,
                    3
                  );
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                  this.loader = false;
                }
              },
              (error) => {
                this.loader = false;
              }
            );
          }
        });
      }
      if (this.roleID == '9') {
        this.showPopup = 0;
        this.loader = true;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetMidWivesLogin(
              this.userName,
              this.password,
              this.LanguageID,
              this.pinno
            ).subscribe(
              (data) => {
                this.result = data;

                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].name);
                  sessionStorage.setItem('roleid', '9');
                  sessionStorage.setItem('midwifeid', this.result[0].midWiveID);
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem(
                    'hospitalid',
                    this.result[0].hospitalClinicID
                  );
                  sessionStorage.setItem('Password', this.password);
                  sessionStorage.setItem('temp', '1');
                  this.insertProvidersAuditReport(this.result[0].midWiveID, 4);
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';

                  this.loader = false;
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '10') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetDeliveryCompanyLogin(
              this.userName,
              this.password,
              this.LanguageID,
              this.pinno
            ).subscribe(
              (data: any) => {
                this.result = data;

                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].companyName);
                  sessionStorage.setItem('roleid', '10');
                  sessionStorage.setItem(
                    'deliveryid',
                    this.result[0].deliveryCompanyID
                  );
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('pincode', this.result[0].pincode);
                  sessionStorage.setItem('Password', this.password);

                  sessionStorage.setItem('temp', '1');
                  location.href = '#/PharmacyOrders';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';

                  this.loader = false;
                }
              },
              (error) => {}
            );
          }
        });
      }

      if (this.roleID == '11') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetLocalDoctorRegistrationUnameAndPwd(
              this.userName,
              this.password,
              this.pinno
            ).subscribe(
              (data: any) => {
                this.result = data;

                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].doctorName);
                  sessionStorage.setItem('roleid', '11');
                  sessionStorage.setItem('localdocid', this.result[0].id);
                  sessionStorage.setItem('temp', '1');
                  location.href = '#/MyProfiles';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '12') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetMeridionalAdmin_LoginUnameAndPwd(
              this.userName,
              this.password,
              this.pinno
            ).subscribe(
              (data: any) => {
                this.result = data;

                if (this.result.length != '0') {
                  sessionStorage.setItem('user', 'Manny');
                  sessionStorage.setItem('roleid', '12');
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.result[0].password);
                  sessionStorage.setItem('meridionalid', this.result[0].id);
                  sessionStorage.setItem('temp', '1');
                  location.href = '#/reports/RegisteredEntities';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '13') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetSupportRegistrationUnameAndPwd(
              this.userName,
              this.password,
              this.pinno
            ).subscribe(
              (data) => {
                this.result = data;

                if (this.result.length != '0') {
                  sessionStorage.setItem('supportid', this.result[0].id);
                  sessionStorage.setItem('user', this.result[0].name);

                  sessionStorage.setItem('roleid', '13');
                  // sessionStorage.setItem('localdocid', this.result[0].id);
                  sessionStorage.setItem('temp', '1');
                  location.href = '#/Support';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '14') {
        this.showPopup = 0;

        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetReceiptionistLogin(
              this.userName,
              this.password,
              this.pinno
            ).subscribe(
              (data: any) => {
                this.result = data;

                if (this.result.length != '0') {
                  let name =
                    this.result[0].name +
                    '(' +
                    this.result[0].hospital_ClinicName +
                    ')';

                  sessionStorage.setItem('user', name);
                  sessionStorage.setItem('roleid', '14');
                  sessionStorage.setItem(
                    'hospitalid',
                    this.result[0].hospitalID
                  );
                  sessionStorage.setItem('Receptionstid', this.result[0].id);
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.result[0].password);
                  sessionStorage.setItem('receptiostname', this.result[0].name);
                  sessionStorage.setItem('temp', '1');
                  location.href = '#/HospitalClinic';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }
      // management logins

      if (this.roleID == '15') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetUsers_RoleMappingByUnameAndPwd(
              this.userName,
              this.password,
              this.roleID,
              this.pinno
            ).subscribe(
              (data: any) => {
                this.result = data;
                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].firstName);
                  sessionStorage.setItem('roleid', '15');
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.result[0].password);
                  sessionStorage.setItem('countrymanagerid', this.result[0].id);
                  sessionStorage.setItem('Commacountryid', this.result[0].id);

                  sessionStorage.setItem('temp', '1');
                  location.href = '#/reports/RegisteredEntities';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '17') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetUsers_RoleMappingByUnameAndPwd(
              this.userName,
              this.password,
              this.roleID,
              this.pinno
            ).subscribe(
              (data) => {
                this.result = data;
                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].firstName);
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.result[0].password);
                  sessionStorage.setItem('roleid', '17');
                  sessionStorage.setItem('implementationid', this.result[0].id);
                  sessionStorage.setItem('Commacountryid', this.result[0].id);
                  sessionStorage.setItem('temp', '1');
                  location.href = '#/reports/RegisteredEntities';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '18') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetUsers_RoleMappingByUnameAndPwd(
              this.userName,
              this.password,
              this.roleID,
              this.pinno
            ).subscribe(
              (data) => {
                this.result = data;
                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].firstName);
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.result[0].password);
                  sessionStorage.setItem('roleid', '18');
                  sessionStorage.setItem('clientserviceid', this.result[0].id);
                  sessionStorage.setItem('Commacountryid', this.result[0].id);
                  sessionStorage.setItem('temp', '1');
                  location.href = '#/reports/RegisteredEntities';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '19') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetUsers_RoleMappingByUnameAndPwd(
              this.userName,
              this.password,
              this.roleID,
              this.pinno
            ).subscribe(
              (data) => {
                this.result = data;
                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].firstName);
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.result[0].password);
                  sessionStorage.setItem('roleid', '19');
                  sessionStorage.setItem('salesmanagerid', this.result[0].id);
                  sessionStorage.setItem('Commacountryid', this.result[0].id);
                  sessionStorage.setItem('temp', '1');
                  location.href = '#/reports/RegisteredEntities';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '20') {
        this.showPopup = 0;

        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetUsers_RoleMappingByUnameAndPwd(
              this.userName,
              this.password,
              this.roleID,
              this.pinno
            ).subscribe(
              (data) => {
                this.result = data;
                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].firstName);
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.result[0].password);
                  sessionStorage.setItem('roleid', '20');
                  sessionStorage.setItem(
                    'salesrepresntativeid',
                    this.result[0].id
                  );
                  sessionStorage.setItem('Commacountryid', this.result[0].id);
                  sessionStorage.setItem('temp', '1');
                  location.href = '#/reports/RegisteredEntities';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '22') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );
            this.CommonService.GetUsers_RoleMappingByUnameAndPwd(
              this.userName,
              this.password,
              this.roleID,
              this.pinno
            ).subscribe(
              (data) => {
                this.result = data;
                if (this.result.length != '0') {
                  sessionStorage.setItem('user', this.result[0].firstName);
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.result[0].password);
                  sessionStorage.setItem('roleid', '22');
                  sessionStorage.setItem(
                    'finanacemanagerid',
                    this.result[0].id
                  );
                  sessionStorage.setItem('Commacountryid', this.result[0].id);
                  sessionStorage.setItem('temp', '1');
                  location.href = '#/Finance';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }
      if (this.roleID == '23') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );

            this.CommonService.GetDiagnosticReceptionistLoginByUserNameAndPassword(
              this.userName,
              this.password,
              this.pinno
            ).subscribe(
              (data) => {
                this.result = data;
                if (this.result.length != '0') {
                  let name =
                    this.result[0].userName +
                    '(' +
                    this.result[0].diagnosticCenterName +
                    ')';

                  sessionStorage.setItem('user', name);

                  sessionStorage.setItem(
                    'diagnosticCenterName',
                    this.result[0].diagnosticCenterName
                  );

                  sessionStorage.setItem('roleid', '23');
                  sessionStorage.setItem(
                    'diagnosticid',
                    this.result[0].diagnosticID
                  );
                  sessionStorage.setItem('Receptionstid', this.result[0].id);
                  sessionStorage.setItem('receptiostname', this.result[0].name);
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.result[0].password);
                  sessionStorage.setItem('temp', '1');
                  location.href = '#/Diagnostic';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }

      if (this.roleID == '24') {
        this.showPopup = 0;
        var entity = {
          username: 'HelloDoc@gmail.com',
          Password: 'HelloDoc',
          RoleID: 1,
        };
        this.CommonService.Authenicate(entity).subscribe((data: any) => {
          if (data['requestMessage'] != undefined || null) {
            sessionStorage.setItem(
              'token',
              data['requestMessage'].headers[0].value[0]
            );

            this.CommonService.GetIndependentDoctors_ReceptionistByUserNameAndPwd(
              this.pinno,
              this.userName,
              this.password
            ).subscribe(
              (data) => {
                this.result = data;
                if (this.result.length != '0') {
                  let name =
                    this.result[0].name + '(' + this.result[0].doctorName + ')';
                  sessionStorage.setItem('user', name);
                  sessionStorage.setItem('roleid', '24');
                  sessionStorage.setItem('temp', '1');
                  sessionStorage.setItem(
                    'MobileNumber',
                    this.result[0].mobileNumber
                  );

                  sessionStorage.setItem(
                    'Hospital_ClinicName',
                    this.result[0].hospital_ClinicName
                  );
                  sessionStorage.setItem('userid', this.result[0].doctorID);
                  sessionStorage.setItem('Pinno', this.result[0].pinno);
                  sessionStorage.setItem('Password', this.password);
                  sessionStorage.setItem(
                    'hospitalClinicID',
                    this.result[0].hospitalClinicID
                  );
                  sessionStorage.setItem(
                    'hospitalid',
                    this.result[0].hospitalClinicID
                  );
                  sessionStorage.setItem(
                    'departmentid',
                    this.result[0].departmentID
                  );
                  sessionStorage.setItem('Password', this.result[0].password);
                  sessionStorage.setItem('recpid', this.result[0].id);
                  sessionStorage.setItem(
                    'doctorName',
                    this.result[0].doctorName
                  );
                  location.href = '#/Doctor/RecpAppointments';
                  location.reload();
                } else {
                  this.showPopup = 1;
                  this.typeOfPopup = 2;
                  this.messageID = 4;
                  this.userName = '';
                  this.password = '';
                }
              },
              (error) => {}
            );
          }
        });
      }

      // if (this.roleid == "21") {
      //   this.docservice.GetUsers_RoleMappingByUnameAndPwd(this.uname, this.pwd, sessionStorage.getItem('WebUrl'),this.roleid).subscribe(
      //     data => {
      //       this.result = data;
      //       if (this.result.length != '0') {
      //         sessionStorage.setItem('user', this.result[0].firstName)
      //         sessionStorage.setItem('roleid', '21');
      //         sessionStorage.setItem('supportid', this.result[0].id);
      //         sessionStorage.setItem('temp', '1');
      //          location.href = '#/AdminDash';
      //         location.reload();
      //       }
      //       else {
      //         Swal.fire('Error', 'Username or Password is not valid!');
      //         this.uname = "";
      //         this.pwd = "";
      //       }
      //     }, error => {
      //     }
      //   )
      // }
    }
  }

  insertProvidersAuditReport(userid: any, typeid: any) {
    var entity = {
      TypeID: typeid,
      ProviderID: userid,
    };
    this.CommonService.InsertProvidersAuditReport(entity).subscribe((data) => {
      this.loginid = data;
      sessionStorage.setItem('loginid', this.loginid);
      if (this.loginid != 0) {
        if (typeid == 1) {
          location.href = '#/Doctor';
          location.reload();
        } else if (typeid == 2) {
          location.href = '#/Nurse';
          location.reload();
        } else if (typeid == 3) {
          location.href = '#/Physiotherapist';
          location.reload();
        } else if (typeid == 4) {
          location.href = '#/midwife';
          location.reload();
        } else if (typeid == 5) {
          location.href = '#/HospitalClinic';
          location.reload();
        } else if (typeid == 6) {
          location.href = '#/Diagnostic';
          location.reload();
        } else if (typeid == 7) {
          location.href = '#/Pharmacy/Precriptions';
          location.reload();
        }

        this.loader = false;
      }
    });
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  type: any;
  imgUrl: any;

  showpwd() {
    if (this.type == 'password') {
      this.type = 'text';
      this.imgUrl = 'assets/Icons/eye.png';
    } else if (this.type == 'text') {
      this.type = 'password';
      this.imgUrl = 'assets/Icons/closeeye.png';
    }
  }

  ngDestroy() {}
}
