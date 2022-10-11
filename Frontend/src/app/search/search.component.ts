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
  // constructor(private service: SearchServiceService){}
  constructor(private http: HttpClient){}
  ngOnInit(): any{
  }

  onClick(){
    console.log(this.keyword.nativeElement.value)
    console.log(this.distance.nativeElement.value)
    console.log(this.category.nativeElement.value)
    console.log(this.location.nativeElement.value)
  }

  onClear(){
    this.keyword.nativeElement.value = ""
    this.distance.nativeElement.value = "10"
    this.category.nativeElement.value = "all"
    this.location.nativeElement.value = ""
    this.checker.nativeElement.checked = false
  }

  locationChecker(){
    
  }

  fetchData(){
    this.http.get('http://localhost:3000/search?keyword='+this.keyword.nativeElement.value+'&distance='+this.distance.nativeElement.value+'&category='+this.category.nativeElement.value+'&location='+this.location.nativeElement.value)
    .subscribe((res)=> {
      console.log(res);
    })
  }
}
