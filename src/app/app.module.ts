import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpConfigInterceptor } from './share/httpconfig.interceptor';
import { ModalStyleModule } from './share/modal/modal-style';
import { AlertComponent } from './share/modal/modal-style/alert/alert.component';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavBarComponent } from './portal/elements/nav-bar/nav-bar.component';
import { ForgotPopupComponent } from './share/modal/modal-style/forgot-popup/forgot-popup.component';
import { InvitePopupComponent } from './share/modal/modal-style/invite-popup/invite-popup.component';
import { CreateBoardComponent } from './share/modal/modal-style/create-board/create-board.component';
import { SearchDropdownComponent } from './share/search-dropdown/search-dropdown.component';
import { CreateWorkspaceComponent } from './share/modal/modal-style/create-workspace/create-workspace.component';
import { HttpresponseInterceptor } from './share/httpresponse.interceptor';

// import { NgToastModule } from 'ng-angular-popup'
import { NgxSpinnerModule } from "ngx-spinner";
import { SummaryComponent } from './todo_portal/components/board/card/summary/summary.component';
import { BoardComponent } from './todo_portal/components/board/board/board.component';
import { ListComponent } from './todo_portal/components/board/list/list.component';
import { ContentEditDirective } from './todo_portal/directives/common/content-edit.directive';
import { ContextMenuComponent } from './todo_portal/components/common/contextmenu/context-menu.component';
import { CardDetailPopupComponent } from './share/modal/modal-style/card-detail-popup/card-detail-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NotificationComponent } from './portal/pages/notification/notification.component';
import { ChangepasswordpopupComponent } from './changepasswordpopup/changepasswordpopup.component';
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    InvitePopupComponent,
    CreateBoardComponent,
    NavBarComponent,
    SearchDropdownComponent,
    ForgotPopupComponent,
    CreateWorkspaceComponent,
    CardDetailPopupComponent,
    SummaryComponent,
    BoardComponent,
    ListComponent,
    ContentEditDirective, 
    ContextMenuComponent,
    NotificationComponent,
    ChangepasswordpopupComponent
  ],
  imports: [
    MatDialogModule,
    ModalStyleModule,
    FormsModule,
    
    PickerModule,
    BrowserModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(
      {
        timeOut : 2000
      }
    ), 
    HttpClientModule,
    NgProgressModule.withConfig({
      spinnerPosition: "right",
      color: "white"
    }),
    NgProgressHttpModule,
    BrowserAnimationsModule,
    AppRoutingModule
    
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass:  HttpresponseInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
