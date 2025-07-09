import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewFilesComponent } from '../../CommonPages/view-files/view-files.component';

const routes: Routes = [
  { path: "view/:fileUrl", component: ViewFilesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
