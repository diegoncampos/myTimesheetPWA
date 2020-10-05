import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loggedIn: boolean = false;
  constructor(
    private authService:AuthenticationService,
    private router:Router,
    private notificationsService: NotificationsService
    ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoggedIn) {
        this.loggedIn = this.authService.isLoggedIn;
        return true;
      }
      this.notificationsService.showMessage("Access denied! please log in.")
      this.router.navigateByUrl('/login');
      return false;
  }

}
