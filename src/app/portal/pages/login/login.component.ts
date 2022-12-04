import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/share/shared.service';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = '';

  constructor(
    private share_ : SharedService,
    private lin : LoginserviceService,
    private router : Router) { }

  ngOnInit(): void {
    window.sessionStorage.setItem('logout','false');
  }
 
  login(user : NgForm){
    this.share_.spinner.show()
    
    this.lin.login(user.value).subscribe({
      next:(res) => {
        this.share_.spinner.hide()
        if(res != null){
          window.sessionStorage.setItem('userdetail',JSON.stringify(res));
          this.router.navigate(['portal/dashboard']);
        }
      },error:(err) => {
            this.error = 'Your Account is Invalid!!!';
      }
    });
  }
   
}
