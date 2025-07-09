import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/Doctors/myAppointments.json';
import { SharedService } from '../../services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
})
export class BookAppointmentComponent implements OnInit {
  constructor(
    private DoctorService: DoctorService,
    private activatedroute: ActivatedRoute,
    private SharedService: SharedService
  ) {}
  private host1: string = environment.API_URL;
  user: any;
  showback: any;
  hospitalid: any;
  languageID: any;
  doctorSlotID: any;
  slotname: any;
  PaidAmount: any;
  doctorID: any;
  doctorHospitalID: any;
  appointmentDate: any;
  appointmentTypeID: any;
  bookingTypeID: any;
  homevisit: boolean | undefined;
  combinationvalue: any;
  PaymentTypeID: any;
  patientList: any;
  patientdd = {};
  patientDetails: any;
  doctorList: any;
  doctorName: any;
  doctorEmail: any;
  patientID: any;
  patientName: any;
  mobileNumber: any;
  address: any;
  email: any;
  smsmobileno: any;
  reasonForVisit: any;
  showSearchBox: any;
  term: any;
  loader: boolean | undefined;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  labels: any;
  selectpatient: any;
  search: any;
  currentUrl: any;
  relationPatientId: any;
  PaidAmounts: any;
  hospitalClinicID: any;
  roleid: any;
  doctorMobileNumber: any;

  ngOnInit(): void {
    debugger;
    this.loader = true;
    this.currentUrl = window.location.href;
    this.user = sessionStorage.getItem('user');
    this.doctorName = sessionStorage.getItem('doctorName');
    this.doctorMobileNumber = sessionStorage.getItem('MobileNumber');
    this.showback = sessionStorage.getItem('Showbutton');
    this.hospitalid = sessionStorage.getItem('hospitalid');
    console.log('hostURL', this.host1);
    this.hospitalClinicID = sessionStorage.getItem('hospitalClinicID');

    this.languageID = sessionStorage.getItem('LanguageID');
    this.roleid = sessionStorage.getItem('roleid');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.selectpatient = this.labels.selectPatient;
    this.doctorID = sessionStorage.getItem('doctorid');
    this.doctorHospitalID = sessionStorage.getItem('doctorhospitalid');
    this.appointmentDate = sessionStorage.getItem('appointmentate');
    this.appointmentTypeID = sessionStorage.getItem('Appointmenttypeid');
    this.bookingTypeID = sessionStorage.getItem('BookingTypeID');
    this.search = this.labels.search;
    this.PaymentTypeID = '0';
    this.activatedroute.params.subscribe((params) => {
      this.doctorSlotID = params['doctorSlotID'];
      this.slotname = params['slotName'];
      this.PaidAmounts = params['doctorFees'];
      this.PaidAmount = this.PaidAmounts;
    });

    if (this.appointmentTypeID == 1) {
      this.homevisit = false;
      this.combinationvalue = 'In Clinic';
      this.bookingTypeID = 0;
    }

    if (this.appointmentTypeID == 2) {
      this.homevisit = false;
      this.combinationvalue = 'Video Conference';
    }
    if (this.appointmentTypeID == 5) {
      this.homevisit = true;
      this.combinationvalue = 'Home Visit';
      this.bookingTypeID = 0;
    }

    this.GetPatientDetails();
    this.GetPatients();
    this.getdoctorforadmin();
  }

  public GetPatients() {
    debugger;
    if (this.showback == 1) {
      this.DoctorService.GetBookAppointmentByHospitalPatients(
        this.hospitalid,
        '2020-01-01',
        '2060-01-01'
      ).subscribe(
        (data) => {
          // this.patientslist =
          // this.dummlist.filter(x => x.doctorID == this.doctorid)
          this.patientList = data;
          this.patientdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'patientName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true,
          };
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetBookAppointmentByHospitalPatients',
            error
          );
        }
      );
    } else if (this.showback == 2) {
      this.DoctorService.GetBookAppointmentByHospitalPatients(
        this.hospitalClinicID,
        '2020-01-01',
        '2060-01-01'
      ).subscribe(
        (data) => {
          this.patientList = data;
          // this.patientslist = data;
          this.patientdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'patientName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true,
          };
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetBookAppointmentByHospitalPatients',
            error
          );
        }
      );
    }
  }

  public GetPatientDetails() {
    this.DoctorService.GetPatientRegistrationDetails().subscribe(
      (data) => {
        this.patientDetails = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPatientRegistrationDetails',
          error
        );
      }
    );
  }

  public getdoctorforadmin() {
    this.DoctorService.GetDoctorForAdminByLanguageID(this.languageID).subscribe(
      (data) => {
        this.loader = false;
        this.doctorList = data;

        var list = data.filter((x) => x.id == this.doctorID);
        this.doctorName = list[0].doctorName;
        this.doctorEmail = list[0].emailID;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorForAdminByLanguageID',
          error
        );
      }
    );
  }

  public GetPatientID(item: any) {
    debugger;
    this.patientID = item.id;
    var list = this.patientList.filter(
      (x: { id: any }) => x.id == this.patientID
    );
    this.patientName = list[0].patientName;
    this.mobileNumber = list[0].mobileNumber;
    this.address = list[0].address;
    (this.email = list[0].emailID),
      (this.smsmobileno = list[0].smsmobileno),
      (this.relationPatientId = list[0].patientID);
    console.log('relationpatientid', this.relationPatientId);
  }

  acceptedTerms() {
    this.showSearchBox = 1;
  }

  searchon: any;

  public Searchpatient(term: any) {
    if (term.length > 8) {
      this.searchon = 1;
    } else {
      this.searchon = 0;
    }
  }

  GetPatientsID(details: any) {
    this.patientID = details.id;
    this.patientName = details.patientName;
    this.mobileNumber = details.mobileNumber;
    this.address = details.address;
    (this.email = details.emailID), (this.smsmobileno = details.smsmobileno);
    this.relationPatientId = details.patientID;
    console.log('relationpatientid', this.relationPatientId);
    this.searchon = 0;
    this.showSearchBox = 0;
  }

  appointmentID: any;
  host: any;
  appointmentType: any;
  public bookappointment() {
    debugger;
    this.loader = true;
    this.showPopup = 0;
    if (this.patientID == null || this.patientID == undefined) {
      // Swal.fire("Please Select Patient")
      this.showPopup = 1;
      this.messageID = 62;
      this.typeofPopUp = 2;
      this.loader = false;
    } else {
      var entity = {
        DoctorID: this.doctorID,
        PatientID: this.patientID,
        Date: this.appointmentDate,
        ApptDatetime: this.appointmentDate,
        DoctorSlotID: this.doctorSlotID,
        DoctorHospitalDetailsID: this.doctorHospitalID,
        BookingTypeID: this.bookingTypeID,
        AppointmentTypeID: this.appointmentTypeID,
        CombinationValue: this.combinationvalue,
        Slots: this.slotname,
        PName: this.patientName,
        PEmail: this.email,
        PMobileNo: this.mobileNumber,
        PRelation: '',
        NurseID: 1,
        ReasonForVisit: this.reasonForVisit,
        PaidAmount: this.PaidAmount,
        HomeVisit: this.homevisit,
        FollowApp: this.PaymentTypeID == 4 ? true : false,
        RelationPatientID:
          this.relationPatientId == 0 || this.relationPatientId == null
            ? this.patientID
            : this.relationPatientId,
      };
      this.DoctorService.InsertBookAppointmentForWeb(entity).subscribe(
        (data) => {
          this.appointmentID = data;
          if (data != 0) {
            this.loader = false;
            if (this.showback == 1) {
              console.log('appointmentType', this.appointmentTypeID);
              if (this.appointmentTypeID == 1) {
                this.appointmentType = 'En clinique';
              } else if (this.appointmentTypeID == 2) {
                this.appointmentType = 'Appel vidéo';
              } else {
                this.appointmentType = 'Visite à domicile';
              }
              var smsdesc = `${this.patientName}  vous avez un nouveau rdv ${this.appointmentType} réservé avec ${this.doctorName}  en attente de confirmation. Date et heure  ${this.appointmentDate} ${this.slotname}`;
              this.SendTwiliSms(smsdesc, this.smsmobileno);
              this.sendEmail(smsdesc);
              if (
                this.host1 ==
                'https://madagascar.voiladoc-eastafrica.com/MadagascarWebAPI'
              ) {
                this.sendAdminEmail(smsdesc);
                this.sendAdmin1Email(smsdesc);
              } else {
                this.sendEmailDoctor();
              }
              this.showPopup = 1;
              this.messageID = 63;
              this.typeofPopUp = 1;
              location.href = '#/HospitalClinic/HospitalAppointments';
            } else {
              if (this.appointmentTypeID == 1) {
                this.appointmentType = 'En clinique';
              } else if (this.appointmentTypeID == 2) {
                this.appointmentType = 'Appel vidéo';
              } else {
                this.appointmentType = 'Visite à domicile';
              }
              var smsdesc = `${this.patientName}  vous avez un nouveau rendez-vous ${this.appointmentType} réservé avec ${this.doctorName}  en attente de confirmation. Date et heure  ${this.appointmentDate} ${this.slotname}`;
              this.SendTwiliSms(smsdesc, this.smsmobileno);
              this.sendEmail(smsdesc);
              if (
                this.host1 ==
                'https://madagascar.voiladoc-eastafrica.com/MadagascarWebAPI'
              ) {
                this.sendAdminEmail(smsdesc);
                this.sendAdmin1Email(smsdesc);
              } else {
                this.sendEmailDoctor();
              }
              this.showPopup = 1;
              this.messageID = 63;
              this.typeofPopUp = 1;
              if (this.roleid == 2) {
                location.href = '#/Doctor/MyAppointments';
              } else {
                location.href = '#/Doctor/RecpAppointments';
              }
            }
            // this.insertpaymentDetails()
            //this.sendmail();
          }
        },
        (error) => {
          this.loader = false;
          this.SharedService.insertexceptions(
            this.currentUrl,
            'InsertBookAppointmentForWeb',
            error
          );
        }
      );
    }
  }

  clear(even: any) {
    this.patientName = '';
    this.address = '';
    this.email = '';
    this.mobileNumber = '';
  }

  public SendTwiliSms(smsdesc: any, smsmobileno: any) {
    this.DoctorService.SendTwillioSMS(smsmobileno, smsdesc).subscribe(
      (data) => {}
    );
  }
  public async sendAdminEmail(smssdesc: any) {
    var entity = {
      emailto: 'emmanuel@meridionalhealth.com',
      emailsubject: smssdesc,
      emailbody: smssdesc,
      attachmenturl: [],
      cclist: [],
      bcclist: [],
    };
    this.DoctorService.sendemail(entity).subscribe(
      async (data) => {
        console.log('email respone', data);
      },
      (error) => {
        console.log('email respone', error);
      }
    );
  }
  public async sendAdmin1Email(smssdesc: any) {
    var entity = {
      emailto: 'haja.ranaivoarissoa@voiladoc.mg',
      emailsubject: smssdesc,
      emailbody: smssdesc,
      attachmenturl: [],
      cclist: [],
      bcclist: [],
    };
    this.DoctorService.sendemail(entity).subscribe(
      async (data) => {
        console.log('email respone', data);
      },
      (error) => {
        console.log('email respone', error);
      }
    );
  }

  public async sendEmail(smssdesc: any) {
    debugger;
    var entity = {
      emailto: this.email,
      emailsubject: smssdesc,
      emailbody: smssdesc,
      attachmenturl: [],
      cclist: [],
      bcclist: [],
    };
    this.DoctorService.sendemail(entity).subscribe(
      async (data) => {
        console.log('email respone', data);
      },
      (error) => {
        console.log('email respone', error);
      }
    );
  }
  smsdocdesc: any;
  public async sendEmailDoctor() {
    if (this.appointmentTypeID == 1) {
      this.appointmentType = 'En clinique';
    } else if (this.appointmentTypeID == 2) {
      this.appointmentType = 'Appel vidéo';
    } else {
      this.appointmentType = 'Visite à domicile';
    }
    this.smsdocdesc = `Vous avez une nouvelle réservation ${this.appointmentType} entrante pour le ${this.slotname}. Veuillez accepter ou refuser.`;
    var entity = {
      emailto: this.doctorEmail,
      emailsubject: `AppointMnet update`,
      emailbody: this.smsdocdesc,
      attachmenturl: [],
      cclist: [],
      bcclist: [],
    };
    this.DoctorService.sendemail(entity).subscribe(
      async (data) => {
        this.sendDoctorTwiliSms(this.smsdocdesc, this.doctorMobileNumber);
        console.log('email respone', data);
      },
      (error) => {
        console.log('email respone', error);
      }
    );
  }
  public sendDoctorTwiliSms(smsdocdesc: any, doctorMobileNumber: any) {
    this.DoctorService.SendTwillioSMS(doctorMobileNumber, smsdocdesc).subscribe(
      (data) => {}
    );
  }

  GetFollowUpID(even: any) {
    this.PaymentTypeID = even.target.value;

    if (this.PaymentTypeID == 4) {
      this.PaidAmount = 0;
    } else {
      this.PaidAmount = this.PaidAmounts;
    }
  }
}
