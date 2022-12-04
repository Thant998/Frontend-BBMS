import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService } from './modal/modal-style';
import { Board } from '../portal/DTO/board.dto';
import { Observable } from 'rxjs';
import { Boards } from '../portal/DTO/Board1.dto';
import { Card } from '../todo_portal/model/card/card.model';
import { Cards } from '../portal/DTO/card.dto';
import { Tasks } from '../portal/DTO/task.dto';
import { tap } from 'rxjs';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  apiServer = environment.apiUrl

  private refreshRequired = new Subject<void>();

  get Refresh(){
    return this.refreshRequired;
  }

  board!: Board[];

  constructor(
    public httpClient: HttpClient,
    public toastrService: ToastrService,
    public modalService_: ModalService,
    public router: Router,
    public spinner: NgxSpinnerService,
    public activeRoute: ActivatedRoute,
  ) { }


  openModal(id: string) {
    this.modalService_.open(id);
  }

  closeModal(id: string) {
    this.modalService_.close(id);
  }

  // All about board
  
  updateBoard(board : Boards): Observable<Object>{
    return this.httpClient.put(`${this.apiServer+'/portal/board/updateBoard'}`, board);
  }
   
  deleteBoard(boardId: number): Observable<Object>{
    return this.httpClient.get(`${this.apiServer+'/portal/boards/delete'}/${boardId}`);
  }

   getBoardList(workspaceId :number): Observable<Board[]>{
     return this.httpClient.get<Board[]>(`${this.apiServer+'/portal/boards'}/${workspaceId}`);
    }

    showOneBoard(boardId :number): Observable<Board>{
      return this.httpClient.get<Board>(`${this.apiServer+'/portal/todo'}/${boardId}`);
     }

    createBoard(board : Board): Observable<Object>{
      return this.httpClient.post(`${this.apiServer+'/portal/boards/'}`,board)
    }

    search(board:Board,workspaceId : number):Observable<Board[]>
    {
      return this.httpClient.get<Board[]>(`http://localhost:8080/api/v1/portal/boards/search/${workspaceId}/?name=${board.boardName}`);
    }

    recentView(boardId: number): Observable<Object>{
      return this.httpClient.get(`${this.apiServer+'/portal/boards/recentView'}/${boardId}`);
    }

    showAllRecentView():Observable<Board[]>{
      return  this.httpClient.get<Board[]>(`${this.apiServer+'/portal/boards/showRecentView/'}`);
    }

    getCard(boardId :number): Observable<Cards[]>{
      return this.httpClient.get<Cards[]>(`${this.apiServer+'/ShowAllCard'}/${boardId}`);
    }

    createTask(task : Tasks): Observable<Object>{
      return this.httpClient.post(`${this.apiServer+'/Task'}`,task);
    }


    // End board api 

  public getRequestWithParams(url: string, params: HttpParams) {
    return this.httpClient.get(this.apiServer + url, { params: params });
  }

  public getRequest(url: string) {
    return this.httpClient.get(this.apiServer + url);
  }

  public postRequest(url: string, data: any) {
    return this.httpClient.post(this.apiServer + url, data)
  }

  public postRequestParam(url: string) {
    return this.httpClient.post(this.apiServer + url, null)
  }

  public putRequest(url: string, data: any) {
    return this.httpClient.put(this.apiServer + url, data)
  }

  public putRequestParam(url: string) {
    return this.httpClient.put(this.apiServer + url, null)
  }

  public deleteRequest(url: string, data: any) {
    return this.httpClient.delete(this.apiServer + url, data)
  }

  public deleteRequestParam(url: string) {
    return this.httpClient.delete(this.apiServer + url)
  }

  public getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let today_date = yyyy + '-' + mm + '-' + dd;
    return today_date

  }

 


}
