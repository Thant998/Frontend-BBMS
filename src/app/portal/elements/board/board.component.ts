import { Component, OnInit, Input, Inject, Injectable } from '@angular/core';
import { Board } from '../../DTO/board.dto';
import { SharedService } from 'src/app/share/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Boards } from '../../DTO/Board1.dto';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ 
  providedIn : 'root'
})
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  form !: FormGroup
  boards = new Board()
  board1 =new Boards
  board !: Board[];
  workspaceId !: number
  @Input()  boardParam : any;

  constructor(
    private sharedService : SharedService,
    private router : Router ,
    private route: ActivatedRoute) 
    {
      this.board=[];
    }

  search()
  {
    this.sharedService.search(this.boards,this.workspaceId).subscribe({
      next:(data)=>{
        // console.log(data)
        this.board=data
      },error : (e) => console.log(e)
    })
  }

  ngOnInit(): void 
  {
    this.route.params.subscribe(params => {
      this.init()
    })
  }

  init(){
   
    this.workspaceId = this.route.snapshot.params['workspaceId'];
    // console.log(this.route.snapshot.params);
    this.boards.workspaceId=this.workspaceId
    this.sharedService.getBoardList(this.workspaceId).subscribe(data => {
        this.board = data
        console.log(data , 'refresh board')
        
      });
  }

  clickme(boardId : string,boardName : string)
  {
    let bId:number = parseInt(boardId);
    this.board1.boardId=bId
    this.board1.boardName=boardName
     
    Swal.fire({
      title: 'Successfully!',
      text: 'Update!!!',
    }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Updated!',
        'Your file has been updated.',
        'success'
      )
     }
   })
    // console.log(this.board1.boardName+"B name"+this.board1.boardId)
    this.sharedService.updateBoard(this.board1).subscribe(data=>{
      console.log("BoardDTO"+this.board1.boardId,this.board1.boardName);
    });
  }
  
 deleteme(boardId : string)
 {
  let bId:number = parseInt(boardId);
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
      this.sharedService.deleteBoard(bId).subscribe(data =>
        {
          console.log("delete")
         setTimeout(function(){
          window.location.reload()},0.05)
        });
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
   })
  }

  onSubmit()
  {
    this.search();
  }

  goToDo(boardId : number){
    this.sharedService.router.navigate(['portal/todo/'+boardId])
   
  }

  
}
