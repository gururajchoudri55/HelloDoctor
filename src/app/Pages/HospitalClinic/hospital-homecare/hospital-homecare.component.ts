import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../Lables/Hospital/hospitallabels.json';
import { RegisterService } from '../../RegisterLogins/RegisterService/register.service';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-hospital-homecare',
  templateUrl: './hospital-homecare.component.html',
  styleUrls: ['./hospital-homecare.component.css']
})
export class HospitalHomecareComponent implements OnInit {
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
  dummnurseloginList: any;
  nurseloginList: any;
  homeCareList: any;
  typeId: number = 1;
  constructor(private DoctorService: DoctorService, private SharedService: SharedService, private RegisterService: RegisterService,private CommonService:CommonService) { }

  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.hospitalid = sessionStorage.getItem('hospitalid');
    // this.gethospitaldoctorsforadmin();
    // this.getdepartmentmaster();

    this.getNurses()
  }



  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }




  getNurses() {
    if (this.typeId == 1) {
      this.CommonService.GetNurseRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.dummnurseloginList = data;
          this.homeCareList = this.dummnurseloginList.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalid)
          this.count = this.homeCareList.length;
          console.log(this.homeCareList)
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseLoginAdmin", error);
        }
      )
    }
    else if (this.typeId == 2) {
      this.CommonService.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.dummnurseloginList = data;
          this.homeCareList = this.dummnurseloginList.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalid)
          this.count = this.homeCareList.length;
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetPhysiotherapistLoginAdmin", error);
        }
      )
    }
    else if (this.typeId == 3) {
      this.CommonService.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {
          this.dummnurseloginList = data;
          this.homeCareList = this.dummnurseloginList.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalid)
          this.count = this.homeCareList.length;
          this.loader = false;
        }, error => {
          this.loader = false;
          console.log("error with GetMidWivesLoginAdmin", error);
          this.SharedService.insertexceptions(this.currentUrl, "GetMidWivesLoginAdmin", error);
        }
      )
    }


  }


  selectProvider(even: any) {
    this.typeId = even.target.value;
    this.getNurses();
  }

}
