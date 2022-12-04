import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/share/shared.service';
import Swal from 'sweetalert2';
import { Member } from '../../DTO/member.dto';
import { MemberWorkspace } from '../../DTO/MemberWorkspace';
import { User } from '../../DTO/user';
import { Workspace } from '../../DTO/workspace.dto';
import { MemberService } from '../../services/member.service';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members !: Member ;
  user !: User
  workspaceId !: number;
  workspaces = new Workspace()
  membersList !: Member[]
  searchName !: any

  constructor(
    private share_ : SharedService,
    private memberService_ : MemberService,
    private workspace_ : WorkspaceService,
    private router : Router,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.workspaceId = this.route.snapshot.params['workspaceId'];
    localStorage.setItem('workspaceId' ,  this.workspaceId.toString())
    this.workspace_.  member(this.workspaceId).subscribe(data => {
      this.workspaces =data;
    }) 
    this.workspace_.  showAllMemberList(this.workspaceId).subscribe(data => {
      this.membersList =data;   
      console.log('current user user ' , data)
   })
   this.workspace_.Refresh.subscribe(
    res => {
      this.workspace_.  showAllMemberList(this.workspaceId).subscribe(data => {
        this.membersList =data;   
        console.log('current user user ' , data)
     })
    }
   );
  }


  inviteMembers(id : string){
    this.share_.openModal(id);
  }

  showMemberList(workspaceId : number){
    this.workspace_.  showAllMemberList(this.workspaceId).subscribe(data => {
      console.log('current user user ' , data)
      this.membersList =data; 
    })
  }

  deleteMember(userWorkspaceId : number)
  {
   //let bId:number = parseInt(boardId);
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
       this.workspace_.deleteMember(userWorkspaceId).subscribe(data =>
         {
           console.log("delete")
          // setTimeout(function(){
          //  window.location.reload()},0.05)
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

  search()
  {
    this.workspace_.search(this.members,this.workspaceId).subscribe
    ({
      next:(data)=>{
        // console.log(data)
        this.membersList=data
      },error : (e) => console.log(e)
    })
  }

  onSubmit()
  {
    this.search();
  }

}
