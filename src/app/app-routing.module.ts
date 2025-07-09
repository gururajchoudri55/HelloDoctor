import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './Pages/CommonPages/forgot-password/forgot-password.component';
// import { HeaderComponent } from './Pages/CommonPages/header/header.component';
import { NotFoundComponent } from './Pages/CommonPages/not-found/not-found.component';
import { ToastpopupComponent } from './Pages/CommonPages/Popups/toastpopup/toastpopup.component';
import { LoginComponent } from './Pages/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Doctor', loadChildren: () => import('./Pages/Doctor/doctor/doctor.module').then(m => m.DoctorModule) },
  { path: 'Nurse', loadChildren: () => import('./Pages/Nurse/nurse/nurse.module').then(m => m.NurseModule) },
  { path: 'Pharmacy', loadChildren: () => import('./Pages/Pharmacy/pharmacy/pharmacy.module').then(m => m.PharmacyModule) },
  { path: 'Diagnostic', loadChildren: () => import('./Pages/DiagnosticCenter/diagnostic/diagnostic.module').then(m => m.DiagnosticModule) },
  { path: 'midwife', loadChildren: () => import('./Pages/Midwife/midwife/midwife.module').then(m => m.MidwifeModule) },
  { path: 'Physiotherapist', loadChildren: () => import('./Pages/Physiotherapist/physiotherapist/physiotherapist.module').then(m => m.PhysiotherapistModule) },
  { path: 'HospitalClinic', loadChildren: () => import('./Pages/HospitalClinic/hospital-clinic/hospital-clinic.module').then(m => m.HospitalClinicModule) },
  { path: 'Support', loadChildren: () => import('./Pages/Support/support/support.module').then(m => m.SupportModule) },
  { path: 'Finance', loadChildren: () => import('./Pages/FinanceManager/finance/finance.module').then(m => m.FinanceModule) },
  { path: 'countrymanager', loadChildren: () => import('./Pages/CountryManager/countrymanager/countrymanager.module').then(m => m.CountrymanagerModule) },
  { path: 'VideoCall', loadChildren: () => import('./Pages/VideoCall/video-call/video-call.module').then(m => m.VideoCallModule) },
  { path: 'Toastpopup', component: ToastpopupComponent },
  { path: 'Masters', loadChildren: () => import('./Pages/Masters/masters/masters.module').then(m => m.MastersModule) },
  { path: 'Registerlogins', loadChildren: () => import('./Pages/RegisterLogins/registerlogins/registerlogins.module').then(m => m.RegisterloginsModule) },
  { path: 'reports', loadChildren: () => import('./Pages/Reports/reports/reports.module').then(m => m.ReportsModule) },
  { path: 'menus', loadChildren: () => import('./Pages/Menus/menus/menus.module').then(m => m.MenusModule) },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'Sponsered', loadChildren: () => import('./Pages/sponsered/sponsered.module').then(m => m.SponseredModule) },
  { path: 'Registrations', loadChildren: () => import('./Pages/ExternalRegistrations/registrations/registrations.module').then(m => m.RegistrationsModule) },
  { path: 'Shared', loadChildren: () => import('../app/Pages/SharedModule/shared/shared.module').then(m => m.SharedModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]

})
export class AppRoutingModule { }
