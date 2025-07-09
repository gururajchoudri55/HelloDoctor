import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Doctors/myAppointments.json';


@Component({
  selector: 'app-doc-payments',
  templateUrl: './doc-payments.component.html',
  styleUrls: ['./doc-payments.component.css']
})
export class DocPaymentsComponent implements OnInit {
  loader:boolean | undefined;
  currentUrl:any;
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  p:any;
  doctorid:any;
  languageid:any;
  hospitalid:any;
  dummlist:any;
  doctorlist:any;
  dummlist1:any;
  count:any;
  GrandTotal:any;
  search:any;
  appointmenttype:any;
  labels:any;
  hospitalClinicID:any
  
  
  constructor(private DoctorService:DoctorService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.doctorid = sessionStorage.getItem('userid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.hospitalClinicID = sessionStorage.getItem('hospitalClinicID');

    //sessionStorage.setItem('hospitalClinicID', this.result[0].hospitalClinicID);
 
    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1)

    this.bsRangeValue = [start, end];
    this.gethospitaldoctorsforadmin();
  }


//Get DoctorList

  public gethospitaldoctorsforadmin() {
    this.DoctorService.GetBookAppointmentByHospital_ClinicID(this.hospitalClinicID, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.dummlist = data;
        this.doctorlist = this.dummlist.filter((x: { doctorID: any; }) => x.doctorID == this.doctorid)
        this.dummlist1=  this.dummlist.filter((x: { doctorID: any; }) => x.doctorID == this.doctorid)
        this.count = this.doctorlist.length;
        this.GrandTotal = 0;
        this.loader=false;
        for (let i = 0; i < this.doctorlist.length; i++) {
          this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetBookAppointmentByHospital_ClinicID",error);
      }
    )
  }

   //To Select Date
   selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    this.gethospitaldoctorsforadmin()
  }

      // Pagination
      public pageChanged(even: any) {

        let fgdgfgd = even;
        this.p = even;
      }

      //To Get AppointmentList
     
      public SelectAppointmentType(even:any) {
        if (even.target.value != 0) {
          this.appointmenttype = even.target.value;
          this.doctorlist = this.dummlist1.filter((x: { appointmentTypeID: any; }) => x.appointmentTypeID == this.appointmenttype)
          this.count = this.doctorlist.length;
          this.GrandTotal = 0;
          for (let i = 0; i < this.doctorlist.length; i++) {
            this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
          }
        }
        else {
          this.gethospitaldoctorsforadmin();
        }
    
      }


}
