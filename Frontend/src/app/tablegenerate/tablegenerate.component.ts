import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input, OnChanges, SimpleChanges, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tablegenerate',
  templateUrl: './tablegenerate.component.html',
  styleUrls: ['./tablegenerate.component.css']
})
export class TablegenerateComponent implements OnChanges {

  @Input() data: any

  @ViewChild("tableData") tableData!: any
  constructor(private http: HttpClient,private renderer: Renderer2){}

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
    console.log(id)
    this.http.get('http://localhost:3000/findBusiness?id='+id)
    .subscribe(res => {
      this.businessdata =res
      this.businessdata = this.businessdata["data"]
    })

    this.http.get('http://localhost:3000/getReview?id='+id)
    .subscribe(res=> {
      this.reviewData = res
      this.reviewData = this.reviewData["data"]
    })
  }

  displayedColumns: string[] = ['No', 'Image','Name','Rating','Distance']

}
