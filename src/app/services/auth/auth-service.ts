import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable()
export class AuthService {
  public fireError = new Subject();
  // cachedRequests: Array<HttpRequest<any>> = [];

  // public collectFailedRequest(request): void {
  //   this.cachedRequests.push(request);
  // }

  // public retryFailedRequests(): void {
  //   // retry the requests. this method can
  //   // be called after the token is refreshed
  // }

  public getToken(): string {
    return localStorage.getItem("auth");
  }
  public setToken(token: string): void {
    localStorage.setItem("auth", "Bearer " + token);
  }
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }
  public puplishError(error) {
    this.fireError.next(error);
  }
  public setData(key, token: string): void {
    localStorage.setItem(key, token);
  }
}
