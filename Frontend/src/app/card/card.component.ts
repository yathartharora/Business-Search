import { Component, OnChanges, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnChanges {

  @Input() data: any

  constructor() { }
  lat = 0
  lng = 0

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes["data"].currentValue)
    this.lat = this.data.coordinates.latitude
    this.lng = this.data.coordinates.longitude
    console.log(this.lat)
    console.log(this.lng)
  }

  displayCategories(){
    console.log(this.data)
  }

  createRange(number: any){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  
  mapOptions: google.maps.MapOptions = {
    center: {lat: this.lat, lng: this.lng},
    zoom:14
  }

  marker ={
    position: { lat: this.lat, lng: this.lng },
  }
  
}
