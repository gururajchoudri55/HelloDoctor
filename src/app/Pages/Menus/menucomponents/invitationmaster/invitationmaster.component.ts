import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-invitationmaster',
  templateUrl: './invitationmaster.component.html',
  styleUrls: ['./invitationmaster.component.css']
})
export class InvitationmasterComponent implements OnInit {
  languageid:any;
  invitationsList:any;
  loader:boolean | undefined;
  currentUrl:any;
  p:any;
  search:any;
  count:any;
  labels:any;
  
  constructor(private MenuService:MenuService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getpatientinvitations();
  }


  //Get Patient Invitation
  public getpatientinvitations() {
    this.MenuService.GetPatient_Invites_Master(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.invitationsList = data;
        this.count=this.invitationsList.length;
      },
      error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPatient_Invites_Master",error);
       }
    );
  }
  
    //Pagination
    public pageChanged(even:any) {

      let fgdgfgd = even;
      this.p = even;
    }


}
