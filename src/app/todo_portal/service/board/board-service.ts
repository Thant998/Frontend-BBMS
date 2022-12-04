import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/share/modal/modal-style';
import { environment } from 'src/environments/environment';
import {BoardModel} from '../../model/board/board.model';
import { Card } from '../../model/card/card.model';
import {LocalService} from './local/local.service';


export abstract class BoardService {
  apiServer = environment.apiUrl
  
  cards!: Card[];

  constructor(
    public httpClient: HttpClient,
    public toastrService: ToastrService,
    public modalService_: ModalService,
    public router: Router,
    public spinner: NgxSpinnerService,
  ) { }

  public abstract saveBoard(board: BoardModel ) : any;

  public abstract getBoard(): BoardModel;

  getBoardList(boardId :number): Observable<Card[]>{
    return this.httpClient.get<Card[]>(`${this.apiServer+'/portal/ShowAllCard'}/${boardId}`);
  }
}
