import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/Masters/Masterlabels.json';
import { MenuService } from '../../services/MenuServices/menu.service';
@Component({
  selector: 'app-productsdash',
  templateUrl: './productsdash.component.html',
  styleUrls: ['./productsdash.component.css']
})
export class ProductsdashComponent implements OnInit {
  p: any;
  constructor(private MenuService: MenuService) { }
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  term: any;

  loader: boolean | undefined;
  showbit: any;
  currentUrl: any;
  languageid: any;
  labels: any;
  CategoryList: any;
  count: any;
  ngOnInit(): void {
    this.loader = true;
    this.showbit = 0;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getitem()
  }



  getItemcategory() {
    this.MenuService.GetItemCategory().subscribe(
      data => {

        let temp: any = data;
        this.CategoryList = temp;
      }, error => {
      }
    )
  }


  itemlist: any;
  Filtereditemlist: any;
  getitem() {
    this.MenuService.GetItems().subscribe(data => {

      let temp: any = data;
      this.itemlist = temp;
      this.Filtereditemlist = this.itemlist;
      this.count = this.itemlist.length;

      this.loader = false;
    })
  }


  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }



  Deleteitem(id: any) {

    this.showPopup = 0;
    this.MenuService.deleteItems(id).subscribe(data => {

      if (data >= 0) {

        this.messageID = 75;
        this.showPopup = 1;
        this.typeofPopUp = 1


      }
      else {
        alert("something went wrong");
        this.getitem();
      }
    })
  }



  
  AppointmentID:any;
  showimages:any;
  public nophoto: any;
  public GetIllnessPhotos(even:any) {
    this.AppointmentID = even;

    this.MenuService.GetProductsImagesByID(this.AppointmentID).subscribe(
      data => {

        this.showimages = data;
        if (this.showimages.length == 0) {
          this.nophoto = 1
        }
        else if (this.showimages.length != 0) {
          this.nophoto = 0
        }

      }, error => {
      }
    )

  }

}
