import { Component, OnInit, VERSION, ViewChild, ElementRef, Injectable, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
import { TablegenerateComponent } from '../tablegenerate/tablegenerate.component';
import { CardComponent } from '../card/card.component';


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
  @ViewChild(CardComponent) card!: CardComponent;
  @ViewChild(TablegenerateComponent) tabledata!: TablegenerateComponent;
  search: any;

  // constructor(private service: SearchServiceService){}
  constructor(private http: HttpClient,private formbuilder: FormBuilder){}
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
  submitted = false

  get f() { return this.search.controls; } 
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
    this.tabledata.notpresent = false
    if(this.tabledata.card==undefined){

    }else{
      this.tabledata.card.cardpresent = false
    }
    // this.tabledata.clearData() 
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
    //console.log(this.tabledata.card.cardpresent)
    if(this.tabledata.card == undefined){

    }else{
      this.tabledata.card.cardpresent = false
    }
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
      let t = document.getElementById("tableData")
      t?.scrollIntoView()
    })
      })
    }
    else{
      //Need to change this ---> Call the Geolocation API from the backend
      this.http.get('http://localhost:3000/search?keyword='+this.keyword.nativeElement.value+'&distance='+this.distance.nativeElement.value+'&category='+this.category.nativeElement.value+ '&location='+this.location.nativeElement.value)
      .subscribe((res)=> {
        this.business = res
        this.business = this.business["data"]["businesses"]
        let t = document.getElementById("tableData")
        t?.scrollIntoView()
      })
    }
   
  }
}
