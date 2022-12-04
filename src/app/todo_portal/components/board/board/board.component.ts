import { Component, EventEmitter, Injectable, Input, NgModule, OnInit, Output } from '@angular/core';
import { List, ListInterface } from '../../../model/list/list.model';
import { BoardService } from '../../../service/board/board-service';
import { BoardModel } from '../../../model/board/board.model';
import { LocalService } from '../../../service/board/local/local.service';
import { Movement, MovementIntf } from 'src/app/todo_portal/model/card/movement';
import { Board } from 'src/app/portal/DTO/board.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/share/shared.service';
import Swal from 'sweetalert2';
import { Card, CardInterface } from 'src/app/todo_portal/model/card/card.model';
import { WorkspaceService } from 'src/app/portal/services/workspace.service';
import { Cards } from 'src/app/portal/DTO/card.dto';
import { CardService } from 'src/app/portal/services/card.service';
import { TaskService } from 'src/app/portal/services/task.service';
import { first } from 'rxjs';
import { TaskList } from 'src/app/portal/DTO/taskList';



@Component({
  selector: 'app-todo-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})

export class BoardComponent implements OnInit {
  board !: Board
  boardId !: number
  boards: Board[] = [];
  boardName!: String
  lists!: ListInterface[];

  boardId1: any
  cards: Cards[] = []
  card = new Cards()

  TaskList = new TaskList()

  constructor(private localService: LocalService,
    private router: Router,
    private cardService: CardService,
    private workspaceService: WorkspaceService,
    private sharedService: SharedService,
    private taskService: TaskService,
    private rout: ActivatedRoute) {
    this.boards = [];
  }

  ngOnInit() 
  {
    this.sharedService.activeRoute.queryParams.subscribe(params => {
     
    const board = this.localService.getBoard();
    this.lists = board.lists || [];
    this.boardId = this.rout.snapshot.params['boardId'];
    localStorage.setItem('board_id' , String(this.boardId))

    // localStorage.setItem('board' , '{"lists":[{"cards":[],"position":1,"name":"ToDo"},{"cards":[],"position":2,"name":"Doing"},{"cards":[],"position":3,"name":"Done"}]}')
    // this is recent view
    this.boardId = this.rout.snapshot.params['boardId'];
    //localStorage.setItem('recentBoard',this.boardId)
    this.sharedService.recentView(this.boardId).subscribe(data => {
      this.boardId
      console.log(this.boardId)
    });


   localStorage.removeItem('board')
    this.showData()
  })
  }

  showData() 
  {
   
    this.sharedService.showOneBoard(this.boardId).subscribe(data => {
      this.board = data;
    });
    this.cardService.showAllCard(this.boardId).subscribe(data => {
      console.log(data, 'card data')
      let sample = { "lists": [{ "cards": [], "position": 1, "name": "" }] }
      localStorage.removeItem('board')
      localStorage.setItem('board', JSON.stringify(sample))
      let board = JSON.parse(localStorage.getItem('board') || '{}')
      let cardData = JSON.parse(localStorage.getItem('board') || '{}').lists

      for (let i = 0; i < data.length; i++) {
        cardData.push({
          "cards": [],
          "name": data[i].cardName,
          "position": i,
          "type" : data[i].type,
          "id": data[i].cardId
        })
      }

      cardData.splice(0, 1)
      board.lists = cardData
      console.log(board, 'board')
      localStorage.setItem('board', JSON.stringify(board))

      // {id: "0", header: "header1", summary: "summary1", description: "sample desc"}
      for (let i = 0; i < data.length; i++) {
        this.taskService.showAllTask(String(data[i].cardId)).subscribe((response :  any) => {
          console.log(response, "task data")
          // alert(JSON.stringify(response))
          if (JSON.stringify(response) == '[]') {
            return
          }
          let taskList = []

          for (let i = 0; i < response.length; i++) {
            let index = cardData.findIndex((x: any) => x.id == response[i].cardId)
            taskList.push({
              id: response[i].id,
              header: response[i].name,
              summary: response[i].description,
              //  cardID : String(response[index].id)
            })
          }
          let cards

          for (let i = 0; i < response.length; i++) {
            let index = cardData.findIndex((x: any) => x.id == response[i].cardId)
            cards = JSON.parse(localStorage.getItem('board') || '{}').lists[index].cards
            cards.push(taskList)
          }

          console.log(cards, 'cards__')

          // let arrayCards = JSON.stringify(cards)
          // let firstString  = arrayCards.substring(1, arrayCards.length)
          // let secondString = firstString.substring(firstString.length -1,2)
          let formatCard = []
          for (let i = 0; i < cards[0].length; i++) {
            formatCard.push({
              id: cards[0][i].id,
              header: cards[0][i].header,
              summary: cards[0][i].summary
            })
          }

          console.log(formatCard, 'formatcard')

          for (let i = 0; i < response.length; i++) {
            let index = cardData.findIndex((x: any) => x.id == response[i].cardId)
            cardData[index].cards = formatCard
          }

          console.log(cardData, 'cardData_')

          board.lists = cardData
          localStorage.removeItem('board')
          localStorage.setItem('board', JSON.stringify(board))

          this.lists = board.lists
        
        })
      }   //  window.location.reload()
    })
  }

  // ngAfterContentChecked() {
  //   this.lists = JSON.parse(localStorage.getItem('board') || '{}').lists
  // }

  addList() 
  {
    const newList: ListInterface = new List();
    newList.position = this.lists.length + 1;
    newList.name = `List #${newList.position}`;
    if (this.lists === undefined) {
      this.lists = [];
    }
    this.lists.push(newList);

  }

  moveCardAcrossList(movementInformation: MovementIntf) 
  {
   
    const cardMoved = this.lists[movementInformation.fromListIdx].cards.splice(movementInformation.fromCardIdx, 1);
    this.lists[movementInformation.toListIdx].cards.splice(movementInformation.toCardIdx, 0, ...cardMoved);
    // this.saveBoard()
  }

  saveBoard() 
  {
    const boardModel = new BoardModel();
    boardModel.lists = this.lists;
    this.localService.saveBoard(boardModel);

    let localCard = JSON.parse(localStorage.getItem("board") || '').lists
    let formatedCard = []

    for (let i = 0; i < localCard.length; i++) {
      let id = localCard[i].id
      if (id == undefined || null) {
        id = ''
      }
      formatedCard.push(
        {
          "cardId": id,
          "cardName": localCard[i].name,
          "type": localCard[i].type
        }
      )
    }



    console.log(formatedCard , 'fm')
      let finalCard  : any = []
    for (let i = 0; i < localCard.length; i++) {
   finalCard.push(formatedCard[i])
    }

    let card : any = {}
    card.list = finalCard
    console.log(card , 'final card')


    let board_id = this.rout.snapshot.params['boardId'];                    
    this.workspaceService.cardCreate(card, board_id).subscribe(
      res => {
        
    
        this.saveTasks()
      
      }
    );
     
  }

  saveTasks() 
  {

    let localCard = JSON.parse(localStorage.getItem("board") || '').lists
    let formattedCard = []
    let task_id
  
    for (let i = 0; i < localCard.length; i++) {
      for (let j = 0; j < localCard[i].cards.length; j++) {
        let id = localCard[i].cards[j].id
        if (id == undefined || null) {
          id = ''
        }
        formattedCard.push({
          "id": id,
          "name": localCard[i].cards[j].header,
          "description": localCard[i].cards[j].summary,
          "startDate": "",
          "endDate": "",
          "cardId": localCard[i].id,
          "startTime": "",
          "endTime": "",
        })
      }
    }

    let finalTask : any = []
    finalTask.list  = formattedCard
    let task  = finalTask
    let apiTask = Object.assign({}, task);
    console.log(apiTask , 'task final card')
    // alert(JSON.stringify(apiTask))
    this.taskService.createTask(apiTask).subscribe(response => {
      console.log(apiTask ,'task saved')
      // window.location.reload()
      window.location.reload()
    })
  }

  deleteList(listIndex: number)
  {
    this.lists.splice(listIndex, 1);
  }

  clickme(boardId: string, boardName: string) 
  {
    let bId: number = parseInt(boardId);
    this.board.boardId = bId
    this.board.boardName = boardName

    Swal.fire({
      title: 'Successfully!',
      text: 'Update!!!',
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Updated!',
            'Your file has been updated.',
            'success'
          )
        }
      })
    // console.log(this.board1.boardName+"B name"+this.board1.boardId)
    this.sharedService.updateBoard(this.board).subscribe(data => {
        console.log("BoardDTO" + this.board.boardId, this.board.boardName);
    }
    );
  }

  deleteme(boardId: string) 
  {
    let bId: number = parseInt(boardId);
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
        this.sharedService.deleteBoard(bId).subscribe(data => {
          console.log("delete")
         this.sharedService.router.navigate(['/portal/dashboard'])       });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }


  pdf(){
    let format = 'pdf';
    let id = 2;

    this.taskService.getReport(format , id ).subscribe(
      res =>  {
         
      }
    );
  }

  excel(){
    let format = 'excel';
    let id = 2;

    this.taskService.getReport(format , id ).subscribe(
      res =>  {

      }
    );
  }

}
