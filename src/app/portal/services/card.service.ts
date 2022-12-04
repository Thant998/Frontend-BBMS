import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cards } from '../DTO/card.dto';
import { Url } from '../DTO/URL';
import { Workspace } from '../DTO/workspace.dto';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiServer = environment.apiUrl

  constructor(private http:HttpClient) { }

  showAllCard(boardId : number):Observable<Cards[]>{
    return  this.http.get<Cards[]>(`${this.apiServer+'/ShowAllCard'}/${boardId}`);
  }

  deleteCard(cardId: string): Observable<Object>{
    return this.http.get(`${this.apiServer+'/CardDelete'}/${cardId}`);
  }

}
