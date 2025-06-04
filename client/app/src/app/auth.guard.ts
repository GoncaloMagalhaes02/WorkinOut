import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from 'src/services/auth-service.service';
import { GetprofileService } from 'src/services/getprofile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private profileService: GetprofileService,
    private authService: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.profileService.getUserProfile().pipe(
      map((user) => {
        if (user && user.id) {
          this.profileService.setUser(user);
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError((err) => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
