import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/Pages/services/shared.service';


@Component({
  selector: 'app-revenue-daignosticdashboard',
  templateUrl: './revenue-daignosticdashboard.component.html',
  styleUrls: ['./revenue-daignosticdashboard.component.css']
})
export class RevenueDaignosticdashboardComponent implements OnInit {
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  languageid:any;
  search:any;
  hospitalclinicid:any;
  countrymanaerid:any;
  salesrepresntiveid:any;
  meridionalid:any;
  id:any;
  showeditbutton:any;
  showdelete:any;
  showexportbutton:any;
  diagnosticlist:any;
  dummlist:any;
  count:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  p:any ;
  loader:boolean | undefined;
  currentUrl:any;


  constructor(private CommonService:CommonService,private ActivatedRoute:ActivatedRoute,
    private  SharedService:SharedService) { }
   

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    this.salesrepresntiveid = sessionStorage.getItem('salesrepresntativeid');
    this.meridionalid = sessionStorage.getItem('meridionalid');

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
    this.bsRangeValue = [start, end];


    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
    }
    )

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
    if (this.hospitalclinicid != undefined || this.countrymanaerid != undefined) {
      this.showexportbutton = 1;
    }

    if (this.id == undefined) {

      this.getdiagnosticforadmin();
    }
    if (this.hospitalclinicid != undefined) {
      this.CommonService.GetDiagnosticForAdminByLanguageID(this.languageid).subscribe(
        data => {
          this.diagnosticlist = data;
          this.dummlist = this.diagnosticlist
          this.diagnosticlist = this.diagnosticlist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.diagnosticlist.length;
          this.loader=false;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticForAdminByLanguageID",error);
          this.loader=false;
        }
      )
    }
    else if(this.id!=undefined){
      this.CommonService.GetDiagnosticDetailsForWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {
          this.diagnosticlist = data;
          this.dummlist = this.diagnosticlist
          this.count = this.diagnosticlist.length;
          this.loader=false;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticDetailsForWeb",error);
          this.loader=false;
        }
      )
    }
  }



  public getdiagnosticforadmin() {
    this.CommonService.GetDiagnosticForAdminByLanguageID(this.languageid).subscribe(
      data => {
        this.diagnosticlist = data;
        this.dummlist = this.diagnosticlist
        this.count = this.diagnosticlist.length;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticForAdminByLanguageID",error);
        this.loader=false;
      }
    )
  }


    // Pagination

    public pageChanged(even: any) {

      let fgdgfgd = even;
      this.p = even;
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




}
