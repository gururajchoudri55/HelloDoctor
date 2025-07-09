import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate {
  token: any;
  canActivate(): boolean {

    this.token = sessionStorage.getItem('token')
    if (this.token == null || this.token == undefined || this.token == '') {
     
      sessionStorage.clear();
      sessionStorage.clear();
      location.href = "#/login";
      location.reload();
      return false;
    }
    else {
      
      return true;
    }



  }

}
