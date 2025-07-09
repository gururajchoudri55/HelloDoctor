import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/sponsred/sponsered.json';


@Component({
  selector: 'app-sphospital-details',
  templateUrl: './sphospital-details.component.html',
  styleUrls: ['./sphospital-details.component.css']
})
export class SPHospitalDetailsComponent implements OnInit {
  hospitalid:any;
  hspcliid:any;
  languageid:any;
  hospitalcliniclist:any;
  hospitaldd:any;
  search:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  startdate:any;
  enddate:any;
  fees:any;
  loader:boolean | undefined;
  hospitalclinicname:any;
  sponserhospitalist:any;
  id:any;
  showbutton:any;
  labels:any;
  HospitalDescription: any;
hospitalDescription: any;
  


  constructor(private CommonService:CommonService,private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.search=this.labels.search;
    this.ActivatedRoute.params.subscribe(params => {
      this.showbutton = 0;
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else if (this.id != undefined) {
        this.showbutton = 1; 
        this.id=atob(this.id);
        this.getsponserhospitalforadmin()
      }
     
    }
    
    )
   
  }

  handleChange(event:any) {

    this.hspcliid = event.target.value;
    this.CommonService.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        let temp: any = data;
        this.hospitalcliniclist = temp.filter((x: { hospital_ClinicID: any; }) => x.hospital_ClinicID == this.hspcliid);
        this.hospitaldd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search
        };
      }, error => {
      }
    )
  }


  public GetHospitalID(item3: any) {

    this.hospitalid = item3.id;
  }

  public insertdetails() {
   this.showPopup=0;
    if (this.hospitalid == undefined) {
      this.showPopup=1;
      this.messageID=14;
      this.typeofPopUp=2;
    }
    else {
      
     var sdate= this.CommonService.GetDates(this.startdate);
     var edate= this.CommonService.GetDates(this.enddate);
      
      var entity = {
        'Hospital_ClinicID': this.hospitalid,
        'SDate': sdate,
        'EDate': edate,
        'Fees': this.fees,
        'HospitalDescription':this.hospitalDescription

      }
      this.CommonService.InsertSponsoredHospitals(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup=1;
          this.messageID=80;
          this.typeofPopUp=1;

          location.href = "#/Sponsered/SpHospital";  
        }
      })
    }
  }




  public getsponserhospitalforadmin() {
      this.CommonService.GetSponsoredHospitalsForAdmin().subscribe(
        data => {
          this.sponserhospitalist = data;
          
          var list = this.sponserhospitalist.filter((x: { id: any; }) => x.id == this.id)
          this.startdate = list[0].sDate,
            this.enddate = list[0].eDate,
            this.fees = list[0].fees,
            this.hospitalclinicname = list[0].hospital_ClinicName,
            this.hospitalDescription = list[0].hospitalDescription

            
        }, error => {
        }
      )
    
  }

  back(){
    location.href="#/Sponsered/SpHospital";
  }


  public updatedetails() { 
    this.showPopup=0;
    var entity1 = {
      'ID': this.id,
      'SDate': this.startdate,
      'EDate': this.enddate,
      'Fees': this.fees,
      'HospitalDescription':this.hospitalDescription

    }
    this.CommonService.UpdateSponsoredHospitals(entity1).subscribe(data => {
       this.showPopup=1;
       this.messageID=34;
       this.typeofPopUp=1;
      location.href = "#/Sponsered/SpHospital";
    })
  }




}
