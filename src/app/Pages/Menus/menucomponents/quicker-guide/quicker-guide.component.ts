import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-quicker-guide',
  templateUrl: './quicker-guide.component.html',
  styleUrls: ['./quicker-guide.component.css']
})
export class QuickerGuideComponent implements OnInit {

  languageid: any;
  currentUrl: any;
  quickList: any;
  count: any;
  loader: boolean | undefined;
  p: any;
  search: any;
  data: any;
  labels:any;
  typeid: any;
  filter: any;
  
  constructor(private MenuService: MenuService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.MenuService.GetQuickGuide(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.quickList = data;
        this.filter=this.quickList;
        this.count = this.quickList.length;

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetQuickGuide", error);
      }
    )
  }

  //Pagination
  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  public DeleteQuickGuide(id: any) {
    
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
        this.MenuService.DeleteQuickGuide(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
         
      }
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"DeleteQuickGuide",error);
    })
  }

  edit(id: any) {
    location.href = "#/menus/QuickerguideDetails/" + btoa(id);
  }

  video: any;

  Getvideo(videoUrl: any) {
    
    this.video = videoUrl

  }
//Get Type
public GetType(even:any) {
  this.typeid = even.target.value;
  if (even.target.value != 0) {
    this.quickList = this.filter.filter((x: { typeID: any; }) => x.typeID == this.typeid)
    this.count = this.quickList.length;
  }
  else {

  }
}



}
