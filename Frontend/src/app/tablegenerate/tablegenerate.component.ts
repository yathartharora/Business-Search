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
  ngOnInit(): void {
    // console.log(this.data)
  }

  public clearData(){
    console.log("Hello World",this.tableData.nativeElement)
    // this.tableData.nativeElement.empty()
    // this.renderer.setProperty(this.tableData.nativeElement,'innerHTML',"")
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['data'].currentValue)
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

  displayedColumns: string[] = ['No', 'Image','Name','Distance','Rating']

}
