import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-invitation-report',
  templateUrl: './invitation-report.component.html',
  styleUrls: ['./invitation-report.component.css']
})
export class InvitationReportComponent implements OnInit {
  languageid:any;
  currentUrl:any;
  loader:boolean | undefined;
  invitationsList:any;
  count:any;
  search:any;
  p:any;
  labels:any;
  

  constructor(private MenuService:MenuService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getpatientinvitations();
  }

  //Get Patient Invitation
  public getpatientinvitations() {
    this.MenuService.GetPatient_Referal_InvitationsReports(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.invitationsList = data;
        this.count = this.invitationsList.length;
      },
      error => { 
        this.SharedService.insertexceptions(this.currentUrl,"GetPatient_Referal_InvitationsReports",error);
      }
    );
  }

 //Pagination
        public pageChanged(even:any) {

          let fgdgfgd = even;
          this.p = even;
        }


    //export to excel
    fileName = 'Patient Invitation Report.xlsx';
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
