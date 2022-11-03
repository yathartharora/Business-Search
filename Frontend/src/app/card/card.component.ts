import { Component, OnChanges, OnInit, SimpleChanges, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

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
  @ViewChild("Close") Close!: ElementRef
  @ViewChild("Form") Form!: ElementRef

  @Input() present: any
  @Input() notpresent: any 

  @Output() goback = new EventEmitter();

  @Input() data: any
  @Input() data1: any
  reserveBusiness: any;
  cardpresent = true

  constructor(private formbuilder: FormBuilder) { }
 
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
  isOpen: any
  isnotOpen: any
  category = ""
  CurrentDate: any
  submitted = false
  okay: any

  

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data)
    this.okay = localStorage.getItem("email")
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

    if(this.data.hours[0].is_open_now){
      this.isOpen = true
      this.isnotOpen = undefined
    } else{
      this.isOpen = undefined
      this.isnotOpen = true
    }

    this.category = ''
    for(let i =0;i<this.data.categories.length-1;i++){
      this.category += this.data.categories[i].title + ' | '
    }
    this.category += this.data.categories[this.data.categories.length-1].title

    this.CurrentDate = new Date().toISOString().slice(0,10);

    this.reserveBusiness = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      date: ['',Validators.required],
      hour: ['',Validators.required],
      minutes: ['',Validators.required]
  });
  }

  // displayCategories(){
  //   console.log(this.data)
  // }

  get f() { return this.reserveBusiness.controls; }

  contactFormModalEmail = new FormControl('', Validators.email);

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
    this.submitted = true;
    if(this.reserveBusiness.invalid){
      return
    }

    this.Bemail = JSON.parse(localStorage.getItem("email")!)
    this.Bbusiness = JSON.parse(localStorage.getItem("businessName")!)
    this.Bdate = JSON.parse(localStorage.getItem("date")!)
    this.Btime = JSON.parse(localStorage.getItem("time")!)

    this.Bemail.push(this.email.nativeElement.value)
    this.Bbusiness.push(this.data.name)
    this.Btime.push(this.time_H.nativeElement.value + ":"+this.time_M.nativeElement.value)
    this.Bdate.push(this.date.nativeElement.value)

    localStorage.setItem("email",JSON.stringify(this.Bemail))
    localStorage.setItem("time",JSON.stringify(this.Btime))
    localStorage.setItem("businessName",JSON.stringify(this.Bbusiness))
    localStorage.setItem("date",JSON.stringify(this.Bdate))
    this.reserved = true
    this.notReserved = false
    alert("Reservation created!")
    // document.forms[0].reset()
    this.Close.nativeElement.click();

  }

  close(){
    this.reserveBusiness.get('email').reset()
    this.reserveBusiness.get('hour').reset()
    this.reserveBusiness.get('minutes').reset()
    this.reserveBusiness.get('date').reset()
  }

  getBack(){

    this.goback.emit()
    this.notpresent = true
    this.cardpresent = false
    // let t = document.getElementById("tableData")
    // t?.scrollIntoView()
  }
  
}
