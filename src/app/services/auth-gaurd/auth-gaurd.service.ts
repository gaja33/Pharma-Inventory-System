import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl("/signin");
      return false;
    }
    return true;
  }
}
