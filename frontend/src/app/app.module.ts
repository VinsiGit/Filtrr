import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasteinComponent } from './pastein/pastein.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { RetrainComponent } from './retrain/retrain.component';
import { ThemeswitchComponent } from './themeswitch/themeswitch.component';
import { MailamountgraphComponent } from './mailamountgraph/mailamountgraph.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    PasteinComponent,
    NavbarComponent,
    DashboardComponent,
    SettingsComponent,
    RetrainComponent,
    ThemeswitchComponent,
    MailamountgraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
