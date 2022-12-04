import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../DTO/member.dto';
import { MemberWorkspace } from '../DTO/MemberWorkspace';
import { Url } from '../DTO/URL';
import { User } from '../DTO/user';
import { UserListDTO } from '../DTO/UserList.dto';
import { UserTaskList } from '../DTO/UserTaskList.dto';
import { Workspace } from '../DTO/workspace.dto';
import { WorkspaceDTO } from '../DTO/workSpaceDTO';
import { WorkspaceUser } from '../DTO/workspaceUser.dto';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  apiServer = environment.apiUrl

  constructor(private http:HttpClient) { }

  private refreshRequired = new Subject<void>();

  get Refresh(){
    return this.refreshRequired;
  }
  
  updateWorkspace(workspace : Workspace): Observable<Object>{
    return this.http.put(`${this.apiServer+'/UpdateWorkspace'}`, workspace);
  }
  
  deleteWorkspace(workspaceId: number): Observable<Object>{
    return this.http.get(`${this.apiServer+'/deleteWorkspace'}/${workspaceId}`) .pipe(
      tap( 
        () => {
          this.Refresh.next();
        }
      )
    );
  }

  createWorkSpace(workspace : any):Observable<string>{
    return  this.http.post<string>(environment.apiUrl+Url.Create_WorkSpace,workspace,{withCredentials:true,responseType:'Text' as'json'})
    .pipe(
      tap( 
        () => {
          this.Refresh.next();
        }
      )
    );
  }

  showAllWorkSpace():Observable<Workspace[]>{
    return  this.http.get<Workspace[]>(environment.apiUrl+Url.Show_AllWorkSpace);
  }

  showAllMember(workspace : Workspace):Observable<WorkspaceUser[]>{
    return this.http.post<WorkspaceUser[]>(environment.apiUrl+Url.Show_Member,workspace,{withCredentials:true});
  }

  member(workspaceId : number):Observable<Workspace>{
    return  this.http.get<Workspace>(`${this.apiServer+'/memberWorkspace'}/${workspaceId}`);
  }

  addMember(workspace : MemberWorkspace):Observable<string>{
    return this.http.post<string>(environment.apiUrl+Url.Add_Member,workspace,{withCredentials:true,responseType:'Text' as 'json'}).pipe(
      tap( 
        () => {
          this.Refresh.next();
        }
      )
    );
  }


  showAllMemberList(workspaceId : number):Observable<Member[]>{
    return  this.http.get<Member[]>(`${this.apiServer+'/showMemberList'}/${workspaceId}`);
  }

  //show task member
  showAllActiveMemberList(workspaceId : number , taskId : string):Observable<User[]>{
    return  this.http.get<User[]>(`${this.apiServer+'/showActiveMemberList'}/${workspaceId}/${taskId}`);
  }
  
  showAllTaskMember(taskId : String):Observable<UserTaskList[]>{
    return  this.http.get<UserTaskList[]>(`${this.apiServer+'/showMember'}/${taskId}`);
  }
  
  // createCard(parm : any,board_id : string):Observable<string>{
  //   return  this.http.post<string>(environment.apiUrl+Url.Card+'/'+board_id,parm,{withCredentials:true,responseType:'Text' as'json'});
  // }

  cardCreate(card : any , boardId : number): Observable<Object>{
    return this.http.post(`${this.apiServer+'/Card'}/${boardId}`,card);
  }

  deleteMember(UserWorkspaceId: number): Observable<Object>{
    return this.http.get(`${this.apiServer+'/deleteMember'}/${UserWorkspaceId}`).pipe(
      tap( 
        () => {
          this.Refresh.next();
        }
      )
    );;
  }

  search(member:User, UserWorkspaceId : number):Observable<Member[]>{
    return this.http.get<Member[]>(`http://localhost:8080/api/v1/searchMember/${UserWorkspaceId}/?name=${member.name}`);
  }

  showTaskMember(taskId : String){
    return  this.http.get<UserTaskList>(`${this.apiServer+'/ShowTaskMember'}/${taskId}`);
  }

  saveMember( userListDTO : UserListDTO){
    return this.http.post<UserListDTO>(`http://localhost:8080/api/v1/inviteMember`, userListDTO);
  }

}
