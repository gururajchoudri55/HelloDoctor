import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/MenuServices/menu.service';
import { SharedService } from '../../../services/shared.service';
import { CommonService } from '../../../services/common.service';
import Labels from '../../../Lables/Report/reportlabels.json';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vitalpromocode-report',
  templateUrl: './vitalpromocode-report.component.html',
  styleUrls: ['./vitalpromocode-report.component.css']
})
export class VitalpromocodeReportComponent implements OnInit {

  loader: boolean | undefined;
  languageid:any;
  currentUrl:any;
  labels:any;
  todayDate:any;
  p: any;
  count:any;
  search:any;
  dataList:any;
selectCodeName: any;
  filteredData: any;
  dataListCopy: any;
  promoCodeList: any;
  constructor(private MenuService: MenuService, private SharedService: SharedService,private CommonService:CommonService) { }

  ngOnInit(): void {
     this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    var date = new Date();
    const format = 'yyyy-MM-dd';
    const locale = 'en-US'; 
   
    this.GetPromoCodeReport();
  }
  GetPromoCodeReport() {
    ;
    this.MenuService.GetPromoCodeReport().subscribe(data=>{
      this.dataList=data;
      this.dataListCopy=data;
      this.promoCodeList=data;
      this.count=this.dataList.length;
      this.loader=false;
    },err=>{
      this.loader=false;
    })
  }

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //export to excel
  fileName = 'vitalpromocodereport.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName, { password: "S3cret!" });
  }

  selectPromoCode(event: any) {
    ;
    this.filteredData = event.target.value;
    this.dataList = this.dataListCopy.filter((x: { promoCodeText: any; }) => x.promoCodeText == this.filteredData);
}
}
