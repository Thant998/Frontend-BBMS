import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';
import { Menu } from '../../DTO/menu.dto';
import { SharedService } from 'src/app/share/shared.service';
import { MenuList } from 'src/assets/data/menus/menus';
import { WorkspaceService } from '../../services/workspace.service';
import { Workspace } from '../../DTO/workspace.dto';



@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  routeLink: string = "";
  menuList: Menu[] = MenuList;
  sidebar: boolean = true;
  private element: any;
  innerWidth: any;
  fileToUpload: any;
  profileImageUrl: any;
  loadingPhoto = 'assets/icons/user.png';
  userType : string = ''
  linkAddress :  string = environment.LinkAddress

  workspaces: Workspace[] = []; 

  @Output() showMenu = new EventEmitter<string>();

  constructor(
    private location: Location, 
    private el: ElementRef, 
    private authService_: AuthService, 
    private shared_: SharedService, 
    private ws : WorkspaceService) {
      this.element = el.nativeElement;
    }

  ngAfterContentChecked() {
    // this.routeLink = this.location.path();
    // this.userData = JSON.parse(localStorage.getItem("userData") || '{}');
    // this.innerWidth = window.innerWidth;
  }

  createWorkspaces(){
    this.shared_.openModal('create-workspace-modal')
    
  }

  ngOnInit(): void {
    this.ws.Refresh.subscribe(
      res => {
        this.init();
      }
     );
   this.init()
  //  this.userType = String(localStorage.getItem('account_type'))
  //   this.innerWidth = window.innerWidth;
  //   this.userData = JSON.parse(localStorage.getItem("userData") || '')[0];
  //   this.init()
    
  //   // close modal on background click
  //   this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
  //     if (el.target.className === 'sidebar-background') {
  //       this.closeSideBar();
  //     }
  //   });
  //   if (this.innerWidth <= 768) {
  //     this.closeSideBar();
  //   }
  // }

  // init(){
  //   let userData = JSON.parse(localStorage.getItem("userData") || '')[0];
  //   let agentParam = {
  //     agent_id : userData.AgentID
  //   }
  //   this.agentService_.getAgent(agentParam).toPromise().then((response : any) => {
  //  this.profileImageUrl = this.linkAddress +  response.d.agent.ImageURL;
  //  if(response.d.agent.ImageURL == null){
  //   this.profileImageUrl = this.loadingPhoto
  //  }
  //   })
  }

  init(){
    this.ws.showAllWorkSpace().subscribe(data => { 
      this.workspaces = data;
      console.log(data , 'workspace data')
    })
  }


  goBoard(workspaceId : any){
    this.shared_.router.navigate(['portal/boards/'+workspaceId])
  }

  goMember(workspaceId : any){
    this.shared_.router.navigate(['portal/members/'+workspaceId])
  }


  handleFileInput(e : any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    
    setTimeout(()=>{                           
      this.saveAgentPhoto()}, 1000);
  }


  saveAgentPhoto(){
    let agent_id;
    if(localStorage.getItem('userData')){
       agent_id = JSON.parse(localStorage.getItem('userData') || '')[0].AgentID || ''
    }
    let profile  = this.profileImageUrl
    let parameter = {
      //  silent prameters
     agent_id : agent_id,
     Base64ImageString : profile,
     RequestID : ''
    }

    // this.editAccService_.EditUserPhoto(parameter).toPromise().then((response: any) => {
    //   this.shared_.toastrService.success("Success");
    //   let userData = JSON.parse(localStorage.getItem("userData") || '')[0];
    // let agentParam = {
    //   agent_id : userData.AgentID
    // }
    //   this.agentService_.getAgent(agentParam).toPromise().then((response : any) => {
    //     localStorage.setItem('userData' , "[" + JSON.stringify(response.d.agent) + "]")
    //      })
    //   //
    // }).catch((error: any) => {
    //   this.shared_.toastrService.success("Fail");
    // });
  }


  _handleReaderLoaded(e : any) {
    console.log("_handleReaderLoaded")
   var reader = e.target;
   this.profileImageUrl = reader.result;

  }

  showSideBar() 
  {
    this.sidebar = !this.sidebar;
    this.showMenu.emit("true");
    if (this.innerWidth < 768) {
      document.body.classList.add('style-modal-open');
    }
  }

  closeSideBar() 
  {
    if (this.innerWidth <= 768) {
      this.sidebar = false;
      this.showMenu.emit("false");
      document.body.classList.remove('style-modal-open');
    }
  }

  userLogout() 
  {
    this.authService_.logoutAccount();
  }

}
