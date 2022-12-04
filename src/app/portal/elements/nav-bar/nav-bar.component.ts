import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/share/shared.service';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  url = "./assets/DAT.png"
  routeLink: string = "";
  sidebar: boolean = false;
  private element: any;
  innerWidth = window.innerWidth
  userData : any;


  constructor(
    private _shared: SharedService,
     private router: Router, private activeRoute: ActivatedRoute,
     private el: ElementRef,
     private location: Location,
     private authService_ : AuthService
      ) {
    this.element = el.nativeElement;
  }

  reload()
  {
    window.location.reload()
  }


  showSideBar() 
  {
    this.sidebar = !this.sidebar;
    if (this.innerWidth <= 768) {
      document.body.classList.add('style-modal-open');
    }
  }

  closeSideBar() {
    this.sidebar = false;
    document.body.classList.remove('style-modal-open');
  }

  goToAdmin() {
    if (this.innerWidth <= 768) {
      this._shared.router.navigate(['/admin']);
      this.closeSideBar();
    }
  }

  navigate(route: any, param: any) {
    if (param == '') {
      this.router.navigate(['/' + route])
    } else {
      this.router.navigate(
        ['/' + route],
      );
    }
  }

  ngAfterContentChecked() {
    this.routeLink = this.location.path();
    this.userData = JSON.parse(localStorage.getItem("userData") || '{}')[0];
  }

  ngOnInit(): void { 
    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
      if (el.target.className.includes('nav-sidebar-background')) {
        this.closeSideBar();
      }
    });
    
    if (this.innerWidth < 768) {
      this.closeSideBar();
    }
  }

  convertString(parameter: any){
    return String(parameter)
  }
  
  showSigninModal(id: string) {
    this._shared.openModal(id);
    this.closeSideBar();
  }

  logoutAccount() {
    window.sessionStorage.setItem('logout','true');
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('userdetail')
    this.authService_.logoutAccount();
  }

}

