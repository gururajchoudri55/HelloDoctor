import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  doctorid: any;
  languageid: any;
  appointmentlist: any;
  count: any;
  loader: boolean | undefined;
  currentUrl: any;
  search: any;
  p: any;
  labels:any;
  location:any;

  
  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.doctorid = sessionStorage.getItem('userid');
    this.getbookappointmentbydoctorid();
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
  }


  //Get Appointment By Doctor List

  public getbookappointmentbydoctorid() {
    this.DoctorService.GetBookAppointmentByDistinictDoctorID(this.doctorid).subscribe(
      data => {
        this.loader = false;
        this.appointmentlist = data;
        this.count = this.appointmentlist.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetBookAppointmentByDistinictDoctorID", error);
      }
    )
  }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //Edit 
  edit(id: any) {
    
    location.href = "#/Doctor/DME/" + btoa(id);
  }

  getAddress(address:any){
    this.location=address;
  }




}
