import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/share/shared.service';
import { User } from '../../DTO/user';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formdata :any;
  error = '';
  pict :any = 'assets/images/contact-us/avatar.jpg';
  profile: any = File;
  use = new User();
  has : boolean = false;
  check : boolean = false;

  constructor(private lin : LoginserviceService,
    private router : Router,private http : HttpClient,
    private share_ : SharedService) { }

  ngOnInit(): void {
  }

  selectpic(e : any){
    console.log(e)
    this.check = true
    if(e.target.files){
      this.has = true;
      var read = new FileReader();
      this.profile = e.target.files[0];
      console.log(this.profile);
      read.readAsDataURL(e.target.files[0]);
      read.onload=(event : any)=>{
        this.pict = event.target.result;
      }
    }
}


  register(user : NgForm){
   
    this.use.name= user.value.name;
    this.use.email = user.value.email;
    this.use.password = user.value.password;
    this.use.confirm = user.value.confirm;
    this.use.role = 'admin';
    this.use.enable = false;
    this.formdata = new FormData();

    if(this.check == false){  
      let ss : string ; 
    this.http.get('assets/images/contact-us/avatar.jpg', { responseType: 'blob' })
    .subscribe(blob => {
    const reader = new FileReader();
    const binaryString = reader.readAsDataURL(blob);
    reader.onload = (event: any) => {
      ss = event.target.result;
      const words = ss.split(',');
        ss = words[1];
       
      const b = window.atob(ss);
      const c = new ArrayBuffer(b.length);
      const z = new Uint8Array(c);
      for(let i = 0 ; i < b.length ;i++){
        z[i] = b.charCodeAt(i); 
      }
      const blob = new Blob([z],{type: 'image/jpeg'})
      const file = new File([blob],'default.jpg',{type:'image/jpeg'})
      this.profile = file;
  };
  });}

    //set new code
    this.formdata.append('user', JSON.stringify(this.use));    
      this.formdata.append('file',this.profile);
      this.share_.spinner.show()
    this.lin.reigster(this.formdata).subscribe({
      next:(res:any) => {
        console.log(this.formdata.get('user'));
        this.share_.spinner.hide()
        if (res ==  'already'){
          this.error = 'This Email is Already Created !!';
          this.router.navigate(['register']);
        }
        if (res ==  'not match'){
          this.error = 'Password Doesnt Match!!';
          this.router.navigate(['register']);
        }
        if(res == 'success'){
          this.router.navigate(['login']);
        }
      },error:(er) =>{
        console.log(er);
      }
  });

  }


}
