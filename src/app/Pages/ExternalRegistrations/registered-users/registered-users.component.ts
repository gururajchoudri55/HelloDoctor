import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { SharedService } from '../../services/shared.service';
import Labels from '../../Lables/Registrations/regilabels.json';


@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {
  p: any;
  count: any;
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader: boolean | undefined;
  user: any;
  languageID: any;
  typeid: any;
  RegisteredList: any;
  search: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  currentUrl: any;
  labels: any;
  signature: any;


  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  ngOnInit(): void {
    
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.user = sessionStorage.getItem('user');
    // var date = new Date();
    // this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    // this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // var start = new Date(date.getFullYear(), date.getMonth(), 1);
    // var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // const format = 'yyyy-MM-dd';
    // const locale = 'en-US';
    // this.startdate = formatDate(this.startdate, format, locale);

    // const format1 = 'yyyy-MM-dd';
    // const locale1 = 'en-US';
    // this.enddate = formatDate(this.enddate, format1, locale1);
    // this.bsRangeValue = [start, end];
    this.startdate = "2019-01-01";
    this.enddate = "2050-01-01";
    this.typeid = 1
    this.GetRegistreedVoiladocusers();
    this.GetAllRegisteredUsersCount()
  }




  countlist: any;

  public GetAllRegisteredUsersCount() {
    ;
    this.CommonService.GetAllRegisteredUsersCount(this.startdate, this.enddate).subscribe(data => {
      this.countlist = data;
      this.loader = false;
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetAllRegisteredUsersCount", error);
    })
  }


  public dummreglist: any;

  public GetRegistreedVoiladocusers() {
    ;
    this.CommonService.GetVoiladocRegistrationsUsers(this.startdate, this.enddate, this.typeid, this.languageID).subscribe(data => {
      //  this.RegisteredList = data;
      this.dummreglist = data;
      this.RegisteredList = this.dummreglist.filter((x: {
        approved: any; rejected: number; addressLink: any
      }) => x.rejected == 0 && x.approved == false && x.addressLink == 'https://voiladoc.org/registration/#/Login/madagascar')
      this.count = this.RegisteredList.length;
      this.loader = false;

    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetVoiladocRegistrationsUsers", error);
    })
  }




  public GetTypeID(even: any) {

    this.typeid = even.target.value;
    this.GetRegistreedVoiladocusers()
  }




  public GetApproveRegistratuions(list: any) {
    this.showPopup = 0;
    if (this.languageID == 1) {

      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Approve This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Approve it!'
      }).then((result) => {
        if (result.value) {
          this.CommonService.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
            let test = res;
            this.CommonService.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
            })
            if (list.type == '1') {

              this.InsertHospitalDetails(list)
            }
            if (list.type == '2') {

              this.InsertHospitalDetails(list)
            }
            if (list.type == '3') {
              this.insertdoctorregistration(list)
            }
            if (list.type == '4') {

              this.insertnursedetails(list)
            }
            if (list.type == '5') {

              this.insertphysiodetails(list)
            }
            if (list.type == '6') {

              this.InsertMidWives(list)
            }
            if (list.type == '7') {

              this.InserPharmacyDetails(list)
            }
            if (list.type == '8') {

              this.InserDiagnostoicDetails(list)
            }

          })


        }
        else {

        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "UpdateVoiladocRegistrationEmailsStatus", error);
      })
    }
    else {

      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Approve This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Approuver !',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.CommonService.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
            let test = res;
            this.CommonService.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
            })
            if (list.type == '1') {

              this.InsertHospitalDetails(list)
            }
            if (list.type == '2') {

              this.InsertHospitalDetails(list)
            }
            if (list.type == '3') {
              this.insertdoctorregistration(list)
            }
            if (list.type == '4') {

              this.insertnursedetails(list)
            }
            if (list.type == '5') {

              this.insertphysiodetails(list)
            }
            if (list.type == '6') {

              this.InsertMidWives(list)
            }
            if (list.type == '7') {

              this.InserPharmacyDetails(list)
            }
            if (list.type == '8') {

              this.InserDiagnostoicDetails(list)
            }

          })

        }
        else {

        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "UpdateVoiladocRegistrationEmailsStatus", error);
      })
    }
  }



  //Hospital

  public hospitalclinicid: any;
  public attachmentsurl = [];

  public InsertHospitalDetails(list: any) {

    this.loader = true;

    var entity = {
      'Hospital_ClinicID': list.hospitalClinicID,
      'Hospital_ClinicName': list.username,
      'Address': list.address,
      'PhoneNo': list.phoneNo,
      'EmailID': list.email,
      'ZipCode': list.zipcode,
      'LanguageID': '1',
      'Timings': '06:00 TO 20:00',
      'Description': 'none',
      'AvailabilityID': '1',
      'ContactPersonName': list.contactpersonName,
      'ContactPersonPhNo': list.contatcpersonPhoneNo,
      'Website': list.website,
      'YearEstablished': list.yearEstablished,
      'NoOfBeds': list.noOfBeds,
      'Emergency': list.isEmergencyServiceAvailable,
      'CityID': list.cityID,
      'Preffered': 0,
      'HospitalLogoUrl': list.hospitalPhoto,
      'AreaID': list.cityID,
      'Pincode': list.zipcode,
      'CountryID': list.countryID,
      'MonthlySubscription': 0,
      'Hospitalfulltimebit': list.open24Hrs,
      'SubscriptionTypeID': '',
      'AppointmentPercentage': '',
      'TaxIdentification': '',
      'BusinessID': '',
      'CommercialRegCity': '',
      'TaxProfessional': '',
      'SocialSeccurityNo': '',
      'Nameofthebank': '',
      'AccountName': '',
      'AccountNumber': '',
      'VAT': '',
      'VatPercentage': '',
      'ExonerationPeriodFromDate': new Date(),
      'ExonerationPerioToDate': new Date(),
      'Lattitude': '',
      'Longitude': '',
      'FormatedAddress': '',
      'CLinicTimings': '',
      'DocNearestLocDist': '',
      'DocNearestNumber': ''
    }
    this.CommonService.InsertHospitalClinicDetailsMaster(entity).subscribe(data => {

      if (data != 0) {
        this.hospitalclinicid = data;

        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;


        this.loader = false;
        this.GetRegistreedVoiladocusers();
        this.GetAllRegisteredUsersCount()
      }
      else {
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2;
        // this.clear();
        this.CommonService.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.CommonService.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
        this.loader = false;
        // location.href = "#/HspClidash"
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "UpdateVoiladocRegistrationEmailsStatusBackNormal", error);
    })

  }

  public inserthspphotos() {
    for (let i = 1; i < this.attachmentsurl.length; i++) {
      var entity = {
        'Hospital_ClinicID': this.hospitalclinicid,
        'PhotoURL': this.attachmentsurl[i]
      }
      this.CommonService.InsertHospital_ClinicPhotos(entity).subscribe(data => {

        if (data != 0) {

        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertHospital_ClinicPhotos", error);
      })
    }
  }

  // public insertdetails(list) {
  //   var entity = {
  //     'Hospital_ClinicID': this.hospitalclinicid,
  //     'UserName': list.regysername,
  //     'Password': list.password
  //   }
  //   this.docservice.InsertHospitalClinicAdminRegistration(entity).subscribe(data => {

  //     if (data != 0) {
  //       Swal.fire('Registration Completed', 'Details saved successfully', 'success');


  //     }
  //     else {
  //       Swal.fire('Error', 'Hospital Login Already Exists', 'success');

  //     }
  //   })
  // }





  //Doctor Registration

  public doctorid: any;

  public attachmentsurl1: any = [];
  public signatureurl: any = []

  public insertdoctorregistration(list: any) {
    ;
    if (this.attachmentsurl1.length == 0) {
      this.attachmentsurl1[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
    }
    this.loader = true;

    var entity = {
      'DoctorName': list.username,
      'MobileNumber': list.phoneNo,
      'EmailID': list.email,
      'Password': '123',
      'DepartmentID': list.departmentID,
      'Experience': list.experience,
      'Address': list.address,
      'PhotoURL': list.photo,
      'Description': 'none',
      'MedicalRegistration': 0,
      'Preffered': 0,
      'GenderID': list.genderID,
      'CityID': list.cityID,
      'LanguageID': 1,
      'IsChatEnabled': 0,
      'HomeVisit': 0,
      'AreaID': list.cityID,
      'Pincode': list.pincode,
      'CountryID': list.countryID,
      'DoctorType': 1,
      'DocumentsVerified': 0,
      'MallPractise': list.mallPractise,
      'ReferealBit': list.referredDoctor,
      'HospitalClinicID': list.hospitalID,
      'SpokenLanguages': list.speakLanguages,
      'SignatureURL': list.signaturePhoto,
      'SlotDurationID': list.slotDurationID,
      'CategoryID': 1,
      'SubscriptionTypeID': 3,
      'MonthlySubscription': 0,
      'AppointmentPercentage': 0,
      'TaxIdentification': 0,
      'BusinessID': 0,
      'CommercialRegCity': 0,
      'TaxProfessional': 0,
      'SocialSeccurityNo': 0,
      'Nameofthebank': 0,
      'AccountName': 0,
      'AccountNumber': 0,
      'VAT': 0,
      'VatPercentage': 0,
      'ExonerationPeriodFromDate': new Date(),
      'ExonerationPerioToDate': new Date(),
      CountryCodeNew: list.countryCodeNew
    }
    this.CommonService.InsertDoctorRegistration(entity).subscribe(data => {

      if (data != 0) {
        this.doctorid = data;

        // this.insertdoctorspecilisation();
        this.insertidentityProof(list);
        this.InsertMedicalProof(list);
        this.insertdoctormedicalregistration(list);
        // this.insertdoctoreducation();
        this.insertdoctorexperience(list);
        this.insertdoctormembership();
        // this.InsertDoctorLoginDetails(list)
        this.insertdoctoreducation(list);
        this.insertdoctorspecilisation(list);
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;
        this.loader = false;
        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
        // location.href = "#/Docdash";

        this.GetRegistreedVoiladocusers()
        this.GetAllRegisteredUsersCount()
      }
      else {


        this.CommonService.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.CommonService.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
        this.loader = false;
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2;
        // location.href = "#/Docdash";
        this.GetRegistreedVoiladocusers()
      }
    }, error => {

      console.log("error in Doctor", error);
      Swal.fire("Error in Registration. Plase Contact Administration");
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "UpdateVoiladocRegistrationEmailsStatusBackNormal", error);
    })
  }


  public insertdoctoreducation(list: any) {
    ;
    let colleage = list.colleage.split(",");
    console.log(colleage[0])
    var entity = {
      'DoctorID': this.doctorid,
      'CollegeName': colleage[0],
      'YearOfPassing': colleage[1],
      'DegreeID': list.degreeID,
      'Experience': this.doctorid,
      'Resume': list.resume
    }
    this.CommonService.InsertDoctorEducation(entity).subscribe(data => {

      if (data != 0) {
      }

    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertDoctorEducation", error);
    })


  }

  public insertdoctorspecilisation(list: any) {
    var entity = {
      'SpecializationID': list.specilizationID,
      'DoctorID': this.doctorid
    }
    this.CommonService.InsertDoctorSpecialization(entity).subscribe(data => {

      if (data != 0) {
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertDoctorSpecialization", error);
    })

  }


  public insertdoctormedicalregistration(list: any) {

    var entity = {
      'DoctorID': this.doctorid,
      'RegistrationNo': list.registrationNumber,
      'RegistrationCouncil': list.registrationCouncil,
      'RegistrationYear': 0,
      'LanguageID': '1',
      'ValidTill': new Date()
    }
    this.CommonService.InsertDoctorMedicalRegistration(entity).subscribe(data => {

      if (data != 0) {
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertDoctorMedicalRegistration", error);
    })
  }

  public insertidentityProof(list: any) {
    // if (this.attachmentsurl.length == 0) {
    //   this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocIdentityProof\\identity.jpg'
    // }
    // for (let i = 0; i < this.attachmentsurl.length; i++) {
    var entity = {
      'DoctorID': this.doctorid,
      'PhotoURL': list.identityproof
    }
    this.CommonService.InsertDoctorIdentityProofs(entity).subscribe(data => {

      if (data != 0) {

      }
    })

    // }
  }
  public attachmentsurl2 = []
  public InsertMedicalProof(list: any) {
    // if (this.attachmentsurl2.length == 0) {
    //   this.attachmentsurl2[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    // }
    // else {
    // for (let i = 0; i < this.attachmentsurl2.length; i++) {
    var entity = {
      'DoctorID': this.doctorid,
      'PhotoURL': list.medicalRegProof
    }
    this.CommonService.InsertDoctorMedicalProofs(entity).subscribe(data => {

      if (data != 0) {
      }
    })
    //   }
    // }

  }

  public insertdoctorexperience(list: any) {
    var entity = {
      'ExperienceDescription': list.otherExperiences,
      'DoctorID': this.doctorid
    }
    this.CommonService.InsertDoctorExperience(entity).subscribe(data => {

      if (data != 0) {
      }
    })
  }
  // public insertdoctoreducation() {
  //   for (let i = 0; i < this.qwert.length; i++) {

  //     var entity = {
  //       'DoctorID': this.doctorid,
  //       'CollegeName': this.qwert[i].CollegeName,
  //       'YearOfPassing': this.qwert[i].YearOfPassing,
  //       'DegreeID': this.qwert[i].DegreeID,
  //       'Experience': this.doctorid,
  //       'Resume': this.idproofurl[0]
  //     }
  //     this.docservice.InsertDoctorEducation(entity).subscribe(data => {

  //       if (data != 0) {
  //       }

  //     })
  //   }

  // }

  public insertdoctormembership() {
    var entity = {
      'MembershipDescription': 'none',
      'DoctorID': this.doctorid,
      'LanguageID': '1'
    }
    this.CommonService.InsertDoctorMembership(entity).subscribe(data => {

      if (data != 0) {
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertDoctorMembership", error);
    })
  }


  // public InsertDoctorLoginDetails(list) {
  //   var entity = {
  //     'DoctorID': this.doctorid,
  //     'UserName': list.regysername,
  //     'Password': list.password
  //   }
  //   this.docservice.InsertDoctorLogin(entity).subscribe(data => {

  //     if (data != 0) {
  //       // Swal.fire('Added Successfully.');
  //       Swal.fire('Completed', 'Doctor saved successfully', 'success');
  //       this.GetRegistreedVoiladocusers()
  //     }
  //     else {
  //       Swal.fire("Doctor Login Already Exists");
  //       this.GetRegistreedVoiladocusers()
  //     }
  //   })
  // }







  // Nurse Registration

  public idproofurl = []

  public insertnursedetails(list: any) {
    ;
    this.loader = true;
    // this.idproofurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    // this.attachmentsurl1[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
    var entity = {
      'NurseName': list.username,
      'PhoneNo': list.phoneNo,
      'Email': list.email,
      'GenderID': list.genderID,
      'Address': list.address,
      'CityID': list.cityID,
      'AreaID': list.cityID,
      'DepartementID': list.departmentID,
      'Experience': list.experience,
      'Description': 'none',
      'HomeVisit': 1,
      'IDProof': list.identityProof,
      'PhotoUrl': list.photo,
      'Pincode': list.zipcode,
      'CountryID': list.countryID,
      'HospitalClinicID': 612,
      'Education': list.education,
      'SpokenLanguages': list.speakLanguages,
      'SlotDurationID': 1,
      'SubscriptionTypeID': 3,
      'MonthlySubscription': 0,
      'AppointmentPercentage': 0,
      'TaxIdentification': 0,
      'BusinessID': 0,
      'CommercialRegCity': 0,
      'TaxProfessional': 0,
      'SocialSeccurityNo': 0,
      'Nameofthebank': 0,
      'AccountName': 0,
      'AccountNumber': 0,
      'VAT': 0,
      'VatPercentage': 0,
      'ExonerationPeriodFromDate': new Date(),
      'ExonerationPerioToDate': new Date()
    }
    this.CommonService.InsertNurseRegistration(entity).subscribe(data => {

      this.nurseid = data;
      if (this.nurseid != 0) {
        // this.InserNurseLoginDetails(list);
        this.InsertNurseSpecilization(list);
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;

        this.loader = false;
        // location.href = '#/NurseDashboard';
        this.GetRegistreedVoiladocusers();
        this.GetAllRegisteredUsersCount()
        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
      } else {
        this.CommonService.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.CommonService.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
        this.loader = false;
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2;
        // location.href = '#/NurseDashboard';
        this.GetRegistreedVoiladocusers()

      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "UpdateVoiladocRegistrationEmailsStatusBackNormal", error);
    })
  }

  public nurseid: any;

  // public InserNurseLoginDetails(list) {
  //   var entity = {
  //     'NurseID': this.nurseid,
  //     'UserName': list.regysername,
  //     'Password': list.password
  //   }
  //   this.docservice.InsertNurseLogin(entity).subscribe(data => {

  //     if (data != 0) {
  //       Swal.fire('Registration Completed', 'Details saved successfully', 'success');
  //       this.GetRegistreedVoiladocusers()
  //     }
  //     else {
  //       Swal.fire("Nurse Login Already Exists");
  //       this.GetRegistreedVoiladocusers()
  //     }
  //   })

  // }
  public InsertNurseSpecilization(list: any) {
    var specentity = {
      'NurseID': this.nurseid,
      'SpecializationID': list.specializationID,
      'LanguageID': 1
    }
    this.CommonService.InsertNurseSpecialization(specentity).subscribe(data => {
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertNurseSpecialization", error);
    })
  }



  //phsyio registaration

  public insertphysiodetails(list: any) {

    // this.idproofurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    // this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
    this.loader = true;
    var entity = {
      'Name': list.username,
      'PhoneNo': list.phoneNo,
      'Email': list.email,
      'GenderID': list.genderID,
      'Address': list.address,
      'CityID': list.cityID,
      'AreaID': list.cityID,
      'DepartementID': list.departmentID,
      'Experience': list.experience,
      'Description': 'none',
      'HomeVisit': list.homeCare,
      'IDProof': list.identityProof,
      'PhotoUrl': list.photo,
      'Pincode': list.zipcode,
      'CountryID': list.countryID,
      'HospitalClinicID': 613,
      'Education': list.education,
      'SpokenLanguages': list.speakLanguages,
      'SlotDurationID': 1,
      'SubscriptionTypeID': 3,
      'MonthlySubscription': 0,
      'AppointmentPercentage': 0,

      'CommercialRegCity': 0,

      'Nameofthebank': 0,
      'AccountName': 0,
      'AccountNumber': 0,
      'VAT': 0,
      'VatPercentage': 0,
      'ExonerationPeriodFromDate': new Date(),
      'ExonerationPerioToDate': new Date()
    }
    this.CommonService.InsertphysiotherapyRegistrationAdmin(entity).subscribe(data => {
      this.physioid = data;

      if (data != 0) {
        // this.InsertPhysiologindetails(list);
        this.insertPhysioSpecilization(list);
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;
        this.loader = false;
        this.GetRegistreedVoiladocusers();
        this.GetAllRegisteredUsersCount()

        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
        // location.href = '#/PhysiotherapistDashboard';
      }
      else {

        this.CommonService.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.CommonService.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
        this.loader = false
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2;
        // location.href = '#/PhysiotherapistDashboard';
        this.GetRegistreedVoiladocusers()
      }
    }, error => {
      console.log("error in Doctor", error);
      Swal.fire("Error in Registration. Plase Contact Administration");
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "UpdateVoiladocRegistrationEmailsStatusBackNormal", error);
    })
  }


  public insertPhysioSpecilization(list: any) {
    var specentity = {
      'PhysiotherapyID': this.physioid,
      'SpecializationID': list.specializationID,
      'LanguageID': 1
    }
    this.CommonService.InsertPhysiotherapySpecialization(specentity).subscribe(datas => {

    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertPhysiotherapySpecialization", error);
    })

  }




  public physioid: any;

  public InsertPhysiologindetails(list: any) {
    var entity = {
      'PhysiotherapistID': this.physioid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.CommonService.InsertPhysiotherapistLogin(entity).subscribe(data => {
      if (data != 0) {
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;
      }
      else {
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2;
      }
    })
  }

  //midiwfe Registaration



  public InsertMidWives(list: any) {
    // this.idproofurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    // this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
    this.loader = true;
    var entity = {
      'Name': list.username,
      'PhoneNo': list.phoneNo,
      'Email': list.email,
      'GenderID': list.genderID,
      'Address': list.address,
      'CityID': list.cityID,
      'AreaID': list.cityID,
      'DepartementID': list.departmentID,
      'Experience': list.experience,
      'Description': 'none',
      'HomeVisit': list.homeCare,
      'IDProof': list.dentityProof,
      'PhotoUrl': list.photo,
      'Pincode': list.zipcode,
      'CountryID': list.countryID,
      'HospitalClinicID': 614,
      'Education': list.education,
      'SpokenLanguages': list.speakLanguages,
      'SlotDurationID': 1,
      'SubscriptionTypeID': 3,
      'MonthlySubscription': 0,
      'AppointmentPercentage': 0,
      'TaxIdentification': 0,
      'BusinessID': 0,
      'CommercialRegCity': 0,
      'TaxProfessional': 0,
      'SocialSeccurityNo': 0,
      'Nameofthebank': 0,
      'AccountName': 0,
      'AccountNumber': 0,
      'VAT': 0,
      'VatPercentage': 0,
      'ExonerationPeriodFromDate': new Date(),
      'ExonerationPerioToDate': new Date()
    }
    this.CommonService.InsertMidWivesRegistration(entity).subscribe(data => {
      this.midewifeid = data;
      if (data != 0) {
        // this.InsertMidwifeLoginDetails(list)
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;


        this.loader = false;
        this.GetAllRegisteredUsersCount()
        this.GetRegistreedVoiladocusers()
        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
        // location.href = '#/MidwifeDashboard';
      }
      else {

        this.CommonService.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.CommonService.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
        this.loader = false;
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2;
        this.GetRegistreedVoiladocusers()
        // location.href = '#/MidwifeDashboard';
      }
    }, error => {
      console.log("error in Doctor", error);
      Swal.fire("Error in Registration. Plase Contact Administration");
      this.loader = false;
    })
  }

  public midewifeid: any;

  public InsertMidwifeLoginDetails(list: any) {

    var entity = {
      'MidWiveID': this.midewifeid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.CommonService.InsertMidWivesLogin(entity).subscribe(data => {
      if (data != 0) {
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;
      }
      else {
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2;
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertMidWivesLogin", error);
    })

  }



  // midwife end


  //pharmacy

  public pharmacyid: any;

  public InserPharmacyDetails(list: any) {
    
    this.loader = true;
    var entity = {
      'PharmacyName': list.username,
      'MobileNumber': list.phoneNo,
      'Email': list.email,
      'Password': '123',
      'ContactName': list.contactpersonName,
      'Address': list.address,
      'Zipcode': list.pincode,
      'LanguageID': '1',
      'LicenseNo': list.licenceNumber,
      'LicenseValidTill':list.licencevalidTill,
      'HomeDelivery': list.homeDelivery,
      'Website': list.website,
      'NightPharmacy': list.nightPharmacy,
      'TeleOrdering': list.telephoneOrdering,
      'Preffered': list.preferred,
      'CityID': list.cityID,
      'Description': list.description,
      'AreaID': list.cityID,
      'Pincode': list.pincode,
      'CountryID': list.countryID,
      'MonthlySubscription': '',
      'HospitalClinicID': '',
      'Hospitalfulltimebit': 1,
      'ContartStartDate': new Date(),
      'ContractEndDate':new Date(),
      'CommercialRegCity': '',
      'VAT': 0,
      'Lattitude': '',
      'Longitude': 0,
      'FormatedAddress': '',
      'cash': false,
      'Wallet': false,
      'CreditCard': false,
      "MrngTimeClosed": "00:00",
      "MrngTimeOpen": "00:00",  
      "AfternoonTimeClosed": "00:00",
      "AfternoonTimeOpen": "00:00", 
      'DocNearestLocDist': '',
      'DocNearestNumber': '',
      'AcountNames': '',
      'AcountNumbers': '',
      'PaymentCompany': '',
      'ProviderPay': false,
      'MvolaPay': false
    }
    this.CommonService.InsertPharmacyRegistration(entity).subscribe(data => {
      
      if (data != 0) {
        this.pharmacyid = data;
        this.insertphoto(list);
        // this.InserPharmacyLogins(list)
        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;

        this.GetAllRegisteredUsersCount()
        this.loader = false;
        // location.href = "#/Pharmacydashboard"
      }
      else {
        this.CommonService.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.CommonService.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2;
        this.loader = false;
        this.GetRegistreedVoiladocusers()
      }
    }, error => {
      console.log("error in Doctor", error);
      Swal.fire("Error in Registration. Plase Contact Administration");
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "UpdateVoiladocRegistrationEmailsStatusBackNormal", error);
    })
  }

  public InserPharmacyLogins(list: any) {
    var entity = {
      'PharmacyID': this.pharmacyid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.CommonService.InsertPharmacyAdminRegistration(entity).subscribe(data => {
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertPharmacyAdminRegistration", error);
    })

  }


  public insertphoto(list: any) {
    // if (this.attachmentsurl.length == 0) {
    //   this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\PharmacyPhotos\\Pharmacy.jpg'
    // }
    // for (let i = 0; i < this.attachmentsurl.length; i++) {

    var entity = {
      'PharmacyID': this.pharmacyid,
      'PhotoURL': list.photos
    }
    this.CommonService.InsertPharmacyPhotos(entity).subscribe(data => {

      if (data != 0) {
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertPharmacyPhotos", error);
    })
    // }

  }




  // Diagnostic Center

  public diagnosticid: any;


  public InserDiagnostoicDetails(list: any) {

    this.loader = true;

    var entity = {
      'DiagnosticCenterName': list.username,
      'Description': list.description,
      'Address': list.address,
      'PhoneNo': list.phoneNo,
      'EmailID': list.email,
      'Timings': 0,
      'LanguageID': '1',
      'Zipcode': list.pincode,
      'ContactPerson': list.contactpersonName,
      'ContactPersonPhNo': list.contactPersonPhNo,
      'LicenseNo': list.businessLicenceNumber,
      'LicenseValidTill': new Date(),
      'HomeSample': list.homeSamplePickup,
      'Preffered': list.preferred,
      'Website': list.website,
      'Awards': 'none',
      'CityID': list.cityID,
      'AreaID': list.cityID,
      'Pincode': list.pincode,
      'CountryID': list.countryID,
      'MonthlySubscription': 0,
      'HospitalClinicID': 0,
      'Hospitalfulltimebit': 1,
      'ContractStartDate': new Date(),
      'ContractEndDate': new Date(),
      'DiagnosticAppointmentPerSlot':'00:00',
      'HomeSampleOrdersPerSlot': '00:00',
      'EveningTimings': '00:00',
      'TaxIdentification': 0,
      'BusinessID': 0,
      'CommercialRegCity': 0,
      'TaxProfessional': 0,
      'SocialSeccurityNo': 0,
      'Nameofthebank': 0,
      'AccountName': 0,
      'AccountNumber': 0,
      'VAT': 0,
      'MrngTimeOpen': '00:00',
      'MrngTimeClosed': '00:00',
      'AfternoonTimeOpen': '00:00',
      'AfternoonTimeClosed': '00:00',
    }
    this.CommonService.InsertDiagnosticCenterRegistration(entity).subscribe(data => {

      if (data != 0) {
        this.diagnosticid = data;
        this.inserthspphotosDiagnosticPhotos(list);
        // this.InsertDiagnosticLogins(list)
        this.GetAllRegisteredUsersCount()

        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;
        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
        this.GetRegistreedVoiladocusers()
        this.loader = false;


      }
      else {
        this.CommonService.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.CommonService.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
        this.loader = false;
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2;

      }
    }, error => {
      console.log("error in Doctor", error);
      Swal.fire("Error in Registration. Plase Contact Administration");
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "UpdateVoiladocRegistrationEmailsStatusBackNormal", error);
    })


  }

  public inserthspphotosDiagnosticPhotos(list: any) {
    // if (this.attachmentsurl.length == 0) {
    //   this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DiagnosticCenterPhotos\\Diagnostics.jpg'
    // }

    // for (let i = 0; i < this.attachmentsurl.length; i++) {
    var entity = {
      'DiagnosticCenterID': this.diagnosticid,
      'PhotoURL': list.photo
    }
    this.CommonService.InsertInsertDiagnosticCenterPhotos(entity).subscribe(data => {

      if (data != 0) {
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertInsertDiagnosticCenterPhotos", error);
    })
    // }
  }


  public InsertDiagnosticLogins(list: any) {

    var entity = {
      'DiagnosticCenterID': this.diagnosticid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.CommonService.InsertDiagnosticCenterAdminRegistration(entity).subscribe(data => {

      if (data != 0) {
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;
      }
      else {
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2;
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertDiagnosticCenterAdminRegistration", error);
    })

  }


  rejectelist: any;


  public GetRejectedregistrations(list: any) {
    this.rejectelist = list;
    Swal.fire({
      title: this.labels.areYouSure,
      text: this.labels.rejectText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.rejectButton
    }).then((result) => {
      if (result.value) {
        this.CommonService.UpdateRejectedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
          let test = res;

          this.sendmails(list)
        })

        this.showPopup = 1;
        this.messageID = 89;
        this.typeofPopUp = 2;
        this.GetRegistreedVoiladocusers();
        this.GetAllRegisteredUsersCount();
      }

      else {

      }
    })
  }



  public Reject() {
    this.CommonService.UpdateRejectedVoiladocRegisteredUsers(this.rejectelist.id, this.rejectelist.type).subscribe(res => {
      let test = res;

      this.CommonService.UpdateVoiladocRegistrationEmailsStatus(this.rejectelist.regID).subscribe(data => {
      })

      this.sendmails(this.rejectelist)
      Swal.fire('Rejected Successfully');
      this.GetRegistreedVoiladocusers()
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "UpdateVoiladocRegistrationEmailsStatus", error);
    })
  }

  public reasonforcancel: any;

  public sendmails(listt: any) {

    var entity = {
      'emailto': listt.regemailid,
      'emailsubject': 'Voiladoc Registrations',
      'emailbody': 'Dear ' + listt.username + ',' + "<br><br>" + this.reasonforcancel + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team'
    }
    this.CommonService.sendemailsForLinkRegistrations(entity).subscribe(data => {

    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "sendemailsForLinkRegistrations", error);
    })
  }






  contactpersonname: any;
  contactpersonphno: any;
  experience: any;
  speaklanguages: any;
  website: any;
  description: any;
  yearEstablished: any;
  // view details
  public detailslist: any;
  photo: any;
  hospitalname: any;
  phoneno: any;
  address: any;
  email: any;
  typeids: any;
  slotduration: any;
  //doctor

  doctorname: any;
  regno: any;
  regcouncil: any;
  colleage: any;
  slotdurationid: any;
  otherexp: any;
  mediclproof: any;
  doctortype: any;
  professionalprofile: any;
  //nurse

  nursename: any;
  licenceno: any;
  pharmacyname: any;
  dianame: any;

  public GetViewdetails(list: any) {
    
    if (list.type == 1) {

      this.typeids = list.type;
      this.contactpersonname = list.contactpersonName;
      this.contactpersonphno = list.contatcpersonPhoneNo;
      this.experience = list.experience;
      this.website = list.website;
      this.yearEstablished = list.yearEstablished;
      this.description = list.description;
      this.photo = list.photo;
      this.hospitalname = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;

      this.signature = list.signaturePhoto;
    }
    else if (list.type == 2) {

      this.typeids = list.type;
      this.contactpersonname = list.contactpersonName;
      this.contactpersonphno = list.contatcpersonPhoneNo;
      this.experience = list.experience;
      this.website = list.website;
      this.yearEstablished = list.yearEstablished;
      this.description = list.description;
      this.photo = list.photo;
      this.hospitalname = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.signature = list.signaturePhoto;
    }
    else if (list.type == 3) {

      this.typeids = list.type;
      this.contactpersonname = list.contactpersonName;
      this.contactpersonphno = list.contatcpersonPhoneNo;
      this.experience = list.experience;

      this.description = list.description;
      this.photo = list.docphoto;
      this.doctorname = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.slotduration = list.slotDurationID,
        this.regno = list.registrationNumber,
        this.regcouncil = list.registrationCouncil,
        this.speaklanguages = list.speakLanguages,
        this.colleage = list.colleage,
        this.slotdurationid = list.slotDurationID,
        this.otherexp = list.otherExperiences,
        this.mediclproof = list.medicalproof,
        this.doctortype = list.doctorType
      this.signature = list.signaturePhoto;

    }
    else if (list.type == 4) {
      this.typeids = list.type;
      this.nursename = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.experience = list.experience;
      this.speaklanguages = list.speakLanguages,
        this.professionalprofile = list.professionalProfile;
      this.email = list.email;
      this.photo = list.nursephoto;
      this.mediclproof = list.identityproof

    }
    else if (list.type == 5) {
      this.typeids = list.type;
      this.nursename = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.experience = list.experience;
      this.speaklanguages = list.speakLanguages,
        this.professionalprofile = list.professionalProfile;
      this.email = list.email;
      this.photo = list.nursephoto;
      this.mediclproof = list.identityproof

    }
    else if (list.type == 6) {
      this.typeids = list.type;
      this.nursename = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.experience = list.experience;
      this.speaklanguages = list.speakLanguages,
        this.professionalprofile = list.professionalProfile;
      this.email = list.email;
      this.photo = list.nursephoto;
      this.mediclproof = list.identityproof
    }
    else if (list.type == 7) {
      this.typeids = list.type;
      this.pharmacyname = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.contactpersonname = list.contactpersonName;
      this.contactpersonphno = list.contatcpersonPhoneNo;
      this.experience = list.experience;
      this.website = list.website;
      this.licenceno = list.licenceNumber;
      this.photo = list.pharmacyphoto;
    }
    else if (list.type == 8) {
      this.typeids = list.type;
      this.dianame = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.contactpersonname = list.contactpersonName;
      this.contactpersonphno = list.contatcpersonPhoneNo;
      this.experience = list.experience;
      this.website = list.website;
      this.licenceno = list.businessLicenceNumber;
      this.photo = list.diaphoto;
      this.description = list.description;
    }
  }

  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    this.GetRegistreedVoiladocusers()
  }


}
