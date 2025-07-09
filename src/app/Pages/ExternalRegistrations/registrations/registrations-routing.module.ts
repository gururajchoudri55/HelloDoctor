import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ApprovedUsersComponent } from '../approved-users/approved-users.component';
import { LinkForRegComponent } from '../link-for-reg/link-for-reg.component';
import { LinkFordashComponent } from '../link-fordash/link-fordash.component';
import { RegisteredUsersComponent } from '../registered-users/registered-users.component';
import { RejectedUsersComponent } from '../rejected-users/rejected-users.component';


const routes: Routes = [
  { path: 'LinkForReg', component: LinkForRegComponent },
  { path: 'LinkFordash', component: LinkFordashComponent },
  { path: 'RegisteredUsers', component: RegisteredUsersComponent },
  { path: 'ApprovedUsers', component: ApprovedUsersComponent },
  { path: 'RejectedUsers', component: RejectedUsersComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationsRoutingModule { 
  constructor( private bsLocaleService: BsLocaleService){
    if(sessionStorage.getItem('LanguageID')=='1')
    {
  
    }
    else
    {
      this.bsLocaleService.use('fr');//fecha en español, datepicker
    }
  }
}
