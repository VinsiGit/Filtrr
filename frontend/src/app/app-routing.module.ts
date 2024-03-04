import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasteinComponent } from './pastein/pastein.component';
import { TextfieldComponent } from './textfield/textfield.component';


const routes: Routes = [
  {
    path: "dashboard",
    component: TextfieldComponent
  },
  {
    path: "pastein",
    component: PasteinComponent
  },
  {
    path: "settings",
    component: TextfieldComponent
  },
  {
    path: "retrain",
    component: TextfieldComponent
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
