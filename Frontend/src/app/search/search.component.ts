import { Component, OnInit, VERSION, ViewChild, ElementRef, Injectable, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
import { TablegenerateComponent } from '../tablegenerate/tablegenerate.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class SearchComponent implements OnInit {

  @ViewChild("keyword") keyword!: ElementRef;
  @ViewChild("distance") distance!: ElementRef;
  @ViewChild("category") category!: ElementRef;
  @ViewChild("location") location!: ElementRef;
  @ViewChild("checker") checker!: ElementRef;
  @ViewChild("table") table !: ElementRef;
  @ViewChild(TablegenerateComponent) tabledata!: TablegenerateComponent;
  @ViewChild("tableData") tableData !: ElementRef;

  // constructor(private service: SearchServiceService){}
  constructor(private http: HttpClient,private renderer: Renderer2){}
  ngOnInit(): any{
    this.searchBusiness.valueChanges
    .pipe(
     switchMap(value => this.http.get('http://localhost:3000/autosuggestion?value='+this.keyword.nativeElement.value)
     .pipe(
      
     ))
    )
     .subscribe((data: any) => {
      this.options = []
      // console.log(data["data"]["categories"].length)
      for (let i=0;i<data["data"]["categories"].length;i++){
          this.options.push(data["data"]["categories"][i]["title"])
      }
      for (let i=0;i<data["data"]["terms"].length;i++){
        this.options.push(data["data"]["terms"][i]["text"])
    }
     })
  }
  options: string[] = []
  searchBusiness= new FormControl();
  geolocation: any
  latitude: any
  longitude: any
  business: any


  suggestions() {
    this.http.get('http://localhost:3000/autosuggestion?value='+this.keyword.nativeElement.value)
    .subscribe(res =>{
      // console.log(res)
    })
  }
  onClear(){
    this.keyword.nativeElement.value = ""
    this.distance.nativeElement.value = "10"
    this.category.nativeElement.value = "all"
    this.location.nativeElement.value = ""
    this.checker.nativeElement.checked = false
    this.location.nativeElement.disabled = false
    this.tabledata.clearData()
    // this.tabledata.businessdata = ""
    // console.log(this.tableData.nativeElement.value)
    // this.renderer.setProperty(this.tableData.nativeElement,'innerHTML',"")
    
    // document.getElementById("table-data")!.innerHTML = ""
    // document.getElementById("card-data")!.innerHTML = ""    
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
        this.latitude = this.geolocation["loc"].split(",")[0]
        this.longitude = this.geolocation["loc"].split(",")[1]
        this.http.get('http://localhost:3000/search?keyword='+this.keyword.nativeElement.value+'&distance='+this.distance.nativeElement.value+'&category='+this.category.nativeElement.value+'&latitude='+this.latitude + '&longitude=' + this.longitude)
    .subscribe((res)=> {
      this.business = res
      this.business = this.business["data"]["businesses"]
      //this.table.nativeElement.innerHTML = this.getDetails(this.business)
    })
      })
    }
    else{
      //Need to change this ---> Call the Geolocation API from the backend
      this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.location.nativeElement.value + "&key=AIzaSyDb0g13Gt_bspPjhUGPWg6YrAMeUJ_NcEc")
      .subscribe(res =>{ 
        this.geolocation = res
        this.latitude = this.geolocation["results"][0]["geometry"]["location"]['lat']
        this.longitude = this.geolocation["results"][0]["geometry"]["location"]['lng']
        this.http.get('http://localhost:3000/search?keyword='+this.keyword.nativeElement.value+'&distance='+this.distance.nativeElement.value+'&category='+this.category.nativeElement.value+'&latitude='+this.latitude + '&longitude=' + this.longitude)
      .subscribe((res)=> {
        this.business = res
        this.business = this.business["data"]["businesses"]
        //this.table.nativeElement.innerHTML = this.getDetails(this.business)
      })
      })
    }
     
  }


  getDetails(data: any){
    const res = data["data"]["businesses"]
    var html = ""
    var m
    // console.log(data["data"])
    // console.log(res)
    if(res.length==0){
      html = "No response"
    } else{
      // html = ` \
      // <mat-table [dataSource]=res>\
      //   <ng-container matColumnDef="id">\
      //     <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>\
      //     <mat-cell *matCellDef="let element"> {{element.id}}</mat-cell>\
      //   </ng-container>\
      //   <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>\
      //   <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>\
      // </mat-table>`
      html = `\
      <table class="table table-sm table-striped text-center">\
      <tr">\
      <th class="text-center">#</th>\
      <th class="text-center">Image</th>\
      <th class="text-center"><a>Business Name</a></th>\
      <th class="text-center" ng-click=${console.log("Testing")}><a>Rating</a></th>\
      <th class="text-center" onclick="distanceSort()"><a>Distance(miles)</a></th>\
      </tr>`
      var i=0;
    for(i=0;i<res.length;i++){
        
        var _id = String(res[i]["id"])
        var d = parseInt(res[i]["distance"]) * 0.000621371
        m = d.toFixed(2);
        //console.log(typeof _id)
        // onclick="restaurantDetails(${_id})"
        html += `<tr><td>` + (i+1) + `</td><td (click)="callDetails('${_id}')"><img style="width: 100px; height: 100px" alt="Image not present" src=`+ res[i]["image_url"] + `></img></td><td>` + res[i]["name"]+'<td>'+res[i]["rating"]+'</td><td>'+m+'</td></tr>'
    }

    }
    return html
  }

  nameSort(){
    console.log("Hello World")
  }
  callDetails(data:any){
    console.log("Hello World")
  }
  
}
