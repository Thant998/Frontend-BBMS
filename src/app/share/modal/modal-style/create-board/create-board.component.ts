import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/share/shared.service';
import { Board } from 'src/app/portal/DTO/board.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  board_title : string = ''
  
  form : FormGroup
  isSubmitted = false;
  
  get f() {
    return this.form.controls;
  }

  // board_title : string = ''
  // errorMsg : string = ''
  // formGroup ! : FormGroup
  selectedWorkspace : string = ''

  workspaceId !: number
  boards = new Board()
  board !: Board[];

  constructor(
    private share_ : SharedService, 
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service : SharedService){
      this.form = this.fb.group({
      board_title: ['', Validators.required],
      description: ['']
    });
  }

  createBoard(){
    this.isSubmitted = true
    alert( this.f['board_title'].value)
    // let param = {
    //   name : this.f['board_title'].value,
    // }

    // if(this.form.invalid){
    //   return
    // }
    // if ( this.f['board_title'].value==""){
    //   return
    // }

    // this.share_.createBoard(param).subscribe(
    //  res => {
    //    if(res == 'success'){
    //        this.router.navigate(['portal/dashboard']);
    //        this.closeModal()
    //        this.form.reset()
    //        setTimeout(function(){
    //         window.location.reload();
    //      }, 100);
    //    }
    //  }
    // );  
 }


  ngOnInit(): void {
    this.workspaceId = this.route.snapshot.params['workspaceId'];
    this.boards.workspaceId=this.workspaceId;
   }

  workSpaceChange(workspace : string){ }

  closeModal(){
    this.share_.closeModal('create-board-modal')  
  }

  // validateCreateBoard(){
  //   if (this.board_title.trim().length === 0){
  //     this.errorMsg = "Board Name is required"
  //   }else{
  //     this.errorMsg = ""
  //     this.router.navigate(['/portal/dashboard']);
  //   }
  // }


}
