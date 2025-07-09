import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-role-menumapping-details',
  templateUrl: './role-menumapping-details.component.html',
  styleUrls: ['./role-menumapping-details.component.css']
})
export class RoleMenumappingDetailsComponent implements OnInit {

 
  currentUrl: any;
  languageid: any;
  labels: any;
  search: any;
  RoleMappinglist: any;
  id: any;
  showbutton: any;
  constructor(private MenuService: MenuService, private activatedroute: ActivatedRoute,private SharedService:SharedService) { }
  loader: any;
  showdelete: any
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetRoleMappinglist();
    this.activatedroute.params.subscribe((params) => {
      this.id = atob(params['id']);
      if (this.id == undefined) {
        this.showbutton = 0
      }
      else if (this.id != undefined) {
        this.showbutton = 1
      }

    });
  }
  public GetRoleMappinglist() {
    this.MenuService.GetMenuRoleMappingTable(this.languageid).subscribe(
      data => {
        this.RoleMappinglist = data;
      }, error => {
      }
    )
  }

  //Delete RoleMapping
  public DeleteRoleMapping(id: any) {
    
    Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText: this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.MenuService.DeleteMenuRoleMappingTableRow(id).subscribe(res => {
          let test = res;
          this.ngOnInit();
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "DeleteHospital_Clinic", error);
        })

      }
    })
  }
  edit(id: any) {
    
    location.href = "#/menus/RoleMenumapping/" + btoa(id);
  }


}
