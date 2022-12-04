import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { SharedService } from 'src/app/share/shared.service';
import Swal from 'sweetalert2';
import { Workspace } from '../../DTO/workspace.dto';
import { DashboardService } from '../../services/dashboard.service';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalCounts: any;
  chart: any;
  userId !: any
  startYear: any = new Date().getFullYear();
  range: any = [];
  chartData: any

  workspace !: Workspace
  workspaces: Workspace[] = [];

  constructor(
    private share_: SharedService,
    private dashboardService_: DashboardService,
    private ws: WorkspaceService,
    private router: Router,
    private rout: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.share_.spinner.show()
    this.ws.showAllWorkSpace().subscribe(data => {
      this.workspaces = data;
      this.share_.spinner.hide()
    })
    this.ws.Refresh.subscribe(
      res => {
        this.ws.  showAllWorkSpace().subscribe(data => {
          this.workspaces =data;
         this.share_.spinner.hide()
       })
      }
    );
  }

  goToBoard(workspaceId: any) {
    console.log(workspaceId)
    this.router.navigate(['portal/boards/' + workspaceId])
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An error occured : ", error.error)
    } else {
      console.error("Backend returned code ${error.status}, body was: ", error.error)
    }
    return throwError(() => new Error("Something bad happened : Please try again later."))
  }

  takeWorkSpaceId(workspaceId: number | undefined) {
    this.router.navigate([`portal/boards/${workspaceId}`])
  }

  goMember(workspaceId: any) {
    sessionStorage.setItem('aaaa', workspaceId);
    this.share_.router.navigate(['portal/members/' + workspaceId])
  }

  goToDo(boardId: number, workspaceid: any) {
    localStorage.setItem('workspaceIdMember', workspaceid)
    this.share_.router.navigate(['portal/todo/' + boardId])
  }

  update(workspaceId: string, workspaceName: string) {
    let workspace_id = Number(workspaceId)
    let param: Workspace = {
      workspaceId: workspace_id,
      workspaceName:workspaceName ,
      description: '',
      boards: [{
        boardId: 0,
        boardName: "",
        workspaceId: 0
      }],
      userId: 0,
      inviteEmail: []
    }
    this.ws.updateWorkspace(param).subscribe(data => {
      Swal.fire({
        title: 'Successfully!',
        text: 'Update!!!',
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Updated!',
              'Your file has been updated.',
              'success'
            )
          }
        })
      console.log("updated work space");
    }
    );
  }

  delete(workspaceId: string) {
    let wId: number = parseInt(workspaceId);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ws.deleteWorkspace(wId).subscribe(data => {
          console.log("delete")
         
        }
        );
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

}
