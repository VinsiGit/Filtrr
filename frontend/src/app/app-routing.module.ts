import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasteinComponent } from './pastein/pastein.component';


const routes: Routes = [
  {
    path: "pastein",
    component: PasteinComponent
  },
  {
    path: "",
    redirectTo: "pastein",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
