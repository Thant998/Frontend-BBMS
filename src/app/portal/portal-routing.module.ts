import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';
import { ChangePwdComponent } from './pages/change-pwd/change-pwd.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MembersComponent } from './pages/members/members.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TestComponent } from './pages/test/test.component';
import { ViewComponent } from './pages/view/view.component';

const routes: Routes = [
  {
    path : 'dashboard',
    component : DashboardComponent 
  },
  {
    path : 'members/:workspaceId',
    component : MembersComponent 
  },
  {
    path : 'view',
    component : ViewComponent 
  },
  {
    path : 'boards/:workspaceId',
    component : BoardsComponent 
  },
  {
    path : 'test/:boardId',
    component : TestComponent
  },
  {
    path : 'profile',
    component : ProfileComponent
  },
  // {
  //   path : 'notification',
  //   component : NotificationComponent
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
