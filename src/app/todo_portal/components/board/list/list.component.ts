import {Component, ElementRef, Input, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ListInterface, List} from '../../../model/list/list.model';
import {Card, CardInterface} from '../../../model/card/card.model';
import { MovementIntf , Movement } from 'src/app/todo_portal/model/card/movement';
import { SharedService } from 'src/app/share/shared.service';
import { Cards } from 'src/app/portal/DTO/card.dto';
import Swal from 'sweetalert2';
import { CardService } from 'src/app/portal/services/card.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  @Input() list!: ListInterface;
  @Input() listIndex!: number;
  @Output() moveCardAcrossList: EventEmitter<MovementIntf> = new EventEmitter<MovementIntf>();
  @Output() newCardAdded: EventEmitter<Card> = new EventEmitter<CardInterface>();
  @Output() deleteList: EventEmitter<number> = new EventEmitter<number>();

  cards: Cards[] = []
  boardId !: any
  
  private cardCount = 0;

  constructor(private elementRef: ElementRef ,
    private card_ : CardService,
     @Inject(DOCUMENT) private document: Document,
     private sharedService : SharedService) { }

  ngOnInit() {
    this.boardId = localStorage.getItem('boardId1')

    
    this.sharedService.getCard(1).subscribe(data => {
      this.cards = data;
     });

  }

  addNewCard() {
    const card = new Card(this.cardCount++ + '', ' Task Title' + this.cardCount, 'Description' + this.cardCount, 'sample desc');
    this.list.cards.push(card);
    this.newCardAdded.emit(card);
  }


  allowCardReplacement(dragEvent: DragEvent) {
    dragEvent.dataTransfer!.dropEffect = 'move'
    dragEvent.preventDefault();
  }

  delete(){
    
    let localCard=JSON.parse(localStorage.getItem('board')||'{}').lists
    let cardId = localCard[this.listIndex].id
    this.deleteCard(cardId)
  }

  deleteCard(cardId : any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.card_.deleteCard(cardId).subscribe(data =>
          {
            console.log("delete card" ,data)
            this.deleteList.emit(this.listIndex);
           setTimeout(function(){
            window.location.reload()},0.05)
          }     
        );
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }


  dropCard(dragEvent: DragEvent) {
    const data = JSON.parse(dragEvent.dataTransfer!.getData('text'));
    const elements: any = this.document.elementsFromPoint(dragEvent.x, dragEvent.y);
    const cardElementBeingDroppedOn = elements.find( (x: { tagName: string; }) => x.tagName.toLowerCase() === 'app-card-summary');
    const listElementBeingDroppedOn = elements.find( (x: { tagName: string; }) => x.tagName.toLowerCase() === 'app-list') ;
    const listIndexDroppedOn = parseInt(listElementBeingDroppedOn.getAttribute('listIndex'), 10);
    const cardIndexDroppedOn  = cardElementBeingDroppedOn === undefined ? undefined :
          parseInt(cardElementBeingDroppedOn?.getAttribute('cardIndex'), 10);
    const listIndexDragged = parseInt(data.listIndex, 10);
    const cardIndexDragged = parseInt(data.cardIndex, 10);

    if (listIndexDragged === listIndexDroppedOn) {
        // same list just re-organize the cards
        const cardDragged = this.list.cards.splice(cardIndexDragged,1);
        this.list.cards.splice(cardIndexDroppedOn! , 0 , ...cardDragged);
    } else {
      this.moveCardAcrossList.emit(new Movement(listIndexDragged, listIndexDroppedOn , cardIndexDragged , cardIndexDroppedOn));
    }

  }


  
}
