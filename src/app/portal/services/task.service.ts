import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { Tasks } from '../DTO/task.dto';
import { TaskList } from '../DTO/taskList';
import { Url } from '../DTO/URL';
import { UserTaskList } from '../DTO/UserTaskList.dto';
import { Workspace } from '../DTO/workspace.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
   
  apiServer = environment.apiUrl

  constructor(private http:HttpClient) { }

  // showAllTask(cardId : string):Observable<Tasks[]>{
  //   return  this.http.get<Tasks[]>(`${this.apiServer+'/Task'}/${cardId}`);
  // }
  showAllTask(cardId : string):Observable<Tasks[]>{
    return  this.http.get<Tasks[]>(`${this.apiServer+'/Task'}/${cardId}`);
  }

  showTask(taskId : string):Observable<Tasks[]>{
    return  this.http.get<Tasks[]>(`${this.apiServer+'/TaskShowOne'}/${taskId}`);
  }

  createTask(task : any): Observable<Object>{
    return this.http.post(`${this.apiServer+'/Task'}`,task);
  }

  insertTask(taskId : string , taskDto : Tasks): Observable<Object>{
    return this.http.put(`${this.apiServer+'/TaskUpdate'}/${taskId}`,taskDto);
  }

  deleteTask(taskId: string): Observable<Object>{
    return this.http.get(`${this.apiServer+'/Task/Delete'}/${taskId}`);
  }

  // showTask(taskId : string):Observable<UserTaskList[]>{
  //   return  this.http.get<UserTaskList[]>(`${this.apiServer+'/TaskShowOne'}/${taskId}`);
  // }

  getReport(format : any , id : any):Observable<string>{
    return  this.http.get<string>(`${this.apiServer+'/sreport'}/${format}/${id}`);
  }
  
}
