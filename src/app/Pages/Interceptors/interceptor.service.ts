import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../services/common.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private toastrService: ToastrService, private CommonService: CommonService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem('token');;
    // Clone the request to add the new header.

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `${token}`),

    });
    next.handle(req);

    // console.log('Sending request with new header now ...');

    //send the newly created request
    return next.handle(authReq).pipe(
      catchError(err => {
        console.log('Error Occurred',err);
        console.log("err,", err.error.message);

     

        // this.toastrService.error("error",err.error.message);
        throw new Error();
      })) as any;


  }

}


