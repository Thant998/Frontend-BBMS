import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SafePipe } from '../portal/pipe/safe.pipe';


@NgModule({
  declarations: [
    SafePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    SafePipe,
  ]
})
export class SharedModule { }
