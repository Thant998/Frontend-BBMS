import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePwdComponent } from './portal/pages/change-pwd/change-pwd.component';
import { ForgetComponent } from './portal/pages/forget/forget.component';
import { ScreenComponent } from './portal/pages/layout/screen/screen.component';
import { LoginComponent } from './portal/pages/login/login.component';
import { RegisterComponent } from './portal/pages/register/register.component';
import { adminRoute } from './portal/route/admin_route';
import { CreateWorkspaceComponent } from './share/modal/modal-style/create-workspace/create-workspace.component';
import { BoardComponent } from './todo_portal/components/board/board/board.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
   path : 'login',
   component : LoginComponent
  },
  {
    path : 'forget',
    component : ForgetComponent
   },
   {
    path : 'register',
    component : RegisterComponent
   },
   {
    path : 'chnpwd',
    component : ChangePwdComponent
   },
  //  {
  //   path : 'createWorkspace',
  //   component : CreateWorkspaceComponent
  //  },
   {
    path : 'portal/todo/:boardId',
    component : BoardComponent
   },
  {
    path: 'portal',
    redirectTo: 'portal/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'portal',
    component: ScreenComponent,
    children: adminRoute,
    // canActivate:[AuthGuard],
    // canActivateChild:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
