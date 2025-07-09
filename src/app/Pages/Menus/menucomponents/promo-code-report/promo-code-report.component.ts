import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/Report/reportlabels.json';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
@Component({
  selector: 'app-promo-code-report',
  templateUrl: './promo-code-report.component.html',
  styleUrls: ['./promo-code-report.component.css']
})
export class PromoCodeReportComponent implements OnInit {
  languageid: any;
  loader: boolean | undefined;
  labels: any;
  p: any;
  search: string = "";
  promoCodeReport: any = [];
  promoCodeList: any = [];
  promoCodeReport1: any;

  constructor(private MenuService: MenuService) { }
  ngOnInit(): void {
    this.loader = false;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetSalesPromoRegReport();
    this.GetSalesPromoCodeRegistration()
  }


  public GetSalesPromoCodeRegistration() {
    this.MenuService.GetSalesPromoCodeRegistration().subscribe(
      data => {
        this.loader = false;
        console.log("Promo" + data)
        const promo = data;


        this.promoCodeList = promo.reduce((finalArray, obj) => {
          
          let val = finalArray.find(((x: { companyName: any; }) => x.companyName == obj.companyName))
          
          if (val == -1||val==undefined) {
            return finalArray.concat([obj])
          }
          else {
            return finalArray
          }

        }, [])


      }, error => {
        this.loader = false;

      }
    )
  }

  public GetSalesPromoRegReport() {
    this.MenuService.GetSalesPromoRegReport().subscribe(
      data => {
        this.loader = false;
        this.promoCodeReport = data;
        this.promoCodeReport1 = data;

      }, error => {
        this.loader = false;

      }
    )
  }




  fileName = 'Promo Code Report.xlsx';
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
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  getPromoCode(even: any) {
    if (even.target.value != 0) {
      this.promoCodeReport = this.promoCodeReport1.filter((x: { name: any; }) => x.name == even.target.value)
    }
    else {
      this.GetSalesPromoRegReport();
    }
  }

  getCompany(even: any) {
    
    if (even.target.value != 0) {
      this.promoCodeReport = this.promoCodeReport1.filter((x: { companyName: any; }) => x.companyName == even.target.value)
    }
    else {
      this.GetSalesPromoRegReport();
    }
  }


  getProgram(even: any) {
    if (even.target.value != 0) {
      this.promoCodeReport = this.promoCodeReport1.filter((x: { programName: any; }) => x.programName == even.target.value)
    }
    else {
      this.GetSalesPromoRegReport();
    }
  }

}
