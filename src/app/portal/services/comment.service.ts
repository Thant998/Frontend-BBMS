import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cards } from '../DTO/card.dto';
import { Comments } from '../DTO/comment.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  
  apiServer = environment.apiUrl

  constructor(private http:HttpClient) { }

  showComment(taskId : any):Observable<Comments[]>{
    return  this.http.get<Comments[]>(`${this.apiServer+'/selectAllComment'}/${taskId}`);
  }

  createComment(comment : any ): Observable<Object>{
    return this.http.post(`${this.apiServer+'/commentInsert'}`, comment);
  }
  
  deleteComment(commentId: number): Observable<Object>{
    return this.http.get(`${this.apiServer+'/delete'}/${commentId}`);
  }

}
