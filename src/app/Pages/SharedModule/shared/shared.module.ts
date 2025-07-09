import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { SharedRoutingModule } from './shared-routing.module';
import { LoaderComponent } from '../../../Pages/loaders/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ToastpopupComponent } from '../../../Pages/CommonPages/Popups/toastpopup/toastpopup.component';
import {  BsDatepickerModule, BsDatepickerConfig,BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { SmsComponent } from '../../../Pages/CommonPages/sms/sms.component';
import{NoCommaPipe} from '../../../../no-comma-pipe';
import { ToastrModule } from 'ngx-toastr';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { IntensiveLoaderComponent } from '../../loaders/intensive-loader/intensive-loader.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { RegisterProviderSmSComponent } from '../../RegisterLogins/register-provider-sm-s/register-provider-sm-s.component';
import { ViewFilesComponent } from '../../CommonPages/view-files/view-files.component';
defineLocale('fr', frLocale);
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    LoaderComponent,
    ToastpopupComponent,
    SmsComponent,
    NoCommaPipe,
    IntensiveLoaderComponent,
    RegisterProviderSmSComponent,
    ViewFilesComponent,
 

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    NgxDropzoneModule,
    PdfViewerModule,
    // NoCommaPipe,
    BsDatepickerModule.forRoot(),
    CKEditorModule,
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
  ],
  exports:[
    LoaderComponent,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    NgxDropzoneModule,
    ToastpopupComponent,
    ToastpopupComponent,
    SmsComponent,
    NoCommaPipe,
    IntensiveLoaderComponent,
    CKEditorModule,
    RegisterProviderSmSComponent,
    ViewFilesComponent
  ],
  providers:[DatePipe]
})
export class SharedModule {
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
