import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/Pages/services/shared.service';


@Component({
  selector: 'app-revenue-pharmacy-dashboard',
  templateUrl: './revenue-pharmacy-dashboard.component.html',
  styleUrls: ['./revenue-pharmacy-dashboard.component.css']
})
export class RevenuePharmacyDashboardComponent implements OnInit {
 
  hospitalclinicid:any;
  countrymanaerid:any;
  salesrepresntiveid:any;
  meridionalid:any;
  showeditbutton:any;
  showdelete:any;
  startdate:any;
  enddate:any;
  showexportbutton:any;
  id:any;
  languageid:any;
  dummlist:any;
  pharmacylist:any;
  pharmacycount:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  p:any;
  search:any;
  loader:boolean | undefined;
  currentUrl:any;




  constructor(private CommonService: CommonService,private ActivatedRoute:ActivatedRoute,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    this.salesrepresntiveid = sessionStorage.getItem('salesrepresntativeid');
    this.meridionalid = sessionStorage.getItem('meridionalid');

    if (this.salesrepresntiveid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }
    if(this.meridionalid==undefined)
    {
      this.showdelete=0;
    }
    else
    {
      this.showdelete=1;
    }
    this.startdate = sessionStorage.getItem('StartDate');
    this.enddate = sessionStorage.getItem('EndDate');

    if (this.hospitalclinicid != undefined || this.countrymanaerid != undefined) {
      this.showexportbutton = 1;
    }
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id']
    }
    )
    if (this.id == undefined) {
      this.getpharmacyforadmin();
    }
    if (this.hospitalclinicid != undefined) {
      this.CommonService.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
        data => {
          this.dummlist = data;
          this.pharmacylist = this.dummlist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalclinicid)
          this.pharmacycount = this.pharmacylist.length;
          this.loader=false;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetPharmacyForAdminByLanguageID",error);
        }
      )
    }
    else if (this.id != undefined) {
      this.CommonService.GetPhamacyDetailsForWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {
          this.pharmacylist = data;
          this.dummlist = this.pharmacylist
          this.pharmacycount = this.pharmacylist.length;
          this.loader=false;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetPhamacyDetailsForWeb",error);
          this.loader=false;
        }
      )
    }  
  }


  
  public getpharmacyforadmin() {

    this.CommonService.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {
        this.pharmacylist = data;
        this.dummlist = this.pharmacylist
        this.pharmacycount = this.pharmacylist.length;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPharmacyForAdminByLanguageID",error);
        this.loader=false;
      }
    )
  }


  public deletediagnosticcenter(id: any) {
    
    Swal.fire({
      title:'',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '',
      cancelButtonText: ''
    }).then((result) => {
      if (result.isConfirmed) {
        this.CommonService.DeleteDiagnosticCenter(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
        this.showPopup = 1;
        this.messageID = 75,
        this.typeofPopUp = 1;

      }
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"DeleteDiagnosticCenter",error);
    })
  }


  
  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }



}
