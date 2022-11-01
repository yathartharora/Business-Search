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
  notReserved = true
  reserved = false
  time: any
  businessName: any
  Email: any
  Date: any
  Bemail = new Array()
  Bdate = new Array()
  Btime = new Array()
  Bbusiness = new Array()

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data)
    if(localStorage.getItem("businessName")?.includes(this.data.name)){
      this.reserved = true
      this.notReserved = false
    } else{
      this.reserved = false
      this.notReserved= true
    }
    // for(let i=0;i<localStorage.getItem("businessName")!.length;i++)
    this.center = {
      lat: this.data.coordinates.latitude,
      lng: this.data.coordinates.longitude
    }
    this.marker ={
      position: { lat: this.data.coordinates.latitude, lng: this.data.coordinates.longitude },
    }

    console.log(this.data)
  }

  // displayCategories(){
  //   console.log(this.data)
  // }

  createRange(number: any){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }


  cancelReservation(){
    this.Email = JSON.parse(localStorage.getItem("email")!)
    this.businessName = JSON.parse(localStorage.getItem("businessName")!)
    this.Date = JSON.parse(localStorage.getItem("date")!)
    this.time = JSON.parse(localStorage.getItem("time")!)
    let index = this.businessName.indexOf(this.data.name)

    this.Email.splice(index,1)
    this.businessName.splice(index,1)
    this.Date.splice(index,1)
    this.time.splice(index,1)

    this.Email = JSON.stringify(this.Email)
    this.businessName = JSON.stringify(this.businessName)
    this.Date = JSON.stringify(this.Date)
    this.time = JSON.stringify(this.time)

    localStorage.setItem("email",this.Email)
    localStorage.setItem("businessName",this.businessName)
    localStorage.setItem("date",this.Date)
    localStorage.setItem("time",this.time)

    this.reserved = false
    this.notReserved = true
    alert("Reservation cancelled")
  }

  makeReservation(){
    console.log(this.email.nativeElement.value)
    console.log(this.date.nativeElement.value)
    console.log(this.time_H.nativeElement.value)
    console.log(this.time_M.nativeElement.value)

    console.log(this.data.name)
    this.Bemail.push(this.email.nativeElement.value)
    this.Bbusiness.push(this.data.name)
    this.Btime.push(this.time_H.nativeElement.value + ":"+this.time_M.nativeElement.value)
    this.Bdate.push(this.date.nativeElement.value)

    localStorage.setItem("email",JSON.stringify(this.Bemail))
    localStorage.setItem("time",JSON.stringify(this.Btime))
    localStorage.setItem("businessName",JSON.stringify(this.Bbusiness))
    localStorage.setItem("date",JSON.stringify(this.Bdate))
    alert("Reservation created!")
  }

  close(){
    this.email.nativeElement.value = ""
    this.date.nativeElement.value = ""
    this.time_H.nativeElement.value = ""
    this.time_M.nativeElement.value = ""
  }
  
}
