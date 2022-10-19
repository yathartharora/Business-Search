import { Component, OnInit, VERSION, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  @ViewChild("keyword") keyword!: ElementRef;
  @ViewChild("distance") distance!: ElementRef;
  @ViewChild("category") category!: ElementRef;
  @ViewChild("location") location!: ElementRef;
  @ViewChild("checker") checker!: ElementRef;
  @ViewChild("table") table !: ElementRef;
  // constructor(private service: SearchServiceService){}
  constructor(private http: HttpClient){}
  ngOnInit(): any{
  }

  geolocation: any
  latitude: any
  longitude: any
  business: any

  onClear(){
    this.keyword.nativeElement.value = ""
    this.distance.nativeElement.value = "10"
    this.category.nativeElement.value = "all"
    this.location.nativeElement.value = ""
    this.checker.nativeElement.checked = false
    this.location.nativeElement.disabled = false
    this.table.nativeElement.innerHTML = ""
  }


  locationChecker(){
    if(this.checker.nativeElement.checked==true){
      this.location.nativeElement.value = ""
      this.location.nativeElement.disabled = true
    }
    if(this.checker.nativeElement.checked==false){
      this.location.nativeElement.value = ""
      this.location.nativeElement.disabled = false
    }
  }

  fetchData(){
    if(this.checker.nativeElement.checked==true){
      this.location.nativeElement.value = ""
      this.location.nativeElement.disabled = true
      this.http.get("https://ipinfo.io/json?token=71de8b356e6cc8").subscribe(res=>{
        this.geolocation = res
        console.log(this.geolocation["loc"],"Hello")
        this.latitude = this.geolocation["loc"].split(",")[0]
        this.longitude = this.geolocation["loc"].split(",")[1]
        this.http.get('http://localhost:3000/search?keyword='+this.keyword.nativeElement.value+'&distance='+this.distance.nativeElement.value+'&category='+this.category.nativeElement.value+'&latitude='+this.latitude + '&longitude=' + this.longitude)
    .subscribe((res)=> {
      this.business = res
      this.table.nativeElement.innerHTML = this.getDetails(this.business)
    })
      })
    }
    else{
      this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.location.nativeElement.value + "&key=AIzaSyDb0g13Gt_bspPjhUGPWg6YrAMeUJ_NcEc")
      .subscribe(res =>{ 
        this.geolocation = res
        this.latitude = this.geolocation["results"][0]["geometry"]["location"]['lat']
        this.longitude = this.geolocation["results"][0]["geometry"]["location"]['lng']
        console.log(this.latitude)
        console.log(this.longitude)
        this.http.get('http://localhost:3000/search?keyword='+this.keyword.nativeElement.value+'&distance='+this.distance.nativeElement.value+'&category='+this.category.nativeElement.value+'&latitude='+this.latitude + '&longitude=' + this.longitude)
      .subscribe((res)=> {
        this.business = res
        this.table.nativeElement.innerHTML = this.getDetails(this.business)
      })
      })
    }
     
  }


  getDetails(data: any){
    const res = data["data"]["businesses"]
    var html = ""
    var m
    console.log(res)
    if(res.length==0){
      html = "No response"
    } else{
      html = '\
      <table class="table table-sm table-striped text-center">\
      <tr">\
      <th class="text-center">#</th>\
      <th class="text-center">Image</th>\
      <th class="text-center" onclick="nameSort()"><a>Business Name</a></th>\
      <th class="text-center" onclick="ratingSort()"><a>Rating</a></th>\
      <th class="text-center" onclick="distanceSort()"><a>Distance(miles)</a></th>\
      </tr>'
      var i=0;
    for(i=0;i<res.length;i++){
        //console.log(business[i])
        var _id = String(res[i]["id"])
        var d = parseInt(res[i]["distance"]) * 0.000621371
        m = d.toFixed(2);
        //console.log(typeof _id)
        // onclick="restaurantDetails(${_id})"
        html += `<tr><td>` + (i+1) + `</td><td (click)="callDetails('${_id}')"><img style="width: 100px; height: 100px" alt="Image not present" src=`+ res[i]["image_url"] + `></img></td><td onclick="javascript:callDetails('${_id}')">` + res[i]["name"]+'<td>'+res[i]["rating"]+'</td><td>'+m+'</td></tr>'
    }

    }

    return html
    
  }
  callDetails(data:any){
    console.log(data)
  } 
}
