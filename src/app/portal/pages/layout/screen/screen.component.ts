import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  menuActive : boolean = true;
  

  constructor() { }

  ngOnInit(): void {
  }

  showMenu(event : any){
    this.menuActive =  !this.menuActive;
  }

  onActivate(event : any) {
    window.scroll(0,0);
  }

}
