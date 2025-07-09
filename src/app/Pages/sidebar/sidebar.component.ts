import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Labels from '../Lables/sidebar/sidebarlabels.json';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sidebarBtn: any;
  sidebar: any;
  roleID: any;
  classList: any;
  user: any;
  hospitalType: any;
  hospitalid: any;
  hospitalididd: any;
  languageid: any;
  labels: any;

  headinReports: any;
  registeredEntities: any;
  revenue: any;
  appointments: any;
  cancelledappointments: any;
  registeredPatients: any;
  hospitals: any;
  registrations: any;
  dashboard: any;
  clinics: any;
  groupOfDoctors: any;
  doctors: any;
  pharmacy: any;
  diagnostic: any;
  nurse: any;
  physiotherapist: any;
  midwife: any;
  prscriptionverifier: any;
  deliverycompany: any;
  workingDetails: any;
  doctorsworkingDetails: any;
  nurseworkingDetails: any;
  careGiverworkingDetails: any;
  midwifeworkingDetails: any;
  diagnosticworkingDetails: any;
  manageLogins: any;
  hospital: any;
  doctordash: any;
  diagnosticManagelogin: any;
  pharmacyManagelogin: any;
  nurseManagelogin: any;
  physiotherapistManagelogin: any;
  midwifeManagelogin: any;
  deliverycompanyManagelogin: any;
  availabilityreport: any;
  docAvailabilty: any;
  nursavailabilty: any;
  physioAvailability: any;
  midwifeavailability: any;
  logreports: any;
  reportdeutilisation: any;
  Smslogs: any;
  registeredPatientsmenu: any;
  patientHistory: any;
  patientWallet: any;
  ventesetmarketing: any;
  registrationsLink: any;
  externalRegistrationsdashboard: any;
  approvedusers: any;
  rejectedusers: any;
  emailetSMSmarketing: any;
  sendMails: any;
  emailDashboard: any;
  sendSMS: any;
  smsDashboard: any;
  programmedeparrainage: any;
  patientInvitations: any;
  invitationReport: any;
  invitationMaster: any;
  promoCode: any;
  promoReport: any;
  structureorg: any;
  menulist: any;
  sponsored: any;
  homepagesponsorship: any;
  appointmentsponsorship: any;
  pharmacysponsered: any;
  diagnosticentersponsered: any;
  hospitalclinicsponsered: any;
  ecommerce: any;
  menus: any;
  setupcustom: any;
  masters: any;
  support: any;
  Refund: any;
  refundTickets: any;
  refundCompletedTickets: any;
  patientHistorsy: any;
  profile: any;
  Transactions: any;
  countrySetting: any;
  docotherparameters: any;
  soaplab: any;
  tutoriels: any;
  patientdata: any;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.roleID = sessionStorage.getItem('roleid');
    this.user = sessionStorage.getItem('user');
    this.hospitalType = sessionStorage.getItem('hospitalType');
    this.hospitalid = sessionStorage.getItem('hospitalClinicID');

    this.hospitalididd = sessionStorage.getItem('hospitalid');
    console.log('RoleID', this.roleID);
    this.getrole();
  }

  getrole() {
    if (
      this.roleID == 15 ||
      this.roleID == 18 ||
      this.roleID == 19 ||
      this.roleID == 20 ||
      this.roleID == 21 ||
      this.roleID == 17
    ) {
      this.commonService
        .GetMenuRoleMappingTableByRoleID(6, this.roleID)
        .subscribe((data) => {
          this.menulist = data;
          for (let i = 0; i < this.menulist.length; i++) {
            if (this.menulist[i].menus === 'Registry') {
              this.registrations = true;
            }
            if (this.menulist[i].menus === 'Manage logins') {
              this.manageLogins = true;
            }
            if (this.menulist[i].menus === 'Overview') {
              this.headinReports = true;
            }
            if (this.menulist[i].menus === 'Sponsored') {
              this.sponsored = true;
            }
            if (this.menulist[i].menus === 'Working Details') {
              this.workingDetails = true;
            }
            if (this.menulist[i].menus === 'Availability Report') {
              this.availabilityreport = true;
            }
            if (this.menulist[i].menus === 'Log Reports') {
              this.logreports = true;
            }
            if (this.menulist[i].menus === 'Ventes et marketing') {
              this.ventesetmarketing = true;
            }
            if (this.menulist[i].menus === 'Config et personnalisation') {
              this.setupcustom = true;
            }
            if (this.menulist[i].menus === 'Dashboard') {
              this.dashboard = true;
            }
            if (this.menulist[i].menus === 'Ecommerce') {
              this.ecommerce = true;
            }
            if (this.menulist[i].menus === 'Menus') {
              this.menus = true;
            }
            if (this.menulist[i].menus === 'Masters') {
              this.masters = true;
            }
            if (this.menulist[i].subMenuName === 'Hospitals') {
              this.hospitals = true;
            }
            if (this.menulist[i].subMenuName === 'Clinics') {
              this.clinics = true;
            }
            if (this.menulist[i].subMenuName === 'Diagnostic') {
              this.diagnostic = true;
            }
            if (this.menulist[i].subMenuName === 'Pharmacy') {
              this.pharmacy = true;
            }
            if (this.menulist[i].subMenuName === 'Appointments') {
              this.appointments = true;
            }
            if (this.menulist[i].subMenuName === 'Registered Entities') {
              this.registeredEntities = true;
            }
            if (this.menulist[i].subMenuName === 'Revenue') {
              this.revenue = true;
            }
            if (this.menulist[i].subMenuName === 'Registered Patients') {
              this.registeredPatients = true;
            }
            if (this.menulist[i].subMenuName === 'Cancelled Appoinments') {
              this.cancelledappointments = true;
            }
            if (this.menulist[i].subMenuName === 'Nurse') {
              this.nurse = true;
            }
            if (this.menulist[i].subMenuName === 'Physiotherapist') {
              this.physiotherapist = true;
            }
            if (this.menulist[i].subMenuName === 'MidWife') {
              this.midwife = true;
            }
            if (this.menulist[i].subMenuName === 'Delivery Company') {
              this.deliverycompany = true;
            }
            if (this.menulist[i].subMenuName === 'Prescription Verifiers') {
              this.prscriptionverifier = true;
            }
            if (this.menulist[i].subMenuName === 'Prescription Verifiers') {
              this.prscriptionverifier = true;
            }
            if (this.menulist[i].subMenuName === 'Doctor  Logins') {
              this.doctordash = true;
            }
            if (this.menulist[i].subMenuName === 'Hospital Logins') {
              this.hospital = true;
            }
            if (this.menulist[i].subMenuName === 'Diagnostic Logins') {
              this.diagnosticManagelogin = true;
            }
            if (this.menulist[i].subMenuName === 'Pharmacy Logins') {
              this.pharmacyManagelogin = true;
            }
            if (this.menulist[i].subMenuName === 'Nurse Logins') {
              this.nurseManagelogin = true;
            }
            if (this.menulist[i].subMenuName === 'Physiotherapist Logins') {
              this.physiotherapistManagelogin = true;
            }
            if (this.menulist[i].subMenuName === 'Midwife Logins') {
              this.midwifeManagelogin = true;
            }
            if (this.menulist[i].subMenuName === 'Delivery company Logins') {
              this.deliverycompanyManagelogin = true;
            }
            if (this.menulist[i].subMenuName === 'Home Page Sponsorship') {
              this.homepagesponsorship = true;
            }
            if (this.menulist[i].subMenuName === 'Appointment Sponsorship') {
              this.appointmentsponsorship = true;
            }
            if (this.menulist[i].subMenuName === 'Pharmacy Sponsered') {
              this.pharmacysponsered = true;
            }
            if (
              this.menulist[i].subMenuName === 'Diagnostic Center Sponsered'
            ) {
              this.diagnosticentersponsered = true;
            }
            if (
              this.menulist[i].subMenuName === 'Hospital / Clinic Sponsered'
            ) {
              this.hospitalclinicsponsered = true;
            }
            if (this.menulist[i].subMenuName === 'Doctor') {
              this.doctors = true;
            }
            if (this.menulist[i].subMenuName === 'Group of Doctors') {
              this.groupOfDoctors = true;
            }
            if (this.menulist[i].subMenuName === 'Doctor Working') {
              this.doctorsworkingDetails = true;
            }
            if (this.menulist[i].subMenuName === 'Nurse Working') {
              this.nurseworkingDetails = true;
            }
            if (this.menulist[i].subMenuName === 'MidWife Working') {
              this.midwifeworkingDetails = true;
            }
            if (this.menulist[i].subMenuName === 'Diagnostic Working') {
              this.diagnosticworkingDetails = true;
            }
            if (this.menulist[i].subMenuName === 'Physiotherapist Working') {
              this.careGiverworkingDetails = true;
            }
            if (this.menulist[i].subMenuName === 'Available Doctors') {
              this.docAvailabilty = true;
            }
            if (this.menulist[i].subMenuName === 'Available Nurse') {
              this.nursavailabilty = true;
            }
            if (this.menulist[i].subMenuName === 'Available Midwives') {
              this.midwifeavailability = true;
            }
            if (this.menulist[i].subMenuName === 'Available Caregivers') {
              this.physioAvailability = true;
            }
            if (this.menulist[i].subMenuName === 'Report Deutilisation') {
              this.reportdeutilisation = true;
            }
            if (this.menulist[i].subMenuName === 'Smslogs') {
              this.Smslogs = true;
            }
            if (this.menulist[i].subMenuName === 'RegisteredPatients') {
              this.registeredPatientsmenu = true;
            }
            if (this.menulist[i].subMenuName === 'PatientHistory') {
              this.patientHistory = true;
            }
            if (this.menulist[i].subMenuName === 'PatientWallet') {
              this.patientWallet = true;
            }
            if (this.menulist[i].subMenuName === 'Registration Link') {
              this.registrationsLink = true;
            }
            if (this.menulist[i].subMenuName === 'Email et SMS marketing') {
              this.emailetSMSmarketing = true;
            }
            if (this.menulist[i].subMenuName === 'Programme de parrainage ') {
              this.programmedeparrainage = true;
            }
            if (this.menulist[i].subMenuName === 'Structure d’organisation') {
              this.structureorg = true;
            }
            if (this.menulist[i].subMenuName === 'Transactions/paramètres') {
              this.Transactions = true;
            }
            if (this.menulist[i].subMenuName === 'Réglage du pays') {
              this.countrySetting = true;
            }
            if (
              this.menulist[i].subMenuName === 'Médecin et autres paramètres'
            ) {
              this.docotherparameters = true;
            }
            if (
              this.menulist[i].subMenuName === 'Données SOAP, Labo et pharma'
            ) {
              this.soaplab = true;
            }
            if (this.menulist[i].subMenuName === 'FAQ et tutoriels') {
              this.tutoriels = true;
            }
            if (this.menulist[i].subMenuName === 'Données patients') {
              this.patientdata = true;
            }
          }
        });
    }
  }

  public openNav() {
    let arrow = document.querySelectorAll('.arrow');
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener('click', (e: any) => {
        let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
        arrowParent.classList.toggle('showMenu');
      });
    }

    // document.getElementById("sidebarid")?.classList.add("col-lg-1");
    // document.getElementById("head")?.classList.add("col-lg-11");
  }

  AfterViewInit() {
    document.getElementById('someid')?.addEventListener('click', () => {
      this.sidebar.classList.toggle('close');
    });
  }

  openview() {
    this.sidebar = document.querySelector('.sidebar');
    this.sidebarBtn = document.querySelector('.bx-menu');

    console.log(this.sidebarBtn);
    this.sidebarBtn.addEventListener('click', () => {
      this.sidebar.classList.toggle('close');

      // document.getElementById("sidebarid")?.classList.remove('col-lg-2');
      // document.getElementById("sidebarid")?.classList.add("col-lg-1");
      //
      // document.getElementById("head")?.classList.remove('col-lg-10');
      // document.getElementById("head")?.classList.add("col-lg-11");
    });

    // document.getElementById("sidebarid")?.classList.remove("col-lg-1");
    //  document.getElementById("head")?.classList.remove("col-lg-11");
    // document.getElementById("sidebarid")?.classList.add("col-lg-2");
    //

    // document.getElementById("head")?.classList.add("col-lg-10");
  }

  public openNav1() {
    document.getElementById('sidebar')!.style.width = '306x';
    // document.getElementById("main")!.style.marginLeft = "230px";
  }

  logOut() {
    sessionStorage.clear();
    sessionStorage.clear();
    location.href = '#/login';
    location.reload();
  }

  public highlight(evt: any) {
    debugger;
    sessionStorage.setItem('showSidebar', '0');
    var i, tablinks;
    //  sessionStorage.setItem("clickname",name)
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    evt.currentTarget.className += ' active';
  }

  active: any;
  Reports() {
    this.active = 2;
    sessionStorage.setItem('clickname', 'Reports');
  }
}
