import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/share/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkspaceService } from 'src/app/portal/services/workspace.service';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss']
})
export class CreateWorkspaceComponent implements OnInit {

  workspace_title : string = ''
  form : FormGroup
  isSubmitted = false;
  
  get f() {
    return this.form.controls;
  }

  constructor(
    private ws : WorkspaceService,
    private router: Router,
    private share_ : SharedService,
    private fb:FormBuilder
    ) {
          this.form = this.fb.group({
          workspace_title: ['', Validators.required],
        });
      }

  ngOnInit(): void {
    this.form.reset()
  }

  closeModal()
  {
    this.share_.closeModal('create-workspace-modal')  
  }

  createWorkspace()
  {
    this.isSubmitted = true
    let param = {
      name : this.f['workspace_title'].value,
    }
    if(this.form.invalid)
    {
      return
    }
    // workspace.value
    this.ws.createWorkSpace(param).subscribe(
     res => {
       if(res == 'success'){
        this.share_.toastrService.success("Successfully")
           this.router.navigate(['portal/dashboard']);
          
           this.closeModal()
           this.form.reset()
           this.isSubmitted = false
        //    setTimeout(function(){
        //     window.location.reload();
        //  }, 0.05);       
       }
     }
    );  
 }

}
