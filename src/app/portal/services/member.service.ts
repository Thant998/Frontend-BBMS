import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/share/shared.service';


@Injectable({
    providedIn: 'root'
})
export class MemberService {

    constructor(private shared_: SharedService) { }
    
    //Member Service   
    // public getMembers() {
    //     return this.shared_.getRequest('/members');
    // }  

}