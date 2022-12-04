import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity } from 'src/app/portal/DTO/Activity.dto';
import { Attached } from 'src/app/portal/DTO/Attached.dto';
import { Comments } from 'src/app/portal/DTO/comment.dto';
import { Member } from 'src/app/portal/DTO/member.dto';
import { Tasks } from 'src/app/portal/DTO/task.dto';
import { User } from 'src/app/portal/DTO/user';
import { UserListDTO } from 'src/app/portal/DTO/UserList.dto';
import { UserTaskList } from 'src/app/portal/DTO/UserTaskList.dto';
import { ActivityService } from 'src/app/portal/services/activity.service';
import { AttachedService } from 'src/app/portal/services/attached.service';
import { CardService } from 'src/app/portal/services/card.service';
import { CommentService } from 'src/app/portal/services/comment.service';
import { LoginserviceService } from 'src/app/portal/services/loginservice.service';
import { TaskService } from 'src/app/portal/services/task.service';
import { WorkspaceService } from 'src/app/portal/services/workspace.service';
import { SharedService } from 'src/app/share/shared.service';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import { TaskAttach } from 'src/app/portal/DTO/TaskAttach.dto';

@Component({
  selector: 'app-card-detail-popup',
  templateUrl: './card-detail-popup.component.html',
  styleUrls: ['./card-detail-popup.component.scss']
})

export class CardDetailPopupComponent implements OnInit 
{
  showEmoji : boolean  = false
  selectedEmoji:any;
  workspaceId !: any
  membersList !: Member[]

  userList : User[]= []

  userListDto !: UserListDTO

  
  setMember :any =[]
  startDate : string = ''
  endDate : string = ''

  task_title : string = ''
  form !: FormGroup
  isSubmitted = false;
  
  taskMember : any;

  currentActivityId : number =0

  comment : Comments[] =[]
  commentDto !: Comments
  names : string = ''

  taskActivity : Activity[] = []
  activityData !: Activity

  showMember: boolean 
  showDueDate : boolean
  showAttachment : boolean 
   taskData !: Tasks
  // taskData !:UserTaskList
  task_id : string = ''

description : string  = ''
file!: File ;
//attachs : Attached[]  = []
attached : TaskAttach [] = []

  constructor(
    private share_ : SharedService , 
    private activity_ : ActivityService,
    private fb:FormBuilder,
    private router: Router,
    private task_: TaskService, 
    private attached_:AttachedService,
    private comment_ : CommentService,
      private lin : LoginserviceService,
    private workspace_ :WorkspaceService) {
      this.showMember = false,
      this.showDueDate = false
      this.showAttachment = false
      this.form = this.fb.group({
      task_title: ['', Validators.required],
      description : ['']
      
    });
   
   }

  get f() {
    return this.form.controls;
  }

  onChange(event : any) {
    this.file = event.target.files[0];
    console.log(this.file , 'upload')
  }

  showUploadPopup(activityId : number){
    this.currentActivityId = activityId  
  }

  uploadFile(){
    const formData: FormData = new FormData();
    formData.append('files', this.file);
    let param : Attached = {
      id: 0,
      name: '',
      activityId: 3,
      files : formData
    }
    formData.append('activityId', String(this.currentActivityId)); //activity Id
    this.attached_.createAttached(formData).subscribe(data => {
      this.share_.toastrService.success('Successfully uploaded!')
      this.showAllAttached(this.task_id)
    })
  }

  download(){
    // put the attatch id 
    this.attached_.download(1).subscribe(
      res => {
        const b = window.atob(res.resource || '');
      const c = new ArrayBuffer(b.length);
      const z = new Uint8Array(c);
      for(let i = 0 ; i < b.length ;i++){
        z[i] = b.charCodeAt(i); 
      }
      //const blob = new Blob([z],{type: 'image/jpeg'})
      const blob = new Blob([z])
      FileSaver.saveAs(blob,res.name); 
      }
    );
  }

  deleteAttach(id : number){
    this.attached_.deleteAttached(id).subscribe(
      (res : any)=>{
        this.showAllAttached(this.task_id)
      }
    )
  }

  showAllAttached(taskid : string){
    this.attached_.showAllAttachedFile(taskid).subscribe(
      (res : any)=>{
        console.log("this is attached" , res)
        this.attached = res
      }
    )
  }

  downloadAttached(id : number){
    this.attached_.download(id).subscribe(
      (res : any)=>{
        console.log("this is attached" , res)
        const b = window.atob(res.resource || '');
        const c = new ArrayBuffer(b.length);
        const z = new Uint8Array(c);
        for(let i = 0 ; i < b.length ;i++){
          z[i] = b.charCodeAt(i); 
        }
        //const blob = new Blob([z],{type: 'image/jpeg'})
        const blob = new Blob([z])
        FileSaver.saveAs(blob,res.name); 
      }
    )
  }



  setTaskMember(user : any){
  let  index = this.setMember.findIndex((x: any)=> x == user.id)
  if(index == -1){
    this.setMember.push(user.id )
    console.log(this.setMember)
    this.taskMember.push(user)
  }
  } 

  saveData(){
    if(this.setMember.length != 0){
    this.saveMember()
    }else{
      this.activitySave()
      this.share_.toastrService.success("Saving Successfully!")
    }
  }

  //taskId1 = localStorage.getItem('task_id') || ''

  saveMember(){ 
    let param :  UserListDTO = {  
      taskId : localStorage.getItem('task_id') || '',
      userId : this.setMember
    } 
    this.workspace_.saveMember(param).subscribe(data => {
      this.activitySave()
    this.share_.toastrService.success("Saving Successfully!")
        })
  }

  saveComment(){
    //taskId1 : localStorage.getItem('task_id') || '',
    this.comment_.showComment(this.task_id).subscribe(data => {
      console.log("show comment success" , data)
      this.comment= data
         })
  }


  select(event :any){
    this.selectedEmoji = event.emoji;
    console.log(this.selectedEmoji)
    this.names += this.selectedEmoji.native
  }

  createComment(){
    if(this.names == '')   
    return
    console.log(this.names+ " "+" this is comment name")
    
    let param : Comments = {
      id: 0,
      name: this.names,
      userName: '',
      date: '',
      time: '',
      taskId:this.task_id,
      userId: 0
    }
    this.comment_.createComment(param).subscribe(data => {
      console.log("create comment successfully" , this.names)
      this.saveComment()
      this.names = ''

         })
  }

  deleteComment(commentId: number) 
  {
    let cId: number = commentId;
        this.comment_.deleteComment(cId).subscribe(data => {
          console.log("delete")
          this.saveComment()
        });
  }


  checkboxClick(i : number){
 
    if(this.taskActivity[i].status == 'true'){
      this.taskActivity[i].status = 'false'
    }else{
      this.taskActivity[i].status = 'true'
    }      
  }
  
  deleteActivity(activityId: number,i : number) 
  {
    //let bId: number = parseInt(boardId);
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
        this.taskActivity.splice(i,1)
     if(activityId == 0){
       return
     }
        this.activity_.deleteActivity(activityId).subscribe(data => {
          console.log("delete")
          
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  activitySave(){
    console.log(this.taskActivity , 'current activity')
   let statusCount = 0
    for (let i = 0; i < this.taskActivity.length; i++) {
      if(this.taskActivity[i].status == 'true'){
        statusCount += 1
      }
    }

    // let localCard  = JSON.parse(localStorage.getItem('board') || '{}').lists
    // let defaultCard : any = []
    // for (let i = 0; i < localCard.length; i++) {
    // if( localCard[i].type == 'default'){
    //   defaultCard.push(localCard[i].type)
    // }
    // }

    
let local_card = JSON.parse(localStorage.getItem('board') || '{}').lists
let card_id = this.taskData.cardId

if (statusCount ==0){
  card_id = local_card[0].id
}


    if(statusCount > 0){
      // card_id = defaultCard[1].id
      card_id  = local_card[1].id
    }
   
    if(statusCount == this.taskActivity.length ){
      // card_id = defaultCard[2].id
      card_id = local_card[2].id
    }
  

    let param =   
        {
          "taskId": this.task_id,
          "cardId": card_id,
          "list": this.taskActivity
        }
      
    
    this.activity_.createActivity(param).subscribe(data => {
      console.log("save activity")
      // this.share_.toastrService.success("Saving Successfully!")
    window.location.reload()                        
         })
  }

  createTask()
  {
    this.isSubmitted = true
    let param : Tasks= {
      name: this.f['task_title'].value,
      id: this.task_id,
      description: this.f['description'].value,
      startDate: this.startDate,
      endDate: this.endDate,
      startTime: this.taskData.startDate,
      endTime: this.taskData.endDate,
      cardId: this.taskData.cardId
    }
    // alert(this.startDate)
    if(this.form.invalid)
    {
      return    
    } 
    this.task_.insertTask(this.task_id , param).subscribe(data => {
      this.isSubmitted = false
      console.log("save tasks" , data)
    
      this.saveData()
         })
  }

  activityTask( taskId : string){     
    this.activity_.showActivity(taskId).subscribe((data : any)=> {
      console.log("Activity" , data)
      this.taskActivity = data
         })
  }

  activityNameChange(event : any,i :number){
    // alert(event.target.innerHTML)

    
      this.taskActivity[i].activityName = event.target.innerHTML
    

  }


addActivity(){
  let activity : Activity = {
    activityId: 0,
    activityName: '',
    taskId: this.task_id,
    status: 'false',
    cardId: ''
  }

  if(this.taskActivity.length > 5){
     this.share_.toastrService.warning('Limit Over')
  }else{
   this.taskActivity.push(activity)
  }
}

ngAfterContentChecked() {
  // this.task_id = localStorage.getItem('task_id') || ''
}

  ngOnInit(): void 
  {   
    this.share_.activeRoute.queryParams.subscribe(params => {
     
      this.task_id  =  String(this.share_.activeRoute.snapshot.queryParamMap.get("task_id")) 
    
      //  alert(this.task_id)  
      if(this.task_id != 'null')    {        
        this.showData()
      } 
    })
   // this.showAttached()  
    //this.showAllAttached()
  }

  showData(){
    this.setMember = []
    this.workspaceId = localStorage.getItem('workspaceIdMember')
    this.workspace_.  showAllActiveMemberList(this.workspaceId , this.task_id).subscribe(data => {
    this.userList =data; 
    this.getTaskMember()
    this.showTask();
    this.saveComment()
    this.activityTask(this.task_id)
    this.showAllAttached(this.task_id)

      })
  }


  getTaskMember(){
   
    this.workspace_.showTaskMember(this.task_id).subscribe(data => {
     
      console.log("left member",data)
      this.taskMember = data.userList
        })
  }

  // ngAfterContentChecked() 
  // {
  //   this.task_id  = localStorage.getItem('task_id') || ''
  // }

  showTask()
  {
      this.task_.showTask(this.task_id).subscribe({
        next: ( data : any) =>{
        //  setTimeout(function(){
        //   window.location.reload()},0.05)
         console.log(data , 'w5')
         this.taskData = data
         this.startDate = this.taskData.startDate
         this.endDate = this.taskData.endDate
         this.description = this.taskData.description
       },
       error : (e) => console.log(e , 'error message') , 
     });
  }
  
  showMemberOpen()
  {
    this.showMember = true
    this.showDueDate = false
    this.showAttachment = false
  }

  hideMember()
  {
    this.showMember = false
  }

  showDueDateOpen()
  {
    this.showMember = false
    this.showDueDate = true
    this.showAttachment = false
  }

  hideDueDate()
  {
    this.showDueDate = false
  }

  showAttachOpen()
  {
    this.showMember = false
    this.showDueDate = false
    this.showAttachment = true
  }

  hideAttach()
  {
    this.showAttachment = false
  }

  closeModal()
  {
    this.share_.closeModal('card-detail-modal')  
  }


  // update(user : NgForm){
  //   this.use.name= user.value.name;
  //   this.use.email = user.value.email;
  //   this.use.password = user.value.password;
  //   this.use.confirm = user.value.confirm;
  //   this.formdata = new FormData();

  //   this.formdata.append('user', JSON.stringify(this.use));
  //   this.formdata.append('file',this.profile);

  //   this.lin.update(this.formdata).subscribe({
  //     next:(res:any) => {
  //       console.log(this.formdata.get('user'));
  //       if(res == 'success'){
  //         this.router.navigate(['board']);
  //       }
  //     },error:(er) =>{
  //       console.log(er);
  //     }
  // });
  // }



}
