import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuBarComponent } from './elements/menu-bar/menu-bar.component';
import { ScreenComponent } from './pages/layout/screen/screen.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../share/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { BoardComponent } from './elements/board/board.component';
import { MembersComponent } from './pages/members/members.component';
import { ViewComponent } from './pages/view/view.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { ForgetComponent } from './pages/forget/forget.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChangePwdComponent } from './pages/change-pwd/change-pwd.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecentViewComponent } from './pages/recent-view/recent-view.component';
import { TestComponent } from './pages/test/test.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MenuBarComponent,
    ScreenComponent,
    LoginComponent,
    BoardComponent,
    MembersComponent,
    ViewComponent,
    BoardsComponent,
    ForgetComponent,
    RegisterComponent,
    ChangePwdComponent,
    ProfileComponent,
    RecentViewComponent,
    TestComponent,
    
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PortalModule { }
