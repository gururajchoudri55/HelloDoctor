import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/Masters/Masterlabels.json';
import { MenuService } from '../../services/MenuServices/menu.service';

@Component({
  selector: 'app-categorydash',
  templateUrl: './categorydash.component.html',
  styleUrls: ['./categorydash.component.css']
})
export class CategorydashComponent implements OnInit {
  p: any;

  constructor(private MenuService: MenuService) { }
  loader: boolean | undefined;
  showbit: any;
  currentUrl: any;
  languageid: any;
  labels: any;
  count: any;
  search: any;
  catgeorylist: any;
  term: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  ngOnInit(): void {
    this.loader = true;
    this.showbit = 0;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.Getcategoryfordashboard();

  }


  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  Getcategoryfordashboard() {
    this.MenuService.Getcategoryfordashboard().subscribe((res) => {
      this.catgeorylist = res;
      this.count = this.catgeorylist.length;
      this.loader=false;
    });
  }



  public DeleteCategory(id: any) {
    this.showPopup = 0
    this.MenuService.DeleteCategory(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 75;
        this.typeofPopUp = 1;
     


      }, error => {
      }
    )
  }


}
