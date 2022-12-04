import { Component, OnInit } from '@angular/core';
import { SharedService } from './share/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'team404';

  constructor(private share_ :SharedService) { }

  ngOnInit(): void {
    // if(localStorage.getItem("login")){
    //   this.share_.router.navigate(['/portal/dashboard'])
    // }else{
    //   this.share_.router.navigate(['/login'])
    // }
  
  }

  onActivate(event : any) {
    window.scroll(0,0);
  }

  
}
