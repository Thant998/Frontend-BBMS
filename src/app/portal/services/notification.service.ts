import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board } from '../DTO/board.dto';
import { NotificationDTO } from '../DTO/notification.dto';
// import {NgToastService} from "ng-angular-popup";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  apiServer = environment.apiUrl

  constructor(private toastr:ToastrService,public httpClient: HttpClient) { }

  showToast(message:string){
    this.toastr.success(message)
  }

  getNotification(): Observable<NotificationDTO[]>{
    return this.httpClient.get<NotificationDTO[]>(`${this.apiServer+'/selectAllNoti'}`);
  }

   createNotification(noti : NotificationDTO): Observable<Object>{
    return this.httpClient.post(`${this.apiServer+'/Noti'}`,noti);
  }

  deleteNotification(nfId: number): Observable<Object>{
    return this.httpClient.get(`${this.apiServer+'/deleteNoti'}/${nfId}`);
  }
  
}
