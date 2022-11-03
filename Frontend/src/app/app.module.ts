import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { BookingsComponent } from './bookings/bookings.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatInputModule} from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { BusinesstableComponent } from './businesstable/businesstable.component';
import { TablegenerateComponent } from './tablegenerate/tablegenerate.component';
import { CardComponent } from './card/card.component';
import {MatTabsModule} from '@angular/material/tabs';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReservationComponent } from './reservation/reservation.component';
import {MatIconModule} from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';



@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookingsComponent,
    SearchComponent,
    BusinesstableComponent,
    TablegenerateComponent,
    CardComponent,
    ReservationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule,
    GoogleMapsModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { 
}
