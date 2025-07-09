import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Labels from '../../Lables/sidebar/sidebarlabels.json';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css'],
})
export class ViewFilesComponent implements OnInit {
  constructor(
    private activatedroute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  fileUrl: any;
  languageid: any;

  labels: any;
  ngOnInit(): void {
    debugger;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.activatedroute.params.subscribe((params) => {
      var fileUrl = atob(params['fileUrl']);
      // var fileUrl="C:\Users\Lenovo\Desktop\SrikanthReddy_Resume.doc"
      this.viewfile(fileUrl);
    });
  }

  show: any;

  viewfile(fileUrl: any) {
    debugger;
    if (fileUrl.includes('.pdf')) {
      this.show = 1;
      this.fileUrl = this.bypassAndSanitize(fileUrl);
    } else if (fileUrl.includes('.png')) {
      this.show = 2;
      this.fileUrl = fileUrl;
    } else if (fileUrl.includes('.jpg')) {
      this.show = 2;
      this.fileUrl = fileUrl;
    } else if (fileUrl.includes('.jpeg')) {
      this.show = 2;
      this.fileUrl = fileUrl;
    } else if (fileUrl.includes('.jfif')) {
      this.show = 2;
      this.fileUrl = fileUrl;
    } else if (fileUrl.includes('.ppt')) {
      this.show = 1;
      this.fileUrl = this.bypassAndSanitize(fileUrl);
    } else if (fileUrl.includes('.doc')) {
      this.show = 1;
      this.fileUrl = this.bypassAndSanitize(fileUrl);
    }
  }

  bypassAndSanitize(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  back() {
    history.back();
  }

  // downloadImage() {
  //   let data = document.getElementById('htmlData');
  //   html2canvas(data!).then((canvas) => {
  //     debugger;
  //     const imgWidth = 190;
  //     const pageHeight = 275;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;
  //     let position = 10;
  //     heightLeft -= pageHeight - 20;
  //     const doc = new jspdf('p', 'mm');
  //     doc.addImage(
  //       canvas,
  //       'PNG',
  //       10,
  //       position,
  //       imgWidth,
  //       imgHeight,
  //       '',
  //       'FAST'
  //     );
  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight + 10;
  //       doc.addPage();
  //       doc.addImage(
  //         canvas,
  //         'PNG',
  //         10,
  //         position,
  //         imgWidth,
  //         imgHeight,
  //         '',
  //         'FAST'
  //       );
  //       heightLeft -= pageHeight - 20;
  //     }
  //     doc.save('Reports.pdf');
  //     console.log(doc);
  //   });
  // }
}
