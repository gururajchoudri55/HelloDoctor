import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCallRoutingModule } from './video-call-routing.module';
import { VideoCallComponent } from './video-call.component';
import { SubscriberComponent } from '../../../Pages/VideoCall/subscriber/subscriber.component';
import { PublisherComponent } from '../../../Pages/VideoCall/publisher/publisher.component';
import { DoctorActionModule } from '../../SharedModule/doctor-action/doctor-action.module';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../../SharedModule/shared/shared.module';

defineLocale('fr', frLocale);
@NgModule({
  declarations: [
    VideoCallComponent,
    SubscriberComponent,
    PublisherComponent,
 
  
  ],
  imports: [
    CommonModule,
    VideoCallRoutingModule,
    DoctorActionModule,
    SharedModule,
    BsDatepickerModule.forRoot()
  ]
})
export class VideoCallModule {
  constructor(private bsLocaleService: BsLocaleService){
    if(sessionStorage.getItem('LanguageID')=='1')
    {
    }
    else
    {
      this.bsLocaleService.use('fr');//fecha en español, datepicker
    }
 }
 }
