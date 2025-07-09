import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Labels from '../../../Lables/Doctors/myAppointments.json';

@Component({
  selector: 'app-doc-recp-profile',
  templateUrl: './doc-recp-profile.component.html',
  styleUrls: ['./doc-recp-profile.component.css']
})
export class DocRecpProfileComponent implements OnInit {
  hospitalclinicid:any;
  languageID:any;
  doctorid:any;
  recpid:any;
  dummrecplogins:any;
  name:any;
  phoneno:any;
  email:any;
  address:any;
  currentUrl:any;
  loader:boolean | undefined;
  labels:any;
  
  constructor(private DoctorService:DoctorService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorid = sessionStorage.getItem('userid');
    this.recpid = sessionStorage.getItem('recpid');
    
    this.GetIndependentDoctors_Receptionist();
  }


  public GetIndependentDoctors_Receptionist (){
    this.DoctorService.GetIndependentDoctors_Receptionist(this.languageID).subscribe(
      data => {
        
        this.dummrecplogins = data;
        var list = this.dummrecplogins.filter((x: { id: any; }) => x.id == this.recpid);
        this.name=list[0].name,
        this.phoneno=list[0].mobileNo,
        this.email=list[0].email,
        this.address=list[0].address
      
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetIndependentDoctors_Receptionist",error);
      }
    )
  }



}
