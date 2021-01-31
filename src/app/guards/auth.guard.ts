import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private user;

    constructor(private router: Router, private authService: AuthService) {
        authService.currentUserSubject.subscribe((user) => this.user = user);
    }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.user) {
          // logged in so return true
          return true;
      }

      const currentUser = this.authService.currentUserValue;
      if(currentUser) {
          this.user = currentUser;
          return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrlz: state.url } });
      return false;
  }
}
