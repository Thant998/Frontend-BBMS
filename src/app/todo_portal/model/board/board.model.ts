import {Card, CardInterface} from '../card/card.model';
import {ListInterface} from '../list/list.model';

export interface BoardInterface {
  id: string;
  name: string;
  type : string;
  lists: ListInterface[];
  
}


export class BoardModel implements BoardInterface {

  id!: string;
  name!: string;
  type!:string;
  lists!: ListInterface[];


  constructor() {
  }



  // addCard(card: CardInterface) {
  //   if (this.isCardEmpty()) {
  //     this.cards = [];
  //   }
  //   this.cards.push(card);
  // }
  //
  // removeCard(id: string): CardInterface {
  //   if (this.isCardEmpty()) {
  //     return null;
  //   }
  //   const cardIndex = this.cards.findIndex(x => x.id === id);
  //   if ( cardIndex > -1 ) {
  //     const cardInterfaces = this.cards.splice(cardIndex, 1);
  //     return cardInterfaces[0];
  //   }
  //
  //   return null;
  //
  // }
  //
  // private isCardEmpty() {
  //   return this.cards === undefined || this.cards === null;
  // }


}
