import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberWorkspace } from 'src/app/portal/DTO/MemberWorkspace';
import { NotificationDTO } from 'src/app/portal/DTO/notification.dto';
import { Workspace } from 'src/app/portal/DTO/workspace.dto';
import { NotificationService } from 'src/app/portal/services/notification.service';
import { WorkspaceService } from 'src/app/portal/services/workspace.service';
import { SharedService } from 'src/app/share/shared.service';

@Component({
  selector: 'app-invite-popup',
  templateUrl: './invite-popup.component.html',
  styleUrls: ['./invite-popup.component.scss']
})
export class InvitePopupComponent implements OnInit {

  workspace =  new MemberWorkspace
  workspaceId !: number
  workspaces !: any

  notification = new NotificationDTO()
  // workspaces = localStorage.getItem('workspaceId')
  // workspace = workspaces
  member_email : string = ''
  form : FormGroup
  isSubmitted = false;
  email : string = ''

  get f() {
    return this.form.controls;
  }

  constructor(private share_ : SharedService , 
    private router : Router,
    private noti_ : NotificationService,
    private workspace_ : WorkspaceService, 
    private fb:FormBuilder) {
      this.form = this.fb.group({
      member_email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
   }

  ngOnInit(): void {
    this.workspaces = localStorage.getItem('workspaceId')
    this.workspaceId = this.workspaces
    console.log("good game" + " " + this.workspaceId)
  }

  
  closeModal(){
    this.share_.closeModal('invite-popup-modal')  
  }

  inviteMember()
  {
    this.isSubmitted = true
    if(this.form.invalid){
      return
    }
   let email = this.f['member_email'].value
   this.email = email
    this.workspace.id = this.workspaceId
    console.log(this.workspace.id)
    this.workspace.inviteEmail?.push(email);
    console.log(this.workspace.inviteEmail);
    this.share_.spinner.show()
    this.workspace_.addMember(this.workspace) 
    .subscribe({
      next: ( data) =>{
      this.share_.toastrService.success("Member " +email+" is successfully invited")
      this.router.navigate(['portal/members']);
      this.share_.modalService_.close('invite-popup-modal')
      console.log(data , 'invite')
      this.isSubmitted = false
      this.form.reset()
      this.createNoti(data)
      this.share_.spinner.hide()
      // let a =  sessionStorage.getItem('aaaa');
      // this.router.navigate(['portal/members'+a]);
     },
     error : (e) => console.log(e , 'error message') , 
   });
  }

  
  createNoti(name : string){

    let param : NotificationDTO = {
      id: 0,
      name : name+" is invited to "+ this.email,
      type : "",
      userId: 0
    }

    this.noti_.createNotification(param)
    .subscribe({
      next: ( data) =>{
      //  setTimeout(function(){
      //   window.location.reload()},0.05)      
     },
      error : (e) => console.log(e)
   });
  }

}
