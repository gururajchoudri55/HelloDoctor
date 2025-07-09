import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { formatDate } from '@angular/common';
import Labels from '../../Lables/Hospital/hospitallabels.json'

@Component({
  selector: 'app-hospital-appointments',
  templateUrl: './hospital-appointments.component.html',
  styleUrls: ['./hospital-appointments.component.css']
})
export class HospitalAppointmentsComponent implements OnInit {
  languageid:any;
  hospitalid:any;
  roleid:any;
  appointmentlist:any;
  dummlist:any;
  count:any;
  currentUrl:any;
  loader:boolean | undefined;
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  departmentlist:any;
  term:any;
  p:any;
  appointmentid:any;
  doctorname:any;
  doctorlist:any;
  docdd:any;
  search:any;
  select:any;
  labels:any;
  selectdoctor:any;

  

  constructor(private DoctorService:DoctorService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selectdoctor=this.labels.selectDoctor;
    this.search=this.labels.search;
    this.hospitalid = sessionStorage.getItem('hospitalid');
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
    this.getbookappointmentbyhospitalbyhospitalid();
    this.getdepartmentmaster();
    this.gethospitaldoctorsforadmin();

  }

  public gethospitaldoctorsforadmin() {

    this.DoctorService.GetHospitalDoctorsForAdmin(this.hospitalid, this.languageid).subscribe(
      data => {
        this.doctorlist = data;
        this.docdd = {
          singleSelection: true,
          idField: 'doctorID',
          textField: 'doctorName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true
        };

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetHospitalDoctorsForAdmin",error);
      }
    )
  }




  public getbookappointmentbyhospitalbyhospitalid() {
    this.DoctorService.GetBookAppointmentByHospital_ClinicID(this.hospitalid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.appointmentlist = data;
        this.dummlist = this.appointmentlist;
        this.count = this.appointmentlist.length;
        this.loader=false;
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
              sessionStorage.setItem("startdate", this.startdate);
              sessionStorage.setItem("enddate", this.enddate);
              this.getbookappointmentbyhospitalbyhospitalid();
        }

        public getdepartmentmaster() {
          this.DoctorService.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
            data => {
              this.departmentlist = data;
            }, error => {
              this.SharedService.insertexceptions(this.currentUrl,"GetDepartmentMasterByLanguageID",error);
            }
          )
        }

        public GetDepartmentName(even:any) {

          if (even.target.value != 0) {
            this.term = even.target.value;
            this.appointmentlist = this.dummlist.filter((x: { departmentname: any; }) => x.departmentname == this.term)
            this.count = this.appointmentlist.length;
          }
          else if (even.target.value == 0) {
            this.getbookappointmentbyhospitalbyhospitalid();
          }
        }


        public pageChanged(even:any) {
          let fgdgfgd = even;
          this.p = even;
        }

        public GetDoctorName(item: any) { 
          this.doctorname = item.doctorName
          this.appointmentlist = this.dummlist.filter((x: { doctorName: any; }) => x.doctorName == this.doctorname)
          this.count = this.appointmentlist.length;
        }


}
