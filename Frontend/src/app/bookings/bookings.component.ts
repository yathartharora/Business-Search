import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnChanges {

  @Input() DATA: any

  constructor() { }
  reservation = false
  noreservation = false
  data = new Array()
  temp: any
  email: any| string
  time: any | string
  businessName: any | string
  date: any | string

  ngOnInit(){
    this.email = ""
    this.callTable()
  }

  callTable(){
    this.data = []
    this.email = JSON.parse(localStorage.getItem("email")!)
    this.time =JSON.parse(localStorage.getItem("time")!)
    this.businessName =JSON.parse(localStorage.getItem("businessName")!)
    this.date = JSON.parse(localStorage.getItem("date")!) 
    if(this.email!=undefined){
      if(this.email.length>0){
        this.reservation = true
        this.noreservation = false
        for(let i=0;i<this.email.length;i++){
          this.temp = {
            "Email": this.email[i],
            "Time": this.time[i],
            "Name": this.businessName[i],
            "Date": this.date[i]
          }
          this.data.push(this.temp)
        }
      } else{
        this.noreservation= true
        this.reservation = false
      }
    }else{
      this.noreservation= true
      this.reservation = false
    }
    
    
  }

  ngOnChanges(changes: SimpleChanges): void{
    console.log(this.email.length)
    this.email = JSON.parse(localStorage.getItem("email")!)
    this.time =JSON.parse(localStorage.getItem("time")!)
    this.businessName =JSON.parse(localStorage.getItem("businessName")!)
    this.date = JSON.parse(localStorage.getItem("date")!) 
    
    if(this.email.length>0){
      this.reservation = true
      this.noreservation = false
      console.log("True")
    } else{
      this.noreservation= true
      this.reservation = false
      console.log(this.reservation)
    }
    for(let i=0;i<this.email.length;i++){
      this.temp = {
        "Email": this.email[i],
        "Time": this.time[i],
        "Name": this.businessName[i],
        "Date": this.date[i]
      }
      this.data.push(this.temp)
    }
  }

  onDelete(curData: any){
    this.email = JSON.parse(localStorage.getItem("email")!)
    this.time =JSON.parse(localStorage.getItem("time")!)
    this.businessName =JSON.parse(localStorage.getItem("businessName")!)
    this.date = JSON.parse(localStorage.getItem("date")!) 

    this.email.splice(curData,1)
    this.time.splice(curData,1)
    this.businessName.splice(curData,1)
    this.date.splice(curData,1)
    
    this.email = JSON.stringify(this.email)
    this.time = JSON.stringify(this.time)
    this.businessName = JSON.stringify(this.businessName)
    this.date = JSON.stringify(this.date)

    localStorage.setItem("email",this.email)
    localStorage.setItem("time",this.time)
    localStorage.setItem("businessName",this.businessName)
    localStorage.setItem("date",this.date)
    alert("Reservation cancelled")
    this.email = JSON.parse(localStorage.getItem("email")!)
    if(this.email.length>0){
      this.reservation= true
    }else{
      this.reservation= false
    this.noreservation = true
    }
    this.callTable()
    
    //window.location.reload()
  }
  displayedColumns = ["No","Name","Date","Time","Email","Icon"]
}
