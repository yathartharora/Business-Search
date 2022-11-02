import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input, OnChanges, SimpleChanges, ViewChild, Renderer2, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CardComponent } from '../card/card.component';


@Component({
  selector: 'app-tablegenerate',
  templateUrl: './tablegenerate.component.html',
  styleUrls: ['./tablegenerate.component.css'],
})
export class TablegenerateComponent implements OnChanges {

  @Input() data: any
  
  @ViewChild("tableData") tableData!: any
  @ViewChild(CardComponent) card!: CardComponent;
  constructor(private http: HttpClient){}

  businessdata: any
  reviewData: any
  noData: any
  notpresent: any
  present:any
  Nothing: any


  ngOnInit(): void {
    
  }

  clearData(){
    console.log("Hello World",this.tableData.nativeElement)
    console.log(this.tableData.nativeElement.innerHTML)
    console.log(this.tableData)
  }

  ngOnChanges(changes: SimpleChanges): void {
  
    if(this.data==undefined){
      this.Nothing = true
      this.present = undefined
      this.notpresent = undefined
    } else if(this.data.length==0){
      this.present = true
      this.notpresent = undefined
    } 
    else{
      this.notpresent = true
      this.present = undefined
    }
  }

  getId(id: any){
    console.log(this.card)
    if(this.card == undefined){

    } else{
      this.card.cardpresent = true
    }
    this.http.get('http://localhost:3000/findBusiness?id='+id)
    .subscribe(res => {
      this.businessdata =res
      this.businessdata = this.businessdata["data"]
      let t = document.getElementById("CardData")
      t?.scrollIntoView()
    })

    this.http.get('http://localhost:3000/getReview?id='+id)
    .subscribe(res=> {
      this.reviewData = res
      this.reviewData = this.reviewData["data"]
      let t = document.getElementById("CardData")
      console.log(t)
      t?.scrollIntoView()
    })
    
  }

  displayedColumns: string[] = ['No', 'Image','Name','Rating','Distance']

}
