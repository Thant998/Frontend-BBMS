import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/share/shared.service';
import { Board } from '../../DTO/board.dto';
import { Boards } from '../../DTO/Board1.dto';
import { BoardComponent } from '../../elements/board/board.component';


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards = new Board()
  board !: Board[];
  workspaceId !: number
  boardName : string = ''
  form : FormGroup
  isSubmitted = false;

  constructor ( 
    private activeRoute: ActivatedRoute,
    private sharedService : SharedService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service : SharedService,
    private boardPage : BoardComponent
    ) { 
      this.form = this.formBuilder.group({
        boardName: ['', Validators.required],
        description : [''],
      });
    }

  get f() 
  { 
    return this.form.controls; 
  }
  
  onSubmit() 
  {
    this.createBoard();  
  }

  createBoard()
  {

    this.isSubmitted = true
    if(this.form.invalid){
      // alert('invalid')
      return
    }
    let params : Boards = {
      boardId: 0,
      boardName: this.f['boardName'].value,
      workspaceId: this.workspaceId
    }
      this.service.createBoard(params)
      .subscribe({
        next: ( data) =>{
          this.sharedService.toastrService.success("Successfully")
         console.log("This is my data",this.boards.workspaceId);              
         this.form.reset()
         this.isSubmitted = false
         this.closeModal()
         this.boardPage.board=[]
         this.goToDashBoard();

         setTimeout(function(){
          window.location.reload()},0.05)       
       },
        error : (e) => console.log(e)
     });
  }
  

  goToDashBoard()
  {
    // this.form.reset()
    // this.isSubmitted = false
    this.router.navigate(['/portal/boards/'+this.boards.workspaceId],{queryParams:{'create':'true'}});
    this.boardPage.init()
    console.log(this.boardPage.board , 'board PAEE')
  }

  closeModal()
  {
    let ele=document.getElementById("exampleModal")as HTMLElement
    let modal = document.getElementsByClassName("modal-backdrop")[0]as HTMLElement
    let modal2 = document.getElementsByClassName("modal-backdrop")[1]as HTMLElement
    ele.style.display="none"
    modal.style.display="none"
    modal2.style.display="none"
  }

  ngOnInit() 
  {
    this.sharedService.spinner.show()
    this.workspaceId = this.route.snapshot.params['workspaceId'];
    this.boards.workspaceId=this.workspaceId;
    this.sharedService.spinner.hide()
  }

}

