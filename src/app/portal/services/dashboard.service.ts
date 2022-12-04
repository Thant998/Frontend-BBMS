import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/share/shared.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  // constructor(private share_ : SharedService) { }
  constructor(private share_ : SharedService , private httpClient : HttpClient) { }

}
