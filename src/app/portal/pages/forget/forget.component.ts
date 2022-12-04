import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/share/shared.service';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {

  error : string = '';

  constructor(private lin : LoginserviceService,
    private share_ : SharedService,
    private router : Router) { }

  ngOnInit(): void {
  }

  forget(user : NgForm){
    this.share_.spinner.show()
    this.lin.forgetPwd(user.value.email).subscribe(
      (res : any) => {
        this.share_.spinner.hide()
        console.log(user.value.email);
          if(res == 'not found'){
            this.error = 'Your account is not created with this email!!';
            this.router.navigate(['forget']); 
          }
          if(res == 'success'){
            this.error = 'Please check your email and change password';
            
            this.router.navigate(['login']);
          }
      }
    );
  }

}
