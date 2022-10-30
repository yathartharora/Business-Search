import { Component, OnChanges, OnInit, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnChanges {

  @ViewChild("email") email!: ElementRef
  @ViewChild("date") date!: ElementRef
  @ViewChild("timehour") time_H!: ElementRef
  @ViewChild("timeminutes") time_M!: ElementRef

  @Input() data: any
  @Input() data1: any

  constructor() { }
 
  center!: google.maps.LatLngLiteral;
  marker: any
  reservation:any

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.center = {
      lat: this.data.coordinates.latitude,
      lng: this.data.coordinates.longitude
    }
    this.marker ={
      position: { lat: this.data.coordinates.latitude, lng: this.data.coordinates.longitude },
    }

    console.log(this.data)
  }

  displayCategories(){
    console.log(this.data)
  }

  createRange(number: any){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  reserve(){
    this.reservation = "Clicked"
  }

  makeReservation(){
    console.log(this.email.nativeElement.value)
    console.log(this.date.nativeElement.value)
    console.log(this.time_H.nativeElement.value)
    console.log(this.time_M.nativeElement.value)

    console.log(this.data.name)

    localStorage.setItem("email",this.email.nativeElement.value)
    localStorage.setItem("time",this.time_H.nativeElement.value + ":"+this.time_M.nativeElement.value)
    localStorage.setItem("businessName",this.data.name)
    localStorage.setItem("date",this.date.nativeElement.value)
    alert("Reservation created!")
  }

  close(){
    this.email.nativeElement.value = ""
    this.date.nativeElement.value = ""
    this.time_H.nativeElement.value = ""
    this.time_M.nativeElement.value = ""
  }
  
}
