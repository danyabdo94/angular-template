import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth/auth-service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    console.log(this.auth.isAuthenticated());
    if (!this.auth.isAuthenticated()) {
      console.log("false");
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
