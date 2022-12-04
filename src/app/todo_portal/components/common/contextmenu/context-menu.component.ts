import {Component, OnInit, Output, EventEmitter, HostListener, ElementRef} from '@angular/core';
import { CardService } from 'src/app/portal/services/card.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  show = false;
 @Output() contextAction:  EventEmitter<string> = new EventEmitter<string>();

  constructor(private elementRef: ElementRef , private card_ : CardService) { }

  ngOnInit() {
  }

  emitCloseEvent() {
     this.contextAction.emit('DELETE');
     this.show = false;
  }

 

  @HostListener('document:click' , [ '$event' ])
  closeOutClickOutside(event : any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }


}
