import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Labels from '../../../Lables/Report/reportlabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-doctor-report',
  templateUrl: './doctor-report.component.html',
  styleUrls: ['./doctor-report.component.css']
})
export class DoctorReportComponent implements OnInit {
  loader:boolean | undefined;
  languageid:any;
  doctorlist:any;
  search:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  p:any;
  email:any;
  pdfprslist:any;
  data:any;
  sendattchmenturl = [];
  emailurl: any;
  SendMailReport:any;
  labels:any;
  count:any;
  currentUrl:any;


  constructor(private CommonService:CommonService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getdoctorforadmin();
  }

  public getdoctorforadmin() {
    this.CommonService.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.doctorlist = data;
        this.count=this.doctorlist.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDoctorForAdminByLanguageID",error);

      }
    )
  }

 

  public GetAllPrescription(patientid:any, email:any) {   
    this.email = email;
    this.CommonService.GetBookAppointmentByDOctorss(this.languageid, patientid, 1).subscribe(data => {    
      this.pdfprslist = data;    
    })
  }

    //To Disable Doctor
    public disabledoctor(docid: any) {
      this.showPopup = 0;
      this.CommonService.DisableDoctorLogin(docid).subscribe(
        data => {
          this.showPopup = 1;
          this.messageID = 24;
          this.typeofPopUp = 1;
          this.getdoctorforadmin()
        }, error => {
           this.SharedService.insertexceptions(this.currentUrl,"DisableDoctorLogin",error);
        }
      )
    }
  
  //TO Enable Doctor
  
    public enabledoctor(id: any) {
      this.showPopup = 0;
      this.CommonService.EnableDoctorLogin(id).subscribe(
        data => {
          this.showPopup = 1;
          this.messageID = 23;
          this.typeofPopUp = 1;
          this.getdoctorforadmin()
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"EnableDoctorLogin",error);
         
        }
      )
    }

    //Paginantion
  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }


  // public SavePdf() {
  //   var data = document.getElementById('Prescriptions');
  //   html2canvas(data).then(canvas => {
  //     var imgWidth = 208;
  //     var pageHeight = 295;
  //     var imgHeight = canvas.height * imgWidth / canvas.width;
  //     var doc = new jsPDF("p", "mm", "a4");
  //     var width = doc.internal.pageSize.getWidth();
  //     var height = doc.internal.pageSize.getHeight();
  //     var heightLeft = imgHeight;
  //     var doc = new jsPDF('p', 'mm');
  //     var position = 0;
  //     while (heightLeft >= 0) {
  //       const contentDataURL = canvas.toDataURL('image/png')
  //       position = heightLeft - imgHeight;
  //       doc.addPage();
  //       doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }
  //     doc.deletePage(1)
  //     var pdf = doc.output('blob');
  //     var file = new File([pdf], "Report" + ".pdf");
  //     let body = new FormData();
  //     body.append('Dan', file);
      
  //     this.CommonService.DoctorPdfreports(file).subscribe(res => {
  //       ;     
  //       this.sendattchmenturl.push(res);
  //       let a = this.sendattchmenturl[0].slice(2);

  //       let b = 'https://maroc.voiladoc.org' + a;
  //       this.emailurl = b;

  //       this.SendMailReport()
  //     });
  //     doc.save('Prescriptions.pdf');
  //   });
  // }
  

}
