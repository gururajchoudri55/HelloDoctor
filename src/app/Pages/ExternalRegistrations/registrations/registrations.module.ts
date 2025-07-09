import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationsRoutingModule } from './registrations-routing.module';
import { RegistrationsComponent } from './registrations.component';
import { SharedModule } from '../../SharedModule/shared/shared.module';
import { LinkForRegComponent } from '../link-for-reg/link-for-reg.component';
import { LinkFordashComponent } from '../link-fordash/link-fordash.component';
import { RegisteredUsersComponent } from '../registered-users/registered-users.component';
import { ApprovedUsersComponent } from '../approved-users/approved-users.component';
import { RejectedUsersComponent } from '../rejected-users/rejected-users.component';
import {  BsDatepickerModule, BsDatepickerConfig,BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';

@NgModule({
  declarations: [
    RegistrationsComponent,
    LinkForRegComponent,
    LinkFordashComponent,
    RegisteredUsersComponent,
    ApprovedUsersComponent,
    RejectedUsersComponent,
  ],
  imports: [
    CommonModule,
    RegistrationsRoutingModule,
    SharedModule,
    BsDatepickerModule.forRoot()
  ]
})
export class RegistrationsModule { }
