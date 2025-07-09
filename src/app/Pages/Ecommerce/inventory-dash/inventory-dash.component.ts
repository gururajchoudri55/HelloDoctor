import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/Masters/Masterlabels.json';
import { MenuService } from '../../services/MenuServices/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-dash',
  templateUrl: './inventory-dash.component.html',
  styleUrls: ['./inventory-dash.component.css']
})
export class InventoryDashComponent implements OnInit {
  p: any;
  constructor(private MenuService: MenuService) { }
  loader: boolean | undefined;
  showbit: any;
  currentUrl: any;
  languageid: any;
  labels: any;
  term: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  count: any;
  ngOnInit(): void {
    this.loader = true;
    this.showbit = 0;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetInventory();
  }




  SubcategoryLists: any;
  InventoryList: any;;
  FilteredInventoryList: any;;
  public GetInventory() {
    this.MenuService.GetInventory().subscribe(
      data => {
        this.loader = false;
        this.InventoryList = data;
        this.FilteredInventoryList = this.InventoryList;
        this.count = this.InventoryList.length
      }, error => {
      }
    )
  }


  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  public DeleteInventory(id:any)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to This Inventory!",
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.MenuService.DeleteInventory(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
        Swal.fire(
          'Deleted!',
          'Inventory has been deleted.',
          'success'
        )
      }
      else {
        this.ngOnInit()
      }
    })

  }
}
