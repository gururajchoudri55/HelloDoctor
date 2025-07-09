import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {
  typeid:any;
  faq:any;
  dummfaq:any;
  count:any;
  languageid:any;
  currentUrl:any;
  search:any;
  p:any;
  loader:boolean | undefined;
  showimages:any;
  labels:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;


  constructor(private MenuService:MenuService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getfaq();
  }

//Get Type
  public GetType(even:any) {
    this.typeid = even.target.value;
    if (even.target.value != 0) {
      this.faq = this.dummfaq.filter((x: { typeID: any; }) => x.typeID == this.typeid)
      this.count = this.faq.length;
    }
    else {
      this.getfaq();
    }
  }

  //Get FAQ
  public getfaq() {
    this.MenuService.GetFrequentlyAskedQuestions(this.languageid).subscribe(
      data => {  
        this.loader=false;
        this.faq = data;
        this.dummfaq = data;
        this.count = this.faq.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetFrequentlyAskedQuestions",error);
      }
    )
  }

  //Pagination
  public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }

 //Delete FAQ
  public DeleteFrequentlyAskedQuestions(id:any) {
    this.showPopup=0;
    
    Swal.fire({
      title:this.labels.title,
      text:this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:this.labels.confirmButtonText,
      cancelButtonText:this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.MenuService.DeleteFrequentlyAskedQuestions(id).subscribe(res => {
          let test = res;
          this.ngOnInit();
        })
         this.showPopup=1;
         this.messageID=75;
         this.typeofPopUp=1;
      }
    })
  }



      //GET ATTACHMENTS
    
      public GetImagesID(id:any) {
        this.MenuService.GetFAQ_Attachments(id).subscribe(
          data => {
            this.showimages = data;
          }, error => {
            this.SharedService.insertexceptions(this.currentUrl,"GetFAQ_Attachments",error);
          }
        )
      }


      edit(id:any){
        location.href="#/menus/FAQDetails/" +btoa(id);

      }







}
