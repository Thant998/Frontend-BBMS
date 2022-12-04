import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/share/shared.service';
import { User } from '../../DTO/user';
import { LoginserviceService } from '../../services/loginservice.service';
import { ChangepasswordpopupComponent } from 'src/app/changepasswordpopup/changepasswordpopup.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  
  formdata :any;
  error = '';
  pict :any;
  profile: any = File;
  use = new User();
  addOnBlur = true;


  constructor(private lin : LoginserviceService,private dialog: MatDialog,private router : Router , private share_ : SharedService) { }
  
   
  
    ngOnInit(): void {
    this.ShowProfile();
  }


  selectpic(e : any){
    if(e.target.files){
      var read = new FileReader();
      this.profile = e.target.files[0];
      read.readAsDataURL(e.target.files[0]);
      read.onload=(event : any)=>{
        this.pict = event.target.result;
      }
    }
}

  update(user : NgForm){
    this.use.name= user.value.name;
    this.use.email = user.value.email;
    this.use.password = user.value.password;
    this.use.confirm = user.value.confirm;
    this.formdata = new FormData();   
    this.formdata.append('user', JSON.stringify(this.use));
    this.formdata.append('file',this.profile);
    this.lin.update(this.formdata).subscribe({
      next:(res:any) => {
        console.log(this.formdata.get('user'));
        if(res == 'success'){
          // this.router.navigate(['board']);
          this.share_.toastrService.success("Successfully")
        }
      },error:(er) =>{
        console.log(er);
      }});
  }

  ShowProfile(){
  this.lin.showPF().subscribe(
    res => {
      this.use = res;
      const b = window.atob(this.use.pic || '');
      const c = new ArrayBuffer(b.length);
      const z = new Uint8Array(c);
      for(let i = 0 ; i < b.length ;i++){
        z[i] = b.charCodeAt(i); 
      }
      const blob = new Blob([z],{type: 'image/jpeg'})
      const file = new File([blob],this.use.picname || '',{type:'image/jpeg'})
      this.profile = file;
      var read = new FileReader();
      read.readAsDataURL(file);
      read.onload=(event : any)=>{
        this.pict = event.target.result;
      }  
    }
  );
  }

  changepassowrd(){
    const dialogRef = this.dialog.open(ChangepasswordpopupComponent);
  }

}
