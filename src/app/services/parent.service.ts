import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable()
export class ParentService {
  apiRoot: string = environment.apiRoot;
  constructor(private http: HttpClient) {}

  getApiroot() {
    return this.apiRoot;
  }
  baseUrl(versionNumber) {
    return this.apiRoot + "v" + versionNumber + "/";
  }

}
