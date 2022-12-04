import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/share/shared.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private shared_: SharedService) { }

   
    //Auth Service  
     
    public loginAccount(loginParameter : any) {
        return this.shared_.postRequest('login' , loginParameter);
    }

    saveUserLocalStorage(userData: any) {
        localStorage.setItem("userData", String(userData));
    }


    public logoutAccount() {
        this.clearData();
    }

    clearData() {
        // localStorage.removeItem("userData")
        // localStorage.removeItem("account")
        // localStorage.removeItem("account_type")
        window.sessionStorage.removeItem('userdetail')
        localStorage.removeItem("login")
        this.shared_.router.navigate(['/login']);
    }


}