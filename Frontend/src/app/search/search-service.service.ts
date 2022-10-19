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

}
