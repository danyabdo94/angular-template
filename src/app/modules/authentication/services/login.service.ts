import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpBackend } from "@angular/common/http";
import { ParentService } from "../../../services/parent.service";
import { User, UserAdapter } from "../../../models/user";
import { map } from "rxjs/operators";
import { LIB_CONFIG, Config } from "./config.service";
import { Permission } from "src/app/models/permission";
import { Role } from "src/app/models/role";

@Injectable()
export class LoginService {
  private http: HttpClient;
  redirectUrl = "";
  loginApiUrl = "";
  constructor(
    @Inject(LIB_CONFIG) private config: Config,
    private parentService: ParentService,
    private handler: HttpBackend,
    private adapter: UserAdapter
  ) {
    // backend doesnt support interceptor, disbatches requests directly to the backend without going through the interceptor chain.
    this.http = new HttpClient(handler);
    this.redirectUrl = config.redirectUrl;
    this.loginApiUrl = config.loginApiUrl;
  }

  logIn(
    postData
  ): Observable<any> {
    return this.http.post(this.parentService.getApiroot() + this.loginApiUrl, {
      email: postData.email,
      password: postData.password
    });
  }
}
