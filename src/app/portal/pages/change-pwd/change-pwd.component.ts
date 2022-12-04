import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../DTO/user';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {

  user = new User();
  error : string = '';


  constructor(private lin : LoginserviceService,private router : Router) { }

  ngOnInit(): void {
    
  }

  chgpwd(usr : NgForm){
    
    if(usr.value.password === usr.value.confirm){
      this.user.email = window.localStorage.getItem('email') || '';
      console.log(this.user.email);
      this.user.password = usr.value.password;
     
      this.lin.ChangePwd(this.user).subscribe(
          res => {
            if(res == 'success'){
              this.error='successfully changed'
            this.router.navigate(['chnpwd']);
            }
          }
        );
    }else{
      this.error='doesnt match!!!!'
      this.router.navigate(['chnpwd']);
    }     
  }


}
