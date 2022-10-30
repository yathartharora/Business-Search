import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { BookingsComponent } from './bookings/bookings.component';


const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo:"/search"},
  {path: "search", component: SearchComponent},
  {path:"bookings", component: BookingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }