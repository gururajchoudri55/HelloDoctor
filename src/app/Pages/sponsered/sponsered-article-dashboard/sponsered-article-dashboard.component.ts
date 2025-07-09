import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { SharedService } from '../../services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../Lables/sponsred/sponsered.json';



@Component({
  selector: 'app-sponsered-article-dashboard',
  templateUrl: './sponsered-article-dashboard.component.html',
  styleUrls: ['./sponsered-article-dashboard.component.css']
})
export class SponseredArticleDashboardComponent implements OnInit {
  languageid:any;
  articlelist:any;
  labels1:any;
  currenturl:any;
  labels:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  photourl:any;
  phototypeid:any;
  term:string="";


  constructor(private CommonService:CommonService,private SharedService:SharedService) { }

  ngOnInit(): void {
    
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetArticles()
  }


    
  public GetArticles() {
    this.CommonService.GetArticleForAdminForWeb().subscribe(
      data => {

        this.articlelist = data;
      },
      error => { 
        this.SharedService.insertexceptions(this.currenturl,'GetArticleForAdminForWeb',error);
      }
    );
   
  }

  edit(id:any){
   location.href="#/Sponsered/SponseredArticleRegistration/" + btoa(id);
  }

  //DisableHospital
  public GetDisableArticle(id:any) {
    this.showPopup=0;
    this.CommonService.GetDisableArticle(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.GetArticles();
      }, error => {
        // this.loader=false;
        // this.SharedService.insertexceptions(this.currentUrl,"DisableHospital_ClinicLogin",error);
      }
    )
  }

  //Enable
  public GetEnableArticle(hosid:any) {
    this.showPopup=0;
    this.CommonService.GetEnableArticle(hosid).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.GetArticles();

      }, error => {
        // this.loader=false;
        // this.SharedService.insertexceptions(this.currentUrl,"EnableHospital_ClinicLogin",error);
      }
    )
  }
  




  public GetPhotoUrl(url:any, typeID:any) {
    this.photourl = url;
    this.phototypeid = typeID;
  }

  public opentab()
  {
    window.open(this.photourl, '_blank');
  }
  




  public DeleteArticles(id: any) {
    this.showPopup=0;
    
    Swal.fire({
      title:this.labels.title,
      text:this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText:this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.CommonService.DeleteArticle(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
         this.showPopup=1;
         this.messageID=75;
         this.typeofPopUp=1;
      }
    })
  }

}
