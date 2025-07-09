import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../../Pages/Lables/Doctors/AllLabels.json';

@Component({
  selector: 'app-faqnew',
  templateUrl: './faqnew.component.html',
  styleUrls: ['./faqnew.component.css']
})
export class FAQnewComponent implements OnInit {
  loader: boolean | undefined;

  constructor(private MenuService: MenuService, private SharedService: SharedService) { }

  languageid: any;
  pharmacyid: any;
  nurseid: any;
  midwifeid: any;
  physioid: any;
  diagnosticid: any;
  doctorid: any;
  hospitalid: any;
  currentUrl: any;
  search: any
  answers: any;
  showimages: any;
  count: any;
  labels:any;
  

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pharmacyid = sessionStorage.getItem('pharmacyid');
    this.nurseid = sessionStorage.getItem('nurseid');
    this.midwifeid = sessionStorage.getItem('midwifeid');
    this.physioid = sessionStorage.getItem('physioid');
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
    this.doctorid = sessionStorage.getItem('userid');
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.GetFrequentlyAskedQuestions();
  }


  dummfaqlist: any;
  faqlist: any;


  public GetFrequentlyAskedQuestions() {
    if (this.doctorid != undefined) {
      this.MenuService.GetFrequentlyAskedQuestions(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.dummfaqlist = data;
          this.faqlist = this.dummfaqlist.filter((x: { typeID: number; }) => x.typeID == 2);
          this.count = this.faqlist.length;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetFrequentlyAskedQuestions", error);
        }
      )

    }
    else if (this.nurseid != undefined || this.midwifeid != undefined || this.physioid != undefined) {
      this.MenuService.GetFrequentlyAskedQuestions(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.dummfaqlist = data;
          this.faqlist = this.dummfaqlist.filter((x: { typeID: number; }) => x.typeID == 3);
          this.count = this.faqlist.length;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetFrequentlyAskedQuestions", error);
        }
      )
    }
    else if (this.hospitalid != undefined) {
      this.MenuService.GetFrequentlyAskedQuestions(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.dummfaqlist = data;
          this.faqlist = this.dummfaqlist.filter((x: { typeID: number; }) => x.typeID == 4);
          this.count = this.faqlist.length;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetFrequentlyAskedQuestions", error);
        }
      )
    }

    else if (this.pharmacyid != undefined) {
      this.MenuService.GetFrequentlyAskedQuestions(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.dummfaqlist = data;
          this.faqlist = this.dummfaqlist.filter((x: { typeID: number; }) => x.typeID == 5);
          this.count = this.faqlist.length;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetFrequentlyAskedQuestions", error);
        }
      )
    }
    else if (this.diagnosticid != undefined) {
      this.MenuService.GetFrequentlyAskedQuestions(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.dummfaqlist = data;
          this.faqlist = this.dummfaqlist.filter((x: { typeID: number; }) => x.typeID == 6);
          this.count = this.faqlist.length;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetFrequentlyAskedQuestions", error);
        }
      )
    }
  }


  GetID(data: any) {
    
    this.answers = data.answers;
  }


  public GetImagesID(id: any) {
    this.MenuService.GetFAQ_Attachments(id).subscribe(
      data => {
        this.showimages = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetFAQ_Attachments", error);
      }
    )
  }


}
