import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/Report/reportlabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';


@Component({
  selector: 'app-total-prescription-reports',
  templateUrl: './total-prescription-reports.component.html',
  styleUrls: ['./total-prescription-reports.component.css']
})
export class TotalPrescriptionReportsComponent implements OnInit {
  pharmacyid:any;
  reportlist:any;
  dummlist:any;
  count:any;
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  languageid:any;
  id:any;
  totalamount:any;
  p:any;
  showdrop:any;
  search:any;
  patientname: any;
  mobilernumber: any;
  address: any;
  doctorname: any;
  docmobile: any;
  email: any;
  docsignatureurl: any;
  hospitalname: any;
  hospitalid: any;
  docaddress: any;
  registrationno: any;
  prescriptiondate: any;
  dateofbirth: any;
  orderlist: any;
  noteetopharmasict: any;
  referencenumber: any;
  showedit: any;
  orderedmedicinelist: any;
  listid:any;
  list:any;
  myarray:any;
  pharmacylist:any;
  roleid:any;
  diffid:any;
  labels:any;
  loader:boolean | undefined;
  currentUrl:any;


  constructor(private CommonService:CommonService,private ActivatedRoute:ActivatedRoute,private SharedService:SharedService) { }

  ngOnInit(): void {
    // this.loader=true;
    this.currentUrl=window.location.href;
    this.id = sessionStorage.getItem('pharmacyid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.roleid = sessionStorage.getItem('roleid');
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


    this.ActivatedRoute.params.subscribe(params => {

      this.diffid = params['id']
      if (this.diffid == undefined) {
        this.showdrop = 0;
      }
      else {
        this.showdrop = 1;
      }
    }
    )
    if (this.diffid == undefined) {
      this.GetReports()
    }
    else {
      this.CommonService.GetPatient_TextMedicineDetailsForWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {
          this.reportlist = data;
          this.dummlist = this.reportlist;
          this.count = this.reportlist.length
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"GetPatient_TextMedicineDetailsForWeb",error);
        }
      )
    }
  }

  public GetPharmacyID(even:any) {
    if (even.target.value != 0) {
      this.pharmacyid = even.target.value;
      this.reportlist = this.dummlist.filter((x: { pharmacyID: any; }) => x.pharmacyID == this.pharmacyid)
      this.count = this.reportlist.length
    }
    else {
      this.CommonService.GetPatient_TextMedicineDetailsForWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {

          this.reportlist = data;
          this.dummlist = this.reportlist;
          this.count = this.reportlist.length
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetPatient_TextMedicineDetailsForWeb",error);
          this.loader=false;
        }
      )
    }

  }

  public getpharmacyforadmin() {

    this.CommonService.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.pharmacylist = data;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPharmacyForAdminByLanguageID",error);
        this.loader=false;
      }
    )
  }


  public GetReports() {

    this.CommonService.GetPatient_TextMedicineDetails(this.id, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.reportlist = data;
        this.totalamount = this.reportlist.map((a: { amountToPay: any; }) => a.amountToPay).reduce(function (a: any, b: any) {
          return a + b;
        });
        this.dummlist = this.reportlist;
        this.count = this.reportlist.length;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPatient_TextMedicineDetails",error);
      }
    )
  }

  selectDate(data: any) {
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
  }




  
  public getget(even:any) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;

    if (even.target.value == 2) {

      let dfsfd = this.dummlist.filter((x: { delivered: number; }) => x.delivered == 1);

      this.reportlist = dfsfd;
      this.count = this.reportlist.length

    }
    if (even.target.value == 3) {

      let dfsfd = this.dummlist.filter((x: { rejected: number; }) => x.rejected == 1);

      this.reportlist = dfsfd;
      this.count = this.reportlist.length
    }
    if (even.target.value == 1) {
      this.GetReports();
      this.CommonService.GetPatient_TextMedicineDetailsForWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {

          this.reportlist = data;
          this.dummlist = this.reportlist;
          this.count = this.reportlist.length;
          this.loader=false;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetPatient_TextMedicineDetailsForWeb",error);
          this.loader=false;
        }
      )

    }
  }

   // Pagination

   public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  public GetMedicines(id:any) {
    this.myarray.length = 0;
    
    this.listid = id;
    this.list = this.reportlist.filter((x: { id: any; }) => x.id == this.listid)

    this.patientname = this.list[0].relationpatentname,
      this.mobilernumber = this.list[0].relationmobileno
    this.address = this.list[0].relatinpaaddess
    this.doctorname = this.list[0].doctorName,
      this.docmobile = this.list[0].docmobile,
      this.email = this.list[0].emailID,
      this.docsignatureurl = this.list[0].siganatureurl,
      this.hospitalname = this.list[0].hospital_ClinicName,
      this.hospitalid = this.list[0].hospitalClinicID,
      this.docaddress = this.list[0].docaddress,
      this.registrationno = this.list[0].registrationNo,
      this.prescriptiondate = this.list[0].prescriptionAddedDate,
      this.dateofbirth = this.list[0].dateofbirth,
      this.noteetopharmasict = this.list[0].notetoopharmacistt,
      this.referencenumber = this.list[0].referenceNumber,
      this.showedit = this.list[0].showUpdate,
      this.CommonService.GetPatientOrderedMedicines(this.listid, this.languageid).subscribe(
        data => {
          this.orderedmedicinelist = data;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetPatientOrderedMedicines",error);
          this.loader=false;
        }
      )
  }

 
  fileName = 'Prescription List.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }


}
