import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../Lables/Hospital/hospitallabels.json'
@Component({
  selector: 'app-hospital-doctors',
  templateUrl: './hospital-doctors.component.html',
  styleUrls: ['./hospital-doctors.component.css']
})
export class HospitalDoctorsComponent implements OnInit {
  languageid: any;
  hospitalid: any;
  term: any;
  doctorlist: any;
  dummlist: any;
  count: any;
  departmentlist: any;
  currentUrl: any;
  search: any;
  p: any;
  loader: boolean | undefined;
  labels: any;
  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }

  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.gethospitaldoctorsforadmin();
    this.getdepartmentmaster();
  }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }



  public GetDepartmentID(even: any) {
    if (even.target.value != 0) {
      this.term = even.target.value;
      this.doctorlist = this.dummlist.filter((x: { departmentname: any; }) => x.departmentname == this.term)
      this.count = this.doctorlist.length;
    }
    else {
      this.gethospitaldoctorsforadmin();
    }

  }

  public gethospitaldoctorsforadmin() {
    this.DoctorService.GetHospitalDoctorsForAdmin(this.hospitalid, this.languageid).subscribe(
      data => {
        this.doctorlist = data;
        this.dummlist = data;
        this.count = this.doctorlist.length;
        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetHospitalDoctorsForAdmin", error);
      }
    )
  }

  public getdepartmentmaster() {

    this.DoctorService.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.departmentlist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDepartmentMasterByLanguageID", error);
      }
    )
  }

}
