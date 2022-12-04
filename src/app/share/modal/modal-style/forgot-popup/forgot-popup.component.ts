import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/share/shared.service';

@Component({
  selector: 'app-forgot-popup',
  templateUrl: './forgot-popup.component.html',
  styleUrls: ['./forgot-popup.component.scss']
})
export class ForgotPopupComponent implements OnInit {

  constructor(private share_ : SharedService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.share_.closeModal('forgot-popup-modal')  
  }

}
