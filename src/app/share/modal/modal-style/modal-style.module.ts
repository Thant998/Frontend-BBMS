import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalStyleComponent } from './modal-style.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    ModalStyleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports : [ModalStyleComponent,FormsModule,ReactiveFormsModule]
})
export class ModalStyleModule { }
