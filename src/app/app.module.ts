import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreatesrvComponent } from './createsrv/createsrv.component';
import { SrvComponent } from './srv/srv.component';
import { SivComponent } from './siv/siv.component';
import { CreatesivComponent } from './createsiv/createsiv.component';
import { AllsrvsComponent } from './allsrvs/allsrvs.component';
import { AllsivsComponent } from './allsivs/allsivs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SrvsivformComponent } from './srvsivform/srvsivform.component';
import { ShowdetailsComponent } from './showdetails/showdetails.component';
import { SrvsivDetails } from './srvsivDetails';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreatesrvComponent,
    SrvComponent,
    SivComponent,
    CreatesivComponent,
    AllsrvsComponent,
    AllsivsComponent,
    SrvsivformComponent,
    ShowdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'createsrv', component: CreatesrvComponent},
      { path: 'createsiv', component: CreatesivComponent},
      { path: 'allsrvs', component: AllsrvsComponent},
      { path: 'allsivs', component: AllsivsComponent},
      { path: 'srvsivform', component: SrvsivformComponent},
      { path: 'srvsivdetails', component: ShowdetailsComponent},
      { path: '', component: SrvsivformComponent},
      { path: 'srvsivapi/index', component: SrvsivformComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
