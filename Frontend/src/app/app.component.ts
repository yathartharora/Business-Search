import { Component } from '@angular/core';
declare const myTest: any;
const keyword = document.getElementById('keyword')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

  onClick(){
    console.log(keyword);
  }
}
