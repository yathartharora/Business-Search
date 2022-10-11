import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild, ElementRef } from '@angular/core';
@Injectable({
  providedIn: 'root'
})


export class SearchServiceService {
  @ViewChild("keyword") keyword!: ElementRef;
  @ViewChild("distance") distance!: ElementRef;
  @ViewChild("category") category!: ElementRef;
  @ViewChild("location") location!: ElementRef;

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('http://localhost:3000/search?keyword='+this.keyword.nativeElement.value+'&distance='+this.distance.nativeElement.value+'&category='+this.category.nativeElement.value+'&location='+this.location.nativeElement.value)
  }
}
