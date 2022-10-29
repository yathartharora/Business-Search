import { Component, OnChanges, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnChanges {

  @Input() data: any
  @Input() data1: any

  constructor() { }
 
  center!: google.maps.LatLngLiteral;
  marker: any

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

    console.log(this.data1)
  }

  displayCategories(){
    console.log(this.data)
  }

  createRange(number: any){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
  
}
