import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from '../portal/DTO/user';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  user = new User();

  /*
   Http Handler
*/

  constructor(private toastrService : ToastrService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let Authorization : any;

    this.user = JSON.parse(window.sessionStorage.getItem('userdetail') || '{}');
    if(this.user && this.user.email && this.user.password){
      Authorization ='Basic '+window.btoa(this.user.email+':'+this.user.password);
      window.sessionStorage.removeItem('userdetail');
    }
     let auth = JSON.parse(window.sessionStorage.getItem('token') || 'null')
      if (auth) {
        Authorization = auth;
        //window.sessionStorage.removeItem('token');
     }
    let check = window.sessionStorage.getItem('logout') || '';
     
    if(check == 'false'){
      if((this.user && this.user.email && this.user.password) || (auth)){
    
        const requ = req.clone(
        {
          setHeaders:{
            Authorization
          }
        ,
         headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
      });
      return next.handle(requ);
    }
    }
     
     

  return next.handle(req);
    
  }
}
    


  //   req = req.clone({ headers: req.headers.set('Content-Type', "application/json") });
  //   req = req.clone({responseType: 'json'});
  //   // req = req.clone({ headers: req.headers.set("Accept-Charset", "charset=utf-8") })
  //   // req = req.clone({ headers: req.headers.set("Access-Control-Allow-Origin", "*") })
  //   // req = req.clone({ headers: req.headers.set("X-Tenant-ID", "tenant_default") })
  //   // req = req.clone({ headers: req.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS") })
  //   // req = req.clone({ headers: req.headers.set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Tenant-ID, Content-Type") })

  //   req = req.clone({ headers: req.headers })
  //   req = req.clone({ body: req.body });

  //   console.log("Request Body", JSON.stringify(req.body))
  //   console.log("Request Params", req.urlWithParams)
  //   if (!req.urlWithParams)
  //     return EMPTY
  //   return next.handle(req).pipe(
  //     map((event: HttpEvent<any>) => {
  //       console.log("API Data", event);

  //       return event
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.log("HTTP ERROR", error);

  //       if (error.error) {
  //         if (typeof error.error == 'string') {
  //           // this.toastrService.error(error.error)
  //         } else {
  //           // this.toastrService.error(error.error.message || "Internal Server error!");
  //         }
  //       }
  //       else {
  //         this.toastrService.error(error.error.message || "Sorry!, Try again later");

  //       }
  //       return throwError(error)
  //     })
  //   );
  // }

