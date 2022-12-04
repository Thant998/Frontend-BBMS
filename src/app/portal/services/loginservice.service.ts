import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Url } from '../DTO/URL';
import { User } from '../DTO/user';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient) { }

  login(user: User){
    window.sessionStorage.setItem('userdetail',JSON.stringify(user));
    //session storage for user id
    window.sessionStorage.setItem('userId' , JSON.stringify(user.id)) ;
    localStorage.setItem("login" , "true")
    // console.log(  window.sessionStorage.setItem('userId' , JSON.stringify(user.id)) )
    return this.http.get(environment.auth+Url.Login_URL,{observe:'response',withCredentials:true});
  } 

  reigster(user : FormData):Observable<string>{
    return  this.http.post<string>(environment.auth+Url.Register_User,user,{withCredentials:true,responseType:'Text' as'json'});
  }

  forgetPwd(email : String):Observable<string>{
    return  this.http.post<string>(environment.auth+Url.Forget_Pwd,email,{withCredentials:true,responseType:'Text' as'json'});
  }

  ChangePwd(user : User):Observable<string>{
    return  this.http.post<string>(environment.auth+Url.Change_Pwd,user,{withCredentials:true,responseType:'Text' as'json'});
  }

  showPF():Observable<User>{
    return  this.http.get<User>(environment.auth+Url.Show_Profile);
  }

  update(user : FormData):Observable<String>{
    return  this.http.post<string>(environment.auth+Url.Update_User,user,{withCredentials:true,responseType:'Text' as'json'});
  }
  
}
