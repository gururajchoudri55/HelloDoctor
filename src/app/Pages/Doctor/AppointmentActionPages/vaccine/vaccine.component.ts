import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Lables from '../../../Lables/Doctors/myAppointments.json';
import { SharedService } from 'src/app/Pages/services/shared.service';




@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {

  constructor(private DoctorService: DoctorService,private SharedService:SharedService) { }
  @Input() Details: any;
  @Input() typeID: any;
  @Output() CloseVaccinePopUp: EventEmitter<any> = new EventEmitter();
  patientID: any;
  vaccinationList: any;
  vaccineName: any;
  vaccinedate: any;
  appointmentID: any;
  allergies: any;
  languageID: any;
  labels: any;
  currentUrl:any;


  ngOnInit(): void {
    
    this.currentUrl=window.location.href;
    this.appointmentID = this.Details[0].appointmentID
    this.patientID = this.Details[0].patientID
    console.log("Vaccine Details", this.Details)

    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Lables["en"][0] : Lables["fr"][0];
    if (this.typeID == 26) {
      this.getvaccinatindetails();
    }
    else if (this.typeID == 27) {

      this.allergies = this.Details[0].knownAllergies
      
      this.allergieslist = this.Details[0].knownAllergies.split(',')

      // this.allergies = []
      // for (let i = 0; i < this.allergieslist.length; i++) {
      //   var wtt = {
      //     displayValue: this.allergieslist[i]
      //   }
      //   
      //   this.allergies.push(wtt);
      // }
      // 
      this.GetAllerges();
    }
  }



  getvaccinatindetails() {
    this.DoctorService.GetPatient_VaccinationDetails(this.patientID,this.languageID).subscribe(
      data => {
        this.vaccinationList = data;

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPatient_VaccinationDetails",error);
      }
    )

  }

  getVaccineDate(date: any) {
    this.vaccinedate = this.DoctorService.GetDates(date)
  }



  messageID: any;

  insertDetails() {
    var entity = {
      'VaccinationName': this.vaccineName,
      'VaccinationDate': this.vaccinedate,
      'PatientID': this.patientID,
      'AppointmentID': this.appointmentID
    }
    this.DoctorService.InsertPatient_VaccinationDetails(entity).subscribe(data => {
      
      this.CloseVaccinePopUp.emit(this.messageID = 1)
      this.getvaccinatindetails()

    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertPatient_VaccinationDetails",error);
    })
  }






  //showalleries


  allergieslist: any = [];
  myarray: any = [];
  allergyidcount: any;
  public GetAllerges() {
    // this.allergieslist = this.allergies.split(',')

    // this.allergies = []
    // for (let i = 0; i < this.allergieslist.length; i++) {
    //   var wtt = {
    //     displayValue: this.allergieslist[i]
    //   }

    //   this.allergies.push(wtt);
    // }

    // this.allergyidcount=0
    
    this.myarray = []
    let showalergres = this.allergies.split(',');
    
    for (let i = 0; i < showalergres.length; i++) {
      var medetty = {
        'Showallergies': showalergres[i],
        'Snoo': i + 1
      }
      this.myarray.push(medetty);
      this.allergyidcount = this.allergyidcount + 1;

    }
  }




  public updateelergies: any;

  public deletealergeies(Sno: any) {

    for (let i = 0; i < this.myarray.length; i++) {
      if (Sno == this.myarray[i].Snoo) {
        this.myarray.splice(i, 1);
      }
    }
    this.updateelergies = '';
    for (let j = 0; j < this.myarray.length; j++) {

      if (this.updateelergies == '') {
        this.updateelergies = this.myarray[j].Showallergies;
      }
      else {
        this.updateelergies = this.updateelergies + ',' + this.myarray[j].Showallergies;
      }

    }
    this.Updatealriesss()
  }



  public Updateallergies() {
    this.updateelergies = '';
    

    for (let j = 0; j < this.myarray.length; j++) {

      if (this.updateelergies == '') {
        this.updateelergies = this.myarray[j].Showallergies;
      }
      else {
        this.updateelergies = this.updateelergies + ',' + this.myarray[j].Showallergies;
      }

    }

    var entity = {
      'AppointmentID': this.appointmentID,
      'KnownAllergies': this.updateelergies
    }
    this.DoctorService.UpdateBookAppointmentKnownAllergies(entity).subscribe(data => {
      this.CloseVaccinePopUp.emit(this.messageID = 1)
      let res = data;
      this.allergieslist = [];
      this.allergies = this.updateelergies;



      // if (this.languageid == 1) {
      //   Swal.fire('Allergies Updated Successfully');
      //   this.allergieslist = [];
      //   this.allergies = this.updateelergies;

      // }
      // else if (this.languageid == 6) {
      //   Swal.fire('Les allergies ont été mises à jour');
      //   this.allergieslist = [];
      //   this.allergies = this.updateelergies;

      // }
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateBookAppointmentKnownAllergies",error);
    })
  }


  addallergies: any;

  public updatedetsils() {

    var medetty = {
      'Showallergies': this.addallergies,
      'Snoo': this.myarray.length + 1
    }
    this.myarray.push(medetty);

    this.Updateallergies()
  }

  public Updatealriesss() {

    var entity = {
      'AppointmentID': this.appointmentID,
      'KnownAllergies': this.updateelergies
    }
    this.DoctorService.UpdateBookAppointmentKnownAllergies(entity).subscribe(data => {
      let res = data;
    
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateBookAppointmentKnownAllergies",error);
    })
  }

}
