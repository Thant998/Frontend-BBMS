import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ModalService } from './modal-style.service';

@Component({
  selector: 'app-modal-style',
  templateUrl: './modal-style.component.html',
  styleUrls: ['./modal-style.component.scss']
})
export class ModalStyleComponent implements OnInit {
  @Input() id: string = "";
  private element: any;


  constructor(private modalService_: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
      if (el.target.className === 'style-modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService_.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService_.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('style-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('style-modal-open');
  }
}
