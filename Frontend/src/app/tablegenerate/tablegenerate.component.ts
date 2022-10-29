import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tablegenerate',
  templateUrl: './tablegenerate.component.html',
  styleUrls: ['./tablegenerate.component.css']
})
export class TablegenerateComponent implements OnChanges {

  @Input() data: any

  constructor(private http: HttpClient){}

  businessdata: any
  ngOnInit(): void {
    // console.log(this.data)
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
  }

  displayedColumns: string[] = ['No', 'Image','Name','Distance','Rating']

}
