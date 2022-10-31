import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor() { }
  reservation: any
  noreservation: any
  data= new Array()
  temp: any
  email: any
  time: any
  businessName: any
  date: any
  ngOnInit() {
    
    // console.log(this.noreservation)
    this.email = JSON.parse(localStorage.getItem("email")!)
    this.time =JSON.parse(localStorage.getItem("time")!)
    this.businessName =JSON.parse(localStorage.getItem("businessName")!)
    this.date = JSON.parse(localStorage.getItem("date")!)    
    if(this.email.length>0){
      this.reservation="yes"
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
    console.log(this.reservation)
    if(this.reservation==undefined){
      this.noreservation="No way"
    }else{
      this.noreservation = undefined
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
    window.location.reload()
  }
  displayedColumns = ["No","Name","Date","Time","Email","Icon"]

}
