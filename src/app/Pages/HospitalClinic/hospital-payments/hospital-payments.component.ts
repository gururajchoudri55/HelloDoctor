import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { formatDate } from '@angular/common';
import Labels from '../../Lables/Hospital/hospitallabels.json'
@Component({
  selector: 'app-hospital-payments',
  templateUrl: './hospital-payments.component.html',
  styleUrls: ['./hospital-payments.component.css']
})
export class HospitalPaymentsComponent implements OnInit {
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  loader:boolean | undefined;
  languageid:any;
  hospitalid:any;
  term:any;
  dummlist:any;
  doctorlist:any;
  count:any;
  GrandTotal:any;
  appointmenttype:any;
  departmentlist:any;
  DropDowndoctorlist:any;
  doctorname:any;
  currentUrl:any;
  p:any;
  term1:any;
  search:any;
  labels:any;

  constructor(private DoctorService:DoctorService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
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
    this.enddate = formatDate(this.enddate, format1, locale1);

    sessionStorage.setItem('startdate',this.startdate);
    sessionStorage.setItem('enddate',this.enddate);
    this.bsRangeValue = [start, end];
 
    this.gethospitaldoctorsforadmin();
    this.getdepartmentmaster();
    this.GetHospitalDoctors()

    
  }


  public gethospitaldoctorsforadmin() {
   
    this.DoctorService.GetBookAppointmentByHospital_ClinicID(this.hospitalid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.doctorlist = data;
        this.dummlist = data;
        this.count = this.doctorlist.length;
        this.GrandTotal = 0;
        for (let i = 0; i < this.doctorlist.length; i++) {
          this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
          this.loader=false;
        }
      }, error => {
         this.SharedService.insertexceptions(this.currentUrl,"GetBookAppointmentByHospital_ClinicID",error);
         this.loader=false;
      }
    )
  }




        //To Select Date
        selectDate(data: any) {
          this.loader = true;
          this.startdate = this.DoctorService.GetDates(data[0]);
          this.enddate = this.DoctorService.GetDates(data[1]);
          sessionStorage.setItem("startdate", this.startdate);
          sessionStorage.setItem("enddate", this.enddate);
          this.gethospitaldoctorsforadmin();
    }




    public GetDepartmentID(even:any) {
   
      if (even.target.value != 0) {
        this.term = even.target.value;
        this.doctorlist = this.dummlist.filter((x: { departmentname: any; }) => x.departmentname == this.term)
        this.count = this.doctorlist.length;
        this.GrandTotal = 0;
        for (let i = 0; i < this.doctorlist.length; i++) {
          this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
        }
      }
      else if (even.target.value == 0) {
        this.gethospitaldoctorsforadmin()
      }
    }

    public getdepartmentmaster() {
   
      this.DoctorService.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
        data => {
          this.departmentlist = data;
          this.loader=false;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetDepartmentMasterByLanguageID",error);
          this.loader=false;
        }
      )
    }


    
  public GetHospitalDoctors() {
   
    this.DoctorService.GetHospitalDoctorsForAdmin(this.hospitalid, this.languageid).subscribe(
      data => {
        this.DropDowndoctorlist = data;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetHospitalDoctorsForAdmin",error);
        this.loader=false;
      }
    )
  }



  public GetDoctorName(even:any) {
    if (even.target.value != 0) {
      this.doctorname = even.target.value;
      this.doctorlist = this.dummlist.filter((x: { doctorName: any; }) => x.doctorName == this.doctorname)
      this.count = this.doctorlist.length;
      this.GrandTotal = 0;
      for (let i = 0; i < this.doctorlist.length; i++) {
        this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
      }
    }
    else if (even.target.value == 0) {
      this.gethospitaldoctorsforadmin()
    }
  }



  public SelectAppointmentType(even:any) {
    if (even.target.value != 0) {
      this.appointmenttype = even.target.value;
      this.doctorlist = this.dummlist.filter((x: { appointmentTypeID: any; }) => x.appointmentTypeID == this.appointmenttype)
      this.count = this.doctorlist.length;
      this.GrandTotal = 0;
      this.loader=false;
      for (let i = 0; i < this.doctorlist.length; i++) {
        this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
      }
    }
    else {
      this.gethospitaldoctorsforadmin()
    }
  }

   // Pagination
   public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

}
