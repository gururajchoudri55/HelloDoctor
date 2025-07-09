import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json'

@Component({
  selector: 'app-deliverydash',
  templateUrl: './deliverydash.component.html',
  styleUrls: ['./deliverydash.component.css']
})
export class DeliverydashComponent implements OnInit {

  constructor(private CommonService:CommonService,private SharedService:SharedService) { }

  loader:any;
  currentUrl:any;
  languageid:any;
  meridionalid:any;
  deliverycompanyList:any;
  dummlist:any;
  p:any;
  dummlist1:any;
  hospitalClinicList:any;
  count:any;
  search:any;
  labels:any;
  
  showdelete:any;



  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.meridionalid = sessionStorage.getItem('meridionalid');
    if (this.meridionalid == undefined) {
      this.showdelete = 0;
    }
    else {
      this.showdelete = 1;
    }
    this.gethosptilclinicforadmin();
    this.getdeliverylist();
  }


  public getdeliverylist() {
    this.CommonService.GetDeliveryCompanyAdminByLanguageID(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.deliverycompanyList = data;
        this.dummlist = this.deliverycompanyList
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDeliveryCompanyAdminByLanguageID",error);
      }
    )
  }


    // Pagination

    public pageChanged(even: any) {

      let fgdgfgd = even;
      this.p = even;
    }



    //export to excel
    fileName = 'doctorlist.xlsx';
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


      //Get HospitalList

    public gethosptilclinicforadmin() {
    this.CommonService.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.dummlist1 = data.filter(x => x.hospital_ClinicID == 2)
        this.hospitalClinicList = this.dummlist1.filter((x: { id: number; }) => x.id != 590 && x.id != 614 && x.id != 613 && x.id != 612)
        this.count = this.hospitalClinicList.length;

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetHospital_ClinicForAdminByAdmin",error);
      }
    )
  }



    //Delete Delivery Company 

    public deletedeliverycopmany(id: any) {
      
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.CommonService.DeleteDeliveryCompany(id).subscribe(res => {
            let test = res;
            this.ngOnInit();
          })
          Swal.fire(
            'Deleted!',
            'Doctor has been deleted.',
            'success'
          )
        }
      },error=>{
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"DeleteDeliveryCompany",error);
      })
  
  
    }


    edit(id:any){
      location.href="#/countrymanager/DeliveryCompanyRegistration/" + btoa(id);
    }

}
