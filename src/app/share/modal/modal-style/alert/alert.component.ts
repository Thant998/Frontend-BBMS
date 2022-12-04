
import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

import { Location } from '@angular/common';
import { SharedService } from 'src/app/share/shared.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})


@Injectable({
  providedIn: 'root'
})


export class AlertComponent implements OnInit {

   message : string = ''
   routeLink : string = "";

  constructor(private share_ : SharedService, private location : Location) { }

  ngOnInit(): void {

  }


  ngAfterContentChecked() {
    this.routeLink = this.location.path();
  }

  returnMessage(message : string){
    var message_ui = document.getElementById('message') as InnerHTML
    message_ui.innerHTML = message
  }

  closeModal(){
    this.share_.closeModal('alert-modal')
    let  postTitle = document.getElementById('postTitle');
    if(postTitle){
    postTitle?.focus()
    }
   if(this.routeLink.includes('/admin/post')){
        this.share_.router.navigate(['admin/posted-properties'] , {queryParams : {status  : ''}})
   }
  
  }

}
