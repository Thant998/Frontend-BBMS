import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Attached } from '../DTO/Attached.dto';
import { Attach } from '../DTO/Attatched';
import { TaskAttach } from '../DTO/TaskAttach.dto';

@Injectable({
  providedIn: 'root'
})
export class AttachedService {

  apiServer = environment.apiUrl

  constructor(private http:HttpClient) { }

  showAllAttached(activityId : number):Observable<Attached[]>{
    return  this.http.get<Attached[]>(`${this.apiServer+'/attached/getAll'}/${activityId}`);
  }

  showAllAttachedFile(taskId : String):Observable<TaskAttach[]>{
    return  this.http.get<TaskAttach[]>(`${this.apiServer+'/attached/showAll'}/${taskId}`);
  }


  // createAttached(attached : any , activityId : number ): Observable<any>{
   
  //   return this.http.post(`${this.apiServer+'/attached/addpost'}?activityId=` + activityId, attached);
  // }

  createAttached(attached : any ): Observable<any>{ 
    return this.http.post(`${this.apiServer+'/attached/addpost'}`, attached);
  }


  upload(file : File): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post('https://file.io', formData);
  }

  deleteAttached(attachedId: number): Observable<Object>{
    return this.http.get(`${this.apiServer+'/deleteAttached'}/${attachedId}`);
  }


  download(id : number):Observable<Attach>{
    return this.http.get<Attach>(`${this.apiServer+'/download'}/${id}`);
  }

}
