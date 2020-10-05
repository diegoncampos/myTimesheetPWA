import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service.service';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{

  constructor(private authService: AuthenticationService, private router: Router, private authGuard: AuthGuard) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/home');
    }
    return true;
  }
}
