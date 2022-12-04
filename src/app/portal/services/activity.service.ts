import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity } from '../DTO/Activity.dto';
import { UserTaskList } from '../DTO/UserTaskList.dto';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  apiServer = environment.apiUrl

  constructor(private http:HttpClient) { }

  showActivity(taskId : string): Observable<Object>{
    return this.http.get(`${this.apiServer+'/ActivityShowAll'}/${taskId}`);
  }

  createActivity(activity : any ): Observable<Object>{
    return this.http.post(`${this.apiServer+'/Activity'}`, activity);
  }

  deleteActivity(activityId: number): Observable<Object>{
    return this.http.get(`${this.apiServer+'/Delete'}/${activityId}`);
  }

}
