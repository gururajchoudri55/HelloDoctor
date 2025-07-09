import { NgModule } from '@angular/core';
import { SharedModule } from './Pages/SharedModule/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Pages/sidebar/sidebar.component';
import { LoginComponent } from './Pages/login/login.component';
import { NotFoundComponent } from './Pages/CommonPages/not-found/not-found.component';
// import { ToastpopupComponent } from './Pages/CommonPages/Popups/toastpopup/toastpopup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './Pages/Interceptors/interceptor.service';
import { HeaderComponent } from './Pages/CommonPages/header/header.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {
  ConnectionServiceModule,
  ConnectionServiceOptions,
  ConnectionServiceOptionsToken,
} from 'ngx-connection-service';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { ForgotPasswordComponent } from './Pages/CommonPages/forgot-password/forgot-password.component';
import { FooterComponent } from './Pages/CommonPages/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
//import { DiagnosticPaymentRecepitComponent } from './Pages/DiagnosticCenter/Diagnostics/diagnostic-payment-recepit/diagnostic-payment-recepit.component';
//import { PharmacyPaymentReceiptComponent } from './Pages/Pharmacy/Pharma/pharmacy-payment-receipt/pharmacy-payment-receipt.component';

// import {NoCommaPipe} from '../no-comma-pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    NotFoundComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    FooterComponent,
    //DiagnosticPaymentRecepitComponent,
    //PharmacyPaymentReceiptComponent,

    // NoCommaPipe
  ],
  imports: [
    NgToastModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    ConnectionServiceModule,
    ToastrModule.forRoot({
      timeOut: 2000, // 15 seconds
      closeButton: true,
      progressBar: true,
      onActivateTick: true,
      easeTime: 100,
      positionClass: 'toast-top-right',
    }),
    // BackButtonDisableModule.forRoot(
    //   {
    //     preserveScrollPosition: true
    //   }
    // )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: ConnectionServiceOptionsToken,
      useValue: <ConnectionServiceOptions>{
        enableHeartbeat: false,
        heartbeatUrl: 'assets/Icons/active.png',
        requestMethod: 'get',
        heartbeatInterval: 1000,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
