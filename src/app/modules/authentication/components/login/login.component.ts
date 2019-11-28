import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/modules/authentication/services/login.service";
import { AuthService } from "../../services/auth-service";
import { Permission } from "src/app/models/permission";
import { Role } from "src/app/models/role";
import { ParentService } from "src/app/services/parent.service";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [LoginService]
})
export class LoginComponent implements OnInit, OnDestroy {
  userData = {
    email: null,
    password: null
  };
  loading = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private parentService: ParentService,
    private authService: AuthService,
    private snotifyService: SnotifyService
  ) {
    localStorage.clear();
    this.parentService.currentUser = null;
  }
  ngOnInit() {}

  login() {
    if (!this.userData.email || !this.userData.email) {
      this.snotifyService.error("Add email and password", "Error");
      return;
    }
    this.loading = true;
    this.loginService
      .logIn(this.userData)
      .pipe()
      .subscribe(
        (response: {
          data: {
            created_at: string;
            email: string;
            hrId: string;
            id: number;
            nationalId: string;
            permissions: Permission[];
            roles: Role[];
            updated_at: string;
          };
          meta: { token: string };
        }) => {
          this.authService.setData(
            "permissions",
            JSON.stringify(response.data.permissions)
          );
          response.data.permissions = null;
          this.authService.setData("user", JSON.stringify(response.data));
          this.authService.setToken(response.meta.token);
          this.router.navigate([this.loginService.redirectUrl]);
          this.parentService.currentUser = this.parentService.getCurrentUser();
          this.loading = false;
        },
        error => {
          this.loading = false;
          if (error && error.error && error.error.errors[0]) {
            this.snotifyService.error(error.error.errors[0], error.statusText);
          }
        }
      );
  }
  ngOnDestroy() {}
}
