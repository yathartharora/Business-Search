import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor() { }

  getData(){
    localStorage.setItem("Name","Sushi")
    return localStorage
  }
  ngOnInit() {
  }
  

}
